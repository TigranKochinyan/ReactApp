export function getToken(){
    return localStorage.getItem('token');
};

export const addTokenToLocalStorage = (token) => {//if token type is object should using JSON.stringify()
    localStorage.setItem('token', JSON.stringify(token));
}

export const isAuthentificate = () => !!getToken();