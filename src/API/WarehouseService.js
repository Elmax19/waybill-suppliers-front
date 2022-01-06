import axios from "axios";

const API_URL = 'http://localhost:8080'

export default class WarehouseService{

    static async getAll(){
        const config = {
            method : 'get',
            url : API_URL + '/customer/' + sessionStorage.getItem('customerId') + '/warehouses',
            headers: {
                'Authorization' : sessionStorage.getItem('token')
            }
        }
        return axios(config);
    }

    static async bindWithDispatcher(warehouseId, dispatcherId){
        const config = {
            method: 'post',
            url: API_URL + '/employee/' + dispatcherId + '/warehouse/' + warehouseId,
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type' : 'application/json'
            },
        }
        return axios(config);
    }
}