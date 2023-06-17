import axios from "axios";

const baseUrl = "http://localhost:8080/api/leaveapplications";

let token = null;

function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

function getLeaveApplications() {
  return axios.get(baseUrl).then((res) => res.data);
}

function createLeaveApplication(leaveapplication) {
  return axios.post(baseUrl, leaveapplication).then((res) => res.data);
}

function deleteLeaveApplication(id) {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.status);
}

export default {
  getLeaveApplications,
  createLeaveApplication,
  deleteLeaveApplication,
  setToken,
};
