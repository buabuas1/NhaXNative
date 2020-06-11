import Config from "react-native-config";
import axios from "axios";

class ItemService {
    constructor() {
        this.config = Config;
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: 'myspecialpassword'
        }
    }

    async getItem(itemLink) {
        console.log("ItemService.getItem():");
        console.log("Item: " + itemLink);
        return axios.get('http://localhost:4040/api/district')
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            })
            .then(item => {
                    item["link"] = item._links.self.href;
                    return item;
                }
            )
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

export default ItemService;