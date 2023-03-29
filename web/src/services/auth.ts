export const TOKEN_KEY = 'JSONTOWHATSAPPWEB';
export const isAuthenticatedLocalStorage = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getTokenLocalStorage = () => localStorage.getItem(TOKEN_KEY);

export const loginLocalStorage = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const logoutLocalStorage = () => {
    localStorage.clear();
};

export const setDataLocalStorage = (key: string, value: string) => {
    // localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(key, value);
};

export const getDataLocalStorage = (key: string) => {
    return localStorage.getItem(key)
}
