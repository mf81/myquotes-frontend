import axios from "axios";
import auth from "../services/authService";

const url = "http://localhost:3001";

const setTokenHeader = () => {
  axios.defaults.headers.common["x-auth-token"] = auth.getToken();
};

const api = {
  get: (endingPoint) => {
    setTokenHeader();
    return axios.get(url + endingPoint);
  },
  post: (endingPoint, data) => {
    setTokenHeader();
    return axios.post(url + endingPoint, data);
  },
  put: (endingPoint, id, data) => {
    setTokenHeader();
    return axios.put(url + endingPoint + id, data);
  },
  delete: (endingPoint) => {
    setTokenHeader();
    return axios.delete(url + endingPoint);
  },
};

export default api;
