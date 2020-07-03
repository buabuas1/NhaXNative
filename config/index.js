
export const prodUrl = "192.168.30.102:4040";

const ENV = {
    dev: {
        apiUrl: "https://nhaxbe.herokuapp.com"
    },
    staging: {
        apiUrl: "https://nhaxbe.herokuapp.com"
    },
    prod: {
        apiUrl: "https://nhaxbe.herokuapp.com"
    }
};

function getEnvVars(env = "") {
    if (window && window.location && window.location.href.indexOf('localhost') !== -1) {
        return ENV.dev;
    } else {
        return ENV.prod;
    }
}

export default getEnvVars();