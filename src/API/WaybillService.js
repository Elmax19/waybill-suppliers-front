import axios from "axios";

const API_URL = 'http://localhost:8080'
let customerId = sessionStorage.getItem('customerId');

export default class WaybillService {
    static getByFilter(filter, page, size) {
        let url = API_URL + `/customer/${customerId}/waybills/` + this.getFilterQuery(filter);

        return axios.get(url, {
            headers: {
                authorization: sessionStorage.getItem('token')
            },
            params: {
                page: page - 1,
                size: size
            }
        });
    }

    static getById(id) {
        let url = API_URL + `/customer/${customerId}/waybill/${id}`;

        return axios.get(url, {
            headers: {
                authorization: sessionStorage.getItem('token')
            }
        });
    }

    static getCountByFilter(filter) {
        let url = API_URL + `/customer/${customerId}/waybills/count` + this.getFilterQuery(filter);

        return axios.get(url, {
            headers: {
                authorization: sessionStorage.getItem('token')
            }
        });
    }

    static save(id, number, warehouseId, applicationsOptions, carId, driverId, state, update = false) {
        let waybill = {};

        waybill.id = id;
        waybill.number = number;
        waybill.warehouseId = warehouseId;
        waybill.applicationRecords = applicationsOptions
            .filter(a => a.sequenceNumber !== 0)
            .map(a => {
                return {
                    id: a.id,
                    sequenceNumber: a.sequenceNumber
                }
            });
        let user = JSON.parse(sessionStorage.getItem('auth'));
        waybill.carId = carId;
        waybill.creatorId = user.id;
        waybill.lastUpdaterId = user.id;
        waybill.driverId = Number(driverId) === 0 ? null : driverId;
        waybill.state = state;

        let config = {
            method: update ? 'put' : 'post',
            url: API_URL + `/customer/${customerId}/waybill`,
            data: waybill,
            headers: {
                authorization: sessionStorage.getItem('token')
            }
        };

        return axios(config);
    }

    static getFilterQuery(filter) {
        let query = '?';
        let anyStatusFilters = filter.open || filter.ready || filter.inProgress || filter.finished;
        if (filter.iAmCreator) {
            let user = JSON.parse(sessionStorage.getItem('auth'));
            query += `creatorId=${user.id}`;
            if (anyStatusFilters) {
                query += '&';
            }
        }

        if (!anyStatusFilters) return query;

        query += 'state';
        let anyStatusFiltersAdded = false;
        if (filter.open) {
            query += '=OPEN';
            anyStatusFiltersAdded = true;
        }
        if (filter.ready) {
            query += anyStatusFiltersAdded
                ? ',READY'
                : '=READY';
            anyStatusFiltersAdded = true;
        }
        if (filter.inProgress) {
            query += anyStatusFiltersAdded
                ? ',IN_PROGRESS'
                : '=IN_PROGRESS';
            anyStatusFiltersAdded = true;
        }
        if (filter.finished) {
            query += anyStatusFiltersAdded
                ? ',FINISHED'
                : '=FINISHED';
        }

        return query;
    }
}

