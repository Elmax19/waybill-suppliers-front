import axios from "axios";

const API_URL = 'http://localhost:8080'

export default class UserService {

    static async getAll(limit = 10, page = 1, filter){
        let enabled = filter === true ? '/enabled' : '';
        const config = {
            method : 'get',
            url : API_URL + '/customer/' + sessionStorage.getItem('customerId') + '/employees' + enabled,
            headers: {
                'Authorization' : sessionStorage.getItem('token')
            },
            params: {
                page: page - 1,
                count : limit
            }
        }
        return axios(config);
    }

    static async getTotal(){
        const config = {
            method: 'get',
            url: API_URL + '/customer/' + sessionStorage.getItem('customerId') + '/employees/total',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        }
        return axios(config);
    }

    static async changeActiveStatus(body, state){
        const config = {
            method: 'post',
            data: body, // body is array of customers
            url: 'http://localhost:8080/employees/' + state, // state is 'disable' or 'enable'
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type' : 'application/json'
            },
        }
        return axios(config);
    }
}