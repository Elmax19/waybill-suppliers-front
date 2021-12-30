import axios from "axios";

const API_URL = 'https://localhost:8080'

export default class CustomerService{


    static async getAll(limit=10, page = 1){
        const config = {
            method: 'get',
            url: 'http://localhost:8080/customers',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            },
            params: {
                page: page-1,
                count: limit
            }
        }
        return axios(config);
    }

    static async getTotal(){
        const config = {
            method: 'get',
            url: 'http://localhost:8080/customers/total',
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
            url: 'http://localhost:8080/customers/' + state, // state is 'disable' or 'enable'
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type' : 'application/json'
            },
        }
        return axios(config);
    }

    static async save(newCustomer){
        const config = {
            method: 'post',
            data: newCustomer, // body is array of customers
            url: 'http://localhost:8080/customer', // state is 'disable' or 'enable'
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type' : 'application/json'
            },
        }
        return axios(config);
    }
}