
export const prodUrl = "https://someapp.herokuapp.com";

const ENV = {
    dev: {
        apiUrl: "http://localhost:4040"
    },
    staging: {
        apiUrl: "http://localhost:4040"
    },
    prod: {
        apiUrl: "http://localhost:4040"
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