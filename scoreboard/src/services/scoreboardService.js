import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/scoreboard';

const getAll = () => {
  return axios.get(baseUrl);
}

const getSize = () => {
  return axios.get(baseUrl + "/size");
}

const create = newObject => {
  return axios.post(baseUrl, newObject);
}

const service = { 
  getAll,
  getSize, 
  create
}

export default service;