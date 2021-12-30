import axios from "axios";

const API_URL = 'https://localhost:8080'

export default class CustomerService{


    static async getAll(){
        const config = {
            method: 'get',
            url: 'http://localhost:8080/customers',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            },
        }
        return axios(config);
    }

    static async changeActiveStatus(body, state){
        const config = {
            method: 'post',
            data: body, // body is array of customers
            url: 'http://localhost:8080/customers/' + state, // state is 'disable' or 'enable'
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type' : 'application/json'
            },
        }
        return axios(config);
    }
}