import decodeJWT from 'jwt-decode';
import { store } from './../store/store';
import { SIGN_OUT } from './../store/actionTypes';
import { history } from './history';


export const getToken = ()=>{
    const token = localStorage.getItem('token');
    
    if(token){
        const parsedToken = JSON.parse(token);
        const decodedToken = decodeJWT(parsedToken.jwt);
    
        if(decodedToken.exp > new Date().getTime()/1000 - 60){
            return Promise.resolve(parsedToken.jwt);
        }
        else {
            //update
            const apiHost = process.env.REACT_APP_API_HOST;
                return requestWithoutToken(`${apiHost}/user/${decodedToken.userId}/token`,'PUT', {
                    refreshToken: parsedToken.refreshToken
                })
                .then(token => {
                    addTokenToLocalStorage(token);
                    return token.jwt;
                })
                .catch(()=>{
                    logout();
                });
        }
    }
    else {
        logout();
    }    
}

export default function requestWithoutToken(url, method='GET', body){
    const config = {
        method: method,
        headers: {
            "Content-Type": 'application/json',
        }
    };

    if(body){
        config.body = JSON.stringify(body);
    }

    return fetch(url, config)
        .then(async (response) => {
            const res = await response.json();

            if(response.status >=400 && response.status < 600){
                if(res.error){
                    throw res.error;
                }
                else {
                    throw new Error('Something went wrong!');
                }
            }
            
            return res;
        });
}

export function removeToken(){
    localStorage.removeItem('token');
} 

export const addTokenToLocalStorage = (token) => {//if token type is object should using JSON.stringify()
    localStorage.setItem('token', JSON.stringify(token));
}

export function logout(){
    localStorage.removeItem('token');
    store.dispatch({type: SIGN_OUT});
    history.push('/login');
}

export function isAuthentificate(){
    return !!localStorage.getItem('token');
}