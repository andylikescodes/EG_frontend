import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name:"login",
      component: ()=>import('./views/Login.vue')
    },
    {
      path: "/register",
      name: "register",
      component: ()=> import ("./views/Register.vue")
    },
    {
      path:"/profile",
      name:"userprofile",
      component: () => import ("./views/UserProfile.vue")
    },
    {
      path:"/gift",
      name:"gift",
      component: () => import ("./views/Gift.vue")
    },
    {
      path:"/give_gift",
      name:"giftgiving",
      component: () => import ("./views/GiveGift.vue")
    },
    {
      path:"/rankingchart",
      name:"rankingchart",
      component: () => import ("./views/RankingCharts.vue")
    },
    {
      path:"/setting",
      name:"setting",
      component: () => import ("./views/Setting.vue")
    }
  ]
})
