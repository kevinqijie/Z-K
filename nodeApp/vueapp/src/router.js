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
      path: '/home',
      name: 'home',
      redirect: '/home/bill',
      component: () => import(/* webpackChunkName: "about" */ './views/Home'),
      children: [{
        path: '/home/bill',
        name: 'bill',
        component: () => import(/* webpackChunkName: "about" */ './views/Bill')
      },
      {
        path: '/home/products',
        name: 'products',
        component: () => import(/* webpackChunkName: "about" */ './views/Products')
      },
      {
        path: '/home/Personal',
        name: 'personal',
        component: () => import(/* webpackChunkName: "about" */ './views/Personal')
      }]
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

export default router
