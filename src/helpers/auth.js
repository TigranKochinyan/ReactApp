import decodeJWT from 'jwt-decode';
const apiHost = process.env.REACT_APP_API_HOST;

export function getToken(){
    let token = localStorage.getItem('token');
    if(token){
        const decodedToken = decodeJWT(token);
        const parsedToken = JSON.parse(token);
        // console.log(decodedToken);

        if( decodedToken.exp > new Date().getTime()/1000 - 60 ){
            return parsedToken.jwt;
        }
        fetch(`${apiHost}/${decodeJWT.userId}/token`,{
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                refreshToken: parsedToken.refreshToken
            })
        })
            .then(res => res.json())
            .then( () => {
                addTokenToLocalStorage(token);
                return token.jwt;
            } )
            .catch(err => {
                console.log(err);
            })
    }
    //logout
};

export function removeToken(){
    localStorage.removeItem('token');
} 

export const addTokenToLocalStorage = (token) => {//if token type is object should using JSON.stringify()
    localStorage.setItem('token', JSON.stringify(token));
}

export const isAuthentificate = () => !!localStorage.getItem('token');