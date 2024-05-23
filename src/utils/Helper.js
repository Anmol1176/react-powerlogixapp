import axios from 'axios';
import { getToken } from 'pages/authentication/auth-forms/index';

 export const BASE_URL = 'https://powerlogix-xzlnjp2yqa-el.a.run.app/api/v1/';
//export const BASE_URL = 'http://localhost:9292/api/v1/';


export const myAxios = axios.create({
    baseURL:BASE_URL,
})

export const privateAxios = axios.create({
    baseURL: BASE_URL,
});


privateAxios.interceptors.request.use(
    (config) => {
        if (config) {
           
 
            // Check if headers object is defined
            if (!config.headers) {
                config.headers = {};
            }
 
            // Get token
            const token = getToken();
            //console.log("Token:", token)
            // Set Authorization header if token is available
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                //console.log("Config with Authorization:", config);
            }
        }
 
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

