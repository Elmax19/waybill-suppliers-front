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
}