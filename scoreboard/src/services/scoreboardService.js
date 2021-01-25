import axios from 'axios'
const baseUrl = 'http://localhost:3001/scoreboard'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

// const remove = (id) => {
//   return axios.delete(`${baseUrl}/${id}`)
// }

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const service = { 
  getAll, 
  create, 
  update
}

export default service;