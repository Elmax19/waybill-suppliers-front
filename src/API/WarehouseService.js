import axios from "axios";

const API_URL = 'http://localhost:8080'

export default class WarehouseService {

    static async getAll() {
        const config = {
            method: 'get',
            url: API_URL + '/customer/' + sessionStorage.getItem('customerId') + '/warehouses/all',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        }
        return axios(config);
    }

    static async getAllByPage(limit = 10, page = 1) {
        const config = {
            method: 'get',
            url: API_URL + '/customer/' + sessionStorage.getItem('customerId') + '/warehouses',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            },
            params: {
                page: page - 1,
                size: limit
            }
        }
        return axios(config);
    }

    static getAllWithOpenApplications() {
        const config = {
            method: 'get',
            url: API_URL + '/customer/' + sessionStorage.getItem('customerId') + '/warehouses',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            },
            params: {
                withApplicationStatus: 'OPEN'
            }
        }

        return axios(config);
    }

    static async bindWithDispatcher(warehouseId, dispatcherId) {
        const config = {
            method: 'post',
            url: API_URL + '/employee/' + dispatcherId + '/warehouse/' + warehouseId,
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        }
        return axios(config);
    }

    static async getTotal() {
        const config = {
            method: 'get',
            url: API_URL + '/customer/' + sessionStorage.getItem('customerId') + '/warehouses/total',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        }
        return axios(config);
    }

    static async delete(ids) {
        const config = {
            method: 'delete',
            url: API_URL + '/warehouses',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            data: ids
        }
        return axios(config);
    }

    static async save(warehouse) {
        const config = {
            method: 'post',
            url: API_URL + '/warehouse',
            data: warehouse,
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        return axios(config);
    }
}