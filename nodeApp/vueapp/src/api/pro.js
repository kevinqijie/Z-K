import axios from './axios'

export function getpro () {
  return axios({
    url: '/api/getProducts',
    method: 'get'
  })
}
