import axios from 'axios'

export function register (data) {
  return axios({
    url: '/api/register',
    method: 'post',
    data
  })
}

export function login (data) {
  return axios({
    url: '/api/login',
    method: 'get',
    data
  })
}
