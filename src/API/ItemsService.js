import axios from "axios";

export default class ItemService {
    static async getAll(limit = 10, page = 1) {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/customer/' + localStorage.getItem('customerId') + '/items/',
            headers: {
                'Authorization': 'Basic ZGlzcGF0Y2hlcjoxMTEx'
            },
            params: {
                page: page-1,
                count: limit
            }
        };
        return axios(config);
    }

    static async getCount() {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/customer/' + localStorage.getItem('customerId') + '/items/count',
            headers: {
                'Authorization': 'Basic ZGlzcGF0Y2hlcjoxMTEx'
            }
        };
        return axios(config);
    }

    static async save(item) {
        const config = {
            method: 'post',
            url: 'http://localhost:8080/customer/' + localStorage.getItem('customerId') + '/item/',
            headers: {
                'Authorization': 'Basic ZGlzcGF0Y2hlcjoxMTEx',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({...item})
        };
        return axios(config);
    }

    static async delete(itemId) {
        const config = {
            method: 'delete',
            url: 'http://localhost:8080/customer/' + localStorage.getItem('customerId') + '/item/' + itemId,
            headers: {
                'Authorization': 'Basic ZGlzcGF0Y2hlcjoxMTEx',
            }
        };
        return axios(config);
    }

    static async getById(itemId) {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/customer/' + localStorage.getItem('customerId') + '/item/' + itemId,
            headers: {
                'Authorization': 'Basic ZGlzcGF0Y2hlcjoxMTEx'
            }
        };
        return axios(config);
    }
}