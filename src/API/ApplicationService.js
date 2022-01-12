import axios from "axios";

export default class ApplicationService {
    static async getAll(searchScope, limit = 10, page = 1, status) {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/' +
                (searchScope === 'warehouse'
                    ? 'warehouse/' + sessionStorage.getItem('warehouseId')
                    : 'customer/' + sessionStorage.getItem('customerId'))
                + '/applications/',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            },
            params: {
                page: page - 1,
                count: limit,
                status: status
            }
        };
        return axios(config);
    }

    static async getCountByWarehouse(searchScope, status) {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/' +
                (searchScope === 'warehouse'
                    ? 'warehouse/' + sessionStorage.getItem('warehouseId')
                    : 'customer/' + sessionStorage.getItem('customerId'))
                + '/applications/count',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            },
            params: {
                status: status
            }
        };
        return axios(config);
    }

    static async save(application) {
        const config = {
            method: 'post',
            url: 'http://localhost:8080/customer/' + sessionStorage.getItem('customerId') + '/application/',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({...application})
        };
        return axios(config);
    }

    static async getTax(state) {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/state/' + state + '/tax/',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
            }
        };
        return axios(config);
    }
}