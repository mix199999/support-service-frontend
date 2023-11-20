import axios from 'axios';


export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
};

export const setRole =(role) =>{
    window.localStorage.setItem('role', role);
};

export const setId =(id) =>{
    window.localStorage.setItem('id', id);
};

export const getId=()=>{
    return window.localStorage.getItem('id');
}

export const getRole=()=>{
    return window.localStorage.getItem('role');
}
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data});
};

export const deleteRecord = (value, link) => {
    const url = `${link}${value}`;


    const headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers['Authorization'] = `Bearer ${getAuthToken()}`;
    }

    return axios.delete(url, { headers })
        .then(response => {
            console.log('Deletion successful:', response.data);
            return response.data; // Return data if needed
        })
        .catch(error => {
            console.error('Deletion failed:', error);
            throw error; // Rethrow the error for handling in the calling code
        });
};

