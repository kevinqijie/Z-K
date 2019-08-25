import axios from './axios'

export function getpro () {
  return axios({
    url: '/api/getProducts',
    method: 'get'
  })
}
export function getOnepro (data) {
  return axios({
    url: '/api/getOneProducts?id=' + data,
    method: 'get'

  })
}
export function postOnepro (data) {
  return axios({
    url: '/api/SetProducts/edit',
    method: 'post',
    data
  })
}
export function setpro (data) {
  return axios({
    url: '/api/SetProducts',
    method: 'post',
    data
  })
}
export function delpro (data) {
  return axios({
    url: '/api/deletepro',
    method: 'delete',
    data
  })
}
