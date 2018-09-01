import Vue from 'vue'
import Router from 'vue-router'
/*import Home from '@/components/home/home'
import Layout from '@/components/layout'
import Login from '@/components/login'
import Detail from '@/components/detial/detail'
import Mixed from '@/components/mixed/mixed'
import MixedDetail from '@/components/detial/mixedDetail'*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'],resolve)
    },
    {
      path: '/',
      component: resolve => require(['@/components/layout'],resolve),
      children:[
        {
          path: '/',
          name: 'Home',
          component: resolve => require(['@/components/home/home'],resolve)
        },
        {
          path: '/detail',
          name: 'Detail',
          //component: Detail
          component: resolve => require(['@/components/detial/detail'],resolve)
        },
        {
          path: '/mixed',
          name: 'Mixed',
          //component: Mixed
          component: resolve => require(['@/components/mixed/mixed'],resolve)
        },
        {
          path: '/mixedDetail',
          name: 'MixedDetail',
          //component: MixedDetail
          component: resolve => require(['@/components/detial/mixedDetail'],resolve)
        }
      ]
    }
  ]
})
