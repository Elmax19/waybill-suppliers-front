import axios from "axios";

const API_URL = 'http://localhost:8080'

let customerId = sessionStorage.getItem('customerId');

export default class EmployeeService {
    static getAllFreeDrivers() {
        return axios.get(API_URL + `/customer/${customerId}/free-drivers`, {
            headers: {
                authorization: sessionStorage.getItem('token')
            }
        });
    }
}