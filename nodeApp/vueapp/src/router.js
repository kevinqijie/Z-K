import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

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
    },
    {
      path: '*',
      redirect: '/404'
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
    next()
  }
})
var routermap = [{
  path: '/home',
  name: 'home',
  redirect: '/home/bill',
  meta: { roles: 'admin' },
  component: () => import(/* webpackChunkName: "about" */ './views/Home'),
  children: [{
    path: '/home/bill',
    name: 'bill',
    component: () => import(/* webpackChunkName: "about" */ './views/Bill'),
    meta: { roles: 'admin' }
  },
  {
    path: '/home/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "about" */ './views/Products'),
    meta: { roles: 'admin' }
  },
  {
    path: '/home/Personal',
    name: 'personal',
    component: () => import(/* webpackChunkName: "about" */ './views/Personal'),
    meta: { roles: 'admin' }
  }]
}]

function addrouter (role, romap) {
  var newb = []
  romap.forEach(it => {
    // console.log(1)

    if (it.meta.roles && it.meta.roles === role) {
      if (it.children && it.children.length > 0) {
        // return addrouter(role, it.children)
        it.children = addrouter(role, it.children)
        // console.log(a)
      }
      // console.log(2)
      newb.push(it)
    }
  })
  return newb
}
var c = addrouter('admin', routermap)
console.log(c)
// console.log('c:', c)
router.addRoutes(c)
export default router
