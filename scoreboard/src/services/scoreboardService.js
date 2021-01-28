import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/scoreboard';

const getAll = () => {
  return axios.get(baseUrl);
}

const create = newObject => {
  return axios.post(baseUrl, newObject);
}

const service = { 
  getAll, 
  create
}

export default service;