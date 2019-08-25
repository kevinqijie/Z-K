import axios from 'axios'
import $axios from './axios'

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
    method: 'post',
    data
  })
}

export function getcurrent () {
  return $axios({
    url: '/api/current',
    method: 'get'
  })
}
export function postBla (data) {
  return $axios({
    url: '/api/upBalance',
    method: 'post',
    data
  })
}
