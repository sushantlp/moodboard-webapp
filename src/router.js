import Vue from 'vue'
import Router from 'vue-router'
import BoardDetails from './views/BoardDetails.vue'
import Boards from './views/Boards.vue'
import Settings from './views/Settings.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import LandingPage from './views/LandingPage.vue'

import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: LandingPage
    },
    {
      path: '/app',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "",
          redirect: "boards"
        },
        {
          path: 'boards',
          component: Boards
        },
        {
          path: 'boards/:boardId',
          name: 'BoardDetails',
          component: BoardDetails,
          props: true
        },
        {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }, {
          path: 'settings',
          component: Settings
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        authPage: true
      }
    },
    {
      path: '/signup',
      component: SignUp,
      meta: {
        authPage: true
      }
    }

  ]
})

router.beforeEach((to, from, next) => {
  if (firebase.auth().currentUser && to.fullPath == "/") {
    next("/app")
  }
  else if (to.matched.some(it => it.meta.requiresAuth)) {
    if (firebase.auth().currentUser) {
      next()
    }
    else {
      next("/login")
    }
  }
  else if (to.matched.some(it => it.meta.authPage) && firebase.auth().currentUser) {
    next("/app")
  }
  else {
    next()
  }
})

export default router