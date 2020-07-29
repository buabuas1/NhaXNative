import Config from "react-native-config";
import axios from "axios";
import getEnvVars from "../config/index";

class PromotionService {
    constructor() {
        this.config = getEnvVars;
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            // Authorization: 'myspecialpassword'
        }
    }

    async getList() {
        return axios.get(this.config.apiUrl + '/api/promotion')
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

    async getById(prm) {
        return axios.get(this.config.apiUrl + '/api/house', {params: {
                PromotionId: prm._id
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

export default PromotionService;