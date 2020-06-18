import Config from "react-native-config";
import axios from "axios";
import getEnvVars from "../config/index";

class HouseService {
    constructor() {
        this.config = getEnvVars;
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            // Authorization: 'myspecialpassword'
        }
    }

    async getList() {
        return axios.get(this.config.apiUrl + '/api/house')
            .then(response => {
                if (!response.statusText === 'OK') {
                    this.handleResponseError(response);
                }
                return response.data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    async getListByDistrict(district) {
        return axios.get(this.config.apiUrl + '/api/house', {params: {
                districtId: district._id
            }})
            .then(response => {
                if (!response.statusText === 'OK') {
                    this.handleResponseError(response);
                }
                return response.data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }

    handleError(error) {
        console.log(error.message);
    }
}

export default HouseService;