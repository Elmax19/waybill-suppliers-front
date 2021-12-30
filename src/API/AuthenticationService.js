import axios from "axios";

const API_URL = 'http://localhost:8080'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'auth'

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(API_URL + "/user/" + username,
            {
                headers: {
                    authorization: this.createBasicAuthToken(username, password) // put in headers token for basic auth
                }
            }
        )
    }

    // create a basic auth token with input login and password in login form
    createBasicAuthToken(username, password) {
        console.log(username)
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('customer');
    }

    isLoggedUserIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false;
        return true
    }

    // create item in sessionStorage with username of auth user
    // could be update to set in value auth user with username and other params
    registerSuccessfulLogin(username, password, user) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, JSON.stringify(user.data))
        const token = 'Basic ' + window.btoa(username + ":" + password)
        sessionStorage.setItem('token', token)
        this.setupAxiosInterceptors(token)
    }

    // async registerCurrentCustomer(username, password) {
    //     console.log(JSON.parse(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)))
    //     // if (JSON.parse(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)).role !== 'SYSTEM_ADMIN_ROLE') {
    //     //     console.log('customer add to sessionStorage begin')
    //     await axios.get(API_URL + 'employee/' + username + "/customer",
    //         {
    //             headers: {
    //                 authorization: this.createBasicAuthToken(username, password) // put in headers token for basic auth
    //             }
    //         }
    //     )
    //     // }
    // }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isLoggedUserIn()) {
                    config.headers.authorization = token;
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()