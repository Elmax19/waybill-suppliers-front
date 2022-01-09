import axios from "axios";

const API_URL = 'http://localhost:8080'
let customerId = sessionStorage.getItem('customerId');

export default class WaybillService {
    static getByFilter(filter, page, count) {
        let query = API_URL + `/customer/${customerId}/waybills/` + this.getFilterQuery(filter);
        if (page) {
            if (query.length > 1)
                query += '&';
            query += `page=${page - 1}`;
        }
        if (count) {
            if (page)
                query += '&';
            query += `count=${count}`;
        }

        console.log(query);
        return axios.get(query, {
                headers: {
                    authorization: sessionStorage.getItem('token')
                }
            }
        );
    }

    static getCountByFilter(filter) {
        return axios.get(API_URL + `/customer/${customerId}/waybills/count`, {
            headers: {
                authorization: sessionStorage.getItem('token')
            }
        });
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

