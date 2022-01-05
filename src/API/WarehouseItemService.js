import axios from "axios";

export default class WarehouseItemService {
    static async getAll(limit = 10, page = 1) {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/warehouse/' + sessionStorage.getItem('warehouseId') + '/items',
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

    static async getAllActive(limit = 10, page = 1) {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/warehouse/' + sessionStorage.getItem('warehouseId') + '/items/active',
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

    static async getAllInactive(limit = 10, page = 1) {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/warehouse/' + sessionStorage.getItem('warehouseId') + '/items/inactive',
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

    static async getCount() {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/warehouse/' + sessionStorage.getItem('warehouseId') + '/items/count',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        };
        return axios(config);
    }

    static async getActiveCount() {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/warehouse/' + sessionStorage.getItem('warehouseId') + '/items/active/count',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        };
        return axios(config);
    }

    static async getInactiveCount() {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/warehouse/' + sessionStorage.getItem('warehouseId') + '/items/inactive/count',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        };
        return axios(config);
    }

    static async changeStatus(item) {
        const config = {
            method: 'put',
            url: 'http://localhost:8080/warehouse/' + sessionStorage.getItem('warehouseId') + '/item/' + item.item.id,
            headers: {
                'Authorization': sessionStorage.getItem('token')
            },
            params: {
                status: item.activeStatus
            }
        };
        return axios(config);
    }
}