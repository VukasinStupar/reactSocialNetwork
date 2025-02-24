import axios from 'axios';
import HttpMethod from '../Base/HttpMethod';

export const Axios = (function () {
  let instance;

  function createInstance() {
    return axios.create({
      baseURL: "http://localhost:8080/",
    });
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }

      const token = getToken();

      if (token) {
        instance.defaults.headers.common['Authorization'] = token;
      }

      instance.all = axios.all;

      return instance;
    },
  };
})();

Axios.getInstance().interceptors.response.use(
  (response) => {
    response.ok = response.status >= 200 && response.status < 300;
    return response;
  },
  async (error) => {
    if (!error.response) {
      console.error("Network error or server unreachable:", error.message);
      return Promise.reject(error);
    }

    const { status } = error.response;

    if (status === 404) {
      // window.location = '/404';
    } else if (status === 500) {
      if (!isLocalhost()) {
        window.location = '/500';
      }
    } 

    return Promise.reject(error);
  },
);

export async function request(url, data = {}, method = HttpMethod.GET, options = {}) {
  try {
    return await connect(url, data, method, options);
  } catch (error) {
    if (!isLocalhost()) {
      window.location = '/500';
    }
    throw error;
  }
}

export async function connect(url, data, method, options) {
  switch (method) {
    case HttpMethod.GET:
      return await Axios.getInstance().get(url + makeParametersList(data), options);
    case HttpMethod.POST:
      return await Axios.getInstance().post(url, data, options);
    case HttpMethod.PUT:
      return await Axios.getInstance().put(url, data, options);
    case HttpMethod.PATCH:
      return await Axios.getInstance().patch(url, data, options);
    case HttpMethod.DELETE:
      return await Axios.getInstance().delete(url, options);
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
}

export function makeParametersList(parameters) {
  let parametersList = `?`;

  Object.keys(parameters).forEach(
    (key) => (parametersList += parameters[key] ? `${key}=${parameters[key]}&` : ''),
  );

  parametersList = parametersList.slice(0, -1);

  return parametersList === '?' ? '' : parametersList;
}

export function getToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return 'Bearer ' + token;
}

function isLocalhost() {
  return window.location.href.includes('localhost');
}