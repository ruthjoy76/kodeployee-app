import axios from "axios";

const baseUrl = "/api/employees";

let token = null;

function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

function getEmployees() {
  const config = {
    headers: { Authorization: token },
  };

  return axios.get(baseUrl, config).then((res) => res.data);
}

function createEmployee(employee) {
  const config = {
    headers: { Authorization: token },
  };

  return axios.post(baseUrl, employee, config).then((res) => res.data);
}

function deleteEmployee(id) {
  const config = {
    headers: { Authorization: token },
  };
  return axios.delete(`${baseUrl}/${id}`, config).then((res) => res.status);
}

export default {
  getEmployees,
  createEmployee,
  deleteEmployee,
  setToken,
};
