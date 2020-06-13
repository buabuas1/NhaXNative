
export const prodUrl = "https://someapp.herokuapp.com";

const ENV = {
    dev: {
        apiUrl: "http://localhost:4040"
    },
    staging: {
        apiUrl: prodUrl
    },
    prod: {
        apiUrl: prodUrl
    }
};

function getEnvVars(env = "") {
    if (window.location.href.indexOf('localhost') !== -1) {
        return ENV.dev;
    } else {
        return ENV.prod;
    }
}

export default getEnvVars();