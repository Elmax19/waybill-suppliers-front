import axios from "axios";

const API_URL = 'http://localhost:8080'

export default class ItemCategoryService{

    static async getAll(limit = 10, page = 1){
        const config = {
            method: 'get',
            url: API_URL + '/customer/' + sessionStorage.getItem('customerId') + '/categories',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            },
            params: {
                page: page - 1,
                count: limit
            }
        };
        return axios(config);
    }

    static async getTotal(){
        const config = {
            method : 'get',
            url : API_URL + '/customer/' + sessionStorage.getItem('customerId') + '/categories/total',
            headers: {
                'Authorization' : sessionStorage.getItem('token')
            }
        }
        return axios(config);
    }

    static async update(category){
        const config = {
            method: 'put',
            data: category, // body is array of users
            url: API_URL + '/category',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type' : 'application/json'
            }
        }
        return axios(config);
    }
}