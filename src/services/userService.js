import axios from "axios";

const baseUrl = "/api/users";

function register(credentials) {
  return axios.post(baseUrl, credentials).then((res) => res.data);
}

export default {
  register,
};
