import axios from "axios";

const { VITE_JSONTOWW_SERVER_API_URL } = import.meta.env;

export function setupJsontowwServerAPIClient(): any {

    const jsontowwServerAPI = axios.create({
        baseURL: `${VITE_JSONTOWW_SERVER_API_URL}`,
        // baseURL: `http://localhost:8302`, //dev
        // withCredentials: true
        // timeout: 10000,
    });

    return jsontowwServerAPI;
}
