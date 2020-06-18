import Config from "react-native-config";
import axios from "axios";
import getEnvVars from "../config/index";

class RoomService {
    constructor() {
        this.config = getEnvVars;
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            // Authorization: 'myspecialpassword'
        }
    }

    async getList(itemLink) {
        return axios.get(this.config.apiUrl + '/api/room')
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

    async getRoomsByHouseId(houseId) {
        return axios.get(this.config.apiUrl + '/api/room', {params: {
                HouseId: houseId
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

export default RoomService;