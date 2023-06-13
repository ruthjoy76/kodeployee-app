import axios from "axios";

const baseUrl = "http://localhost:8080/api/employees";

let token = null;

function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

function getEmployees() {
  return axios.get(baseUrl).then((res) => res.data);
}

function createEmployee(employee) {
  const config = {
    headers: { Authorization: token },
  };

  return axios.post(baseUrl, employee, config).then((res) => res.data);
}

function deleteEmployee(id) {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.status);
}

export default {
  getEmployees,
  createEmployee,
  deleteEmployee,
  setToken,
};
