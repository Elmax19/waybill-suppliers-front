import axios from "axios";

export default class WarehouseItemService {
    static async getAll(limit = 10, page = 1, activeStatus = 'ALL') {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/warehouse/' + sessionStorage.getItem('warehouseId') + '/items',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            },
            params: {
                page: page - 1,
                count: limit,
                activeStatus: activeStatus
            }
        };
        return axios(config);
    }

    static async getCount(activeStats) {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/warehouse/' + sessionStorage.getItem('warehouseId') + '/items/count',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            },
            params: {
                activeStatus: activeStats
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