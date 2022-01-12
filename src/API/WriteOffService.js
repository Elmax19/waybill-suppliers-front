import axios from "axios";

export default class WriteOffService {
    static async save(writeOff) {
        const config = {
            method: 'post',
            url: 'http://localhost:8080/customer/' + sessionStorage.getItem('customerId') + '/writeOff/',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({...writeOff})
        };
        return axios(config);
    }

    static async getAll(searchScope, limit = 10, page = 1) {
        let url='http://localhost:8080/customer/' + sessionStorage.getItem('customerId') + '/writeOffs';
        switch(searchScope){
            case 'car':
                url+='/driver/' + JSON.parse(sessionStorage.getItem('auth')).id;
                break;
            case 'warehouse':
                url+='/warehouse/' + sessionStorage.getItem('warehouseId');
                break;
        }
        const config = {
            method: 'get',
            url: url,
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

    static async getCount(searchScope) {
        let url='http://localhost:8080/customer/' + sessionStorage.getItem('customerId') + '/writeOffs';
        switch(searchScope){
            case 'car':
                url+='/driver/' + JSON.parse(sessionStorage.getItem('auth')).id;
                break;
            case 'warehouse':
                url+='/warehouse/' + sessionStorage.getItem('warehouseId');
                break;
        }
        const config = {
            method: 'get',
            url: url + '/count',
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        };
        return axios(config);
    }
}