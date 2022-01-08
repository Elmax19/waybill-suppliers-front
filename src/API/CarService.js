import axios from "axios";

const API_URL = 'http://localhost:8080'

export default class CarService{


    static async getAll(limit=10, page = 1){
        const config = {
            method : 'get',
            url : API_URL + '/customer/' + sessionStorage.getItem('customerId') + '/cars',
            headers: {
                'Authorization' : sessionStorage.getItem('token')
            },
            params:{
                page: page-1,
                size: limit
            }
        }
        return axios(config);
    }

    static async getTotal(){
        const config = {
            method : 'get',
            url : API_URL + '/customer/' + sessionStorage.getItem('customerId') + '/cars/total',
            headers: {
                'Authorization' : sessionStorage.getItem('token')
            }
        }
        return axios(config);
    }

    static delete(removedIds) {
        const config = {
            method: 'delete',
            url: API_URL + '/cars',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type' : 'application/json'
            },
            data: removedIds
        }
        return axios(config);
    }

    static save(newCar) {
        const config = {
            method: 'post',
            url: API_URL + '/car',
            data: newCar,
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type' : 'application/json'
            }
        }
        return axios(config);
    }
}