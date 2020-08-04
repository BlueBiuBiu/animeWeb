import Vue from 'vue'
import VueRouter from 'vue-router'
const Detail = () => import('views/detail/Detail')
const Home = () => import('views/home/Home')

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      component: Home
    },
    {
      path: '/more',
      component: Detail
    },
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
