import Vue from 'vue'
import Router from 'vue-router'
import BoardDetails from './views/BoardDetails.vue'
import Boards from './views/Boards.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/boards'
    },
    {
      path: '/boards',
      component: Boards
    },
    {
      path: '/boards/:boardId',
      name: 'BoardDetails',
      component: BoardDetails,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }, {
      path: '/settings',
      component: Settings
    }
  ]
})
