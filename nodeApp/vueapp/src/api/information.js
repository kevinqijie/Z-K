import axios from './axios'

export function getinformation () {
  return axios({
    url: '/api/allInformation',
    method: 'get'
  })
}

export function getGeReninformation (id) {
  return axios({
    url: '/api/allInformation/single?id=' + id,
    method: 'get'
  })
}

export function deleteinformation (data) {
  return axios({
    url: '/api/porfile/delete',
    method: 'delete',
    data
  })
}
export function postInf (data) {
  return axios({
    url: '/api/porfile',
    method: 'post',
    data
  })
}
