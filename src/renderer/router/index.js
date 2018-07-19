import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'csdHome',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '/',
      name: 'csdHome',
      component: require('@/components/chenshidan/home').default
    },
    {
      path: '/valid',
      name: 'valid',
      component: require('@/components/chenshidan/valid').default
    },
    {
      path: '/item',
      name: 'chenshidanItem',
      component: require('@/components/chenshidan/item').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
