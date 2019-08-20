import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
      component: () => import(/* webpackChunkName: "about" */ './views/home'),
      children: [{
        path: '/',
        name: '/zj',
        component: () => import(/* webpackChunkName: "about" */ './views/zj')
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/register')
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
