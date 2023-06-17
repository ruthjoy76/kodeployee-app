import axios from "axios";

const baseUrl = "http://localhost:8080/api/employees";

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
    headers: { Authorization: token, "Content-Type": "multipart/form-data" },
  };

  return axios.post(baseUrl, employee, config).then((res) => res.data);
}

function updateEmployee(id, employee) {
  const config = {
    headers: { Authorization: token },
  };

  return axios
    .put(`${baseUrl}/${id}`, employee, config)
    .then((res) => res.data);
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
