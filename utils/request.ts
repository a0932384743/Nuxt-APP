import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  onDownloadProgress: () => {

  },
  onUploadProgress: () => {

  },
  timeout: 180000,
});

const cancelObj = new Map();

axiosClient.interceptors.request.use(
  async(config) => {
    const token = localStorage.getItem('token'); // => 'value'
    if (config) {
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`
        };
      }
      config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel) => {
          cancelObj.set(config.url, cancel);
        });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return response;
    }
    return Promise.reject(response);
  },
  (error) => {
    if (error.code === 'ERR_CANCELED') {
      return Promise.resolve(error);
    }

    if (error.response) {
      if (error.response.status === 401) {
        if (typeof localStorage !== 'undefined') {
          localStorage.clear();
        }
      }
    }
    return Promise.reject(error);
  }
);

const cancelRequest = (url: string) => {
  if (cancelObj.has(url)) {
    cancelObj.get(url)(`clear ${url}`);
    cancelObj.delete(url);
  }
};
const parseParams = (url: string, params: object) => {
  if (Object.keys(params).length > 0) {
    Object.keys(params).forEach((key) => {
      url = url.replace(`{${key}}`, String(params[key as keyof typeof params]));
    });
  }
  return url;
};

const get = (url: string, params: object = {}) => {
  cancelRequest(url);
  return axiosClient.get(parseParams(url, params), params);
};

const post = (url: string, params: object = {}) => {
  cancelRequest(url);
  return axiosClient.post(parseParams(url, params), params);
};

const postFile = (url: string, params: object = {}, formData: FormData) => {
  cancelRequest(url);
  return axiosClient.post(parseParams(url, params), formData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });
};

const put = (url: string, params: object = {}) => {
  cancelRequest(url);
  return axiosClient.put(parseParams(url, params), params);
};

const putFile = (url: string, params: object = {}, formData: FormData) => {
  cancelRequest(url);
  return axiosClient.put(parseParams(url, params), formData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });
};

const del = (url: string, params: object = {}) => {
  cancelRequest(url);
  return axiosClient.delete(parseParams(url, params), params);
};

const patch = (url: string, params: object = {}) => {
  cancelRequest(url);
  return axiosClient.patch(parseParams(url, params), params);
};

const requestUtils = {
  del,
  get,
  patch,
  post,
  postFile,
  put,
  putFile,
};

export default requestUtils;
