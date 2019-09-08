import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
function addrouter (role, romap) {
  var newb = []
  var meun = []

  romap.forEach(it => {
    // console.log(1)

    if (it.meta.roles && it.meta.roles.indexOf(role) > -1) {
      if (it.children && it.children.length > 0) {
        // return addrouter(role, it.children)
        it.children = addrouter(role, it.children).newb

        meun.push(...addrouter(role, it.children).meun)
      }
      // console.log(2)
      if (!it.meta.hide) {
        meun.push(it)
      }
      newb.push(it)
    }
  })
  return { newb, meun }
}
export default new Vuex.Store({
  state: {
    token: [],
    meun: [],
    role: '',
    router: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setmeun (state, meun) {
      state.meun = meun
    },
    setTess (state, role) {
      state.role = role
    },
    setromap (state, romap) {
      // console.log(romap)
      let { newb, meun } = addrouter(state.role, romap)
      state.router = newb
      state.meun = meun
    },
    setrouter (state, romap) {
      state.router = romap
    },
    esclogin (state) {
      state = {
        token: [],
        meun: [],
        role: '',
        router: ''
      }
    }
  },
  actions: {
    jToken (context, token) {
      context.commit('setToken', token)
    },
    jmeun (context, meun) {
      context.commit('setmeun', meun)
    },
    jTess (context, role) {
      context.commit('setTess', role)
    },
    jrouter (context, router) {
      context.commit('setrouter', router)
    },
    jlogin (context) {
      context.commit('esclogin')
    }
  },
  getters: {
    getRoles: state => state.roles
  }
})
