import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import store from './store'
import jwt from 'jwt-decode'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'home',
      // component: Home
      redirect: '/home'
    },

    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register')
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "about" */ './views/404')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  if (!localStorage.getItem('token')) {
    if (to.path === '/login' || to.path === '/register') {
      next()
    } else {
      next('/login')
    }
  } else {
    if (!store.state.role) {
      store.dispatch('jToken', jwt(localStorage.getItem('token')))
      var te = jwt(localStorage.getItem('token')).identity
      store.commit('setTess', te)
      store.commit('setromap', routermap)
      router.addRoutes(store.state.router.concat([{ // 这里调用addRoutes方法，动态添加符合条件的路由
        path: '*',
        redirect: '/404' // 所有不匹配路径(*)都重定向到404，为什么写在这里而不放到静态路由表里可以查看“前端路上”的文章
      }]))
      next({ ...to })
    } else {
      next()
    }
  }
})

export const routermap = [{
  path: '/home',
  name: 'home',
  redirect: '/home/bill',
  meta: { roles: 'admin,user', hide: true },
  component: () => import(/* webpackChunkName: "about" */ './views/Home'),
  children: [{
    path: '/home/bill',
    name: 'bill',
    component: () => import(/* webpackChunkName: "about" */ './views/Bill'),
    meta: { roles: 'admin,user', title: '账单' }
  },
  {
    path: '/home/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "about" */ './views/Products'),
    meta: { roles: 'user', title: '产品' }
  },
  {
    path: '/home/Personal',
    name: 'personal',
    component: () => import(/* webpackChunkName: "about" */ './views/Personal'),
    meta: { roles: 'admin', title: '信息' }
  },
  {
    path: '/home/ce',
    name: 'ce',
    component: () => import(/* webpackChunkName: "about" */ './views/ce'),
    meta: { roles: 'adminuser', title: '测试' }
  }
  ]
}]

// function addrouter (role, romap) {
//   var newb = []
//   var meun = []
//   romap.forEach(it => {
//     // console.log(1)

//     if (it.meta.roles && it.meta.roles.indexOf(role) > -1) {
//       if (it.children && it.children.length > 0) {
//         // return addrouter(role, it.children)
//         it.children = addrouter(role, it.children).newb
//         // console.log(a)
//         meun.push(...addrouter(role, it.children).meun)
//       }
//       // console.log(2)
//       if (!it.meta.hide) {
//         meun.push(it)
//       }
//       newb.push(it)
//     }
//   })
//   return { newb, meun }
// }
// var te = store.state.token
// if (localStorage.getItem('token')) {
//   // console.log(te)
//   var te = ''

//   var token = localStorage.getItem('token')
//   store.dispatch('jToken', jwt(token))
//   te = store.state.token.identity

//   // console.log(te)
//   var { newb, meun } = addrouter(te, routermap)
//   // console.log(c)
//   // console.log('c:', c)
//   store.dispatch('jmeun', meun)
//   router.addRoutes(newb)
// }
// console.log(router)
export default router
