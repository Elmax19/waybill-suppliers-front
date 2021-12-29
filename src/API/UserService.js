import axios from "axios";

export default class UserService {
    static async login(login, password) {
        return await axios.get('localhost:8080/login', {
            params: {
                login: login,
                password: password
            }
        });
    }
}