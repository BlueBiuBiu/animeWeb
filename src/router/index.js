import Vue from 'vue'
import VueRouter from 'vue-router'
const JapanAnime = () => import('views/detail/JapanAnime')
const EuropeAnime = () => import('views/detail/EuropeAnime')
const ChineseAnime = () => import('views/detail/ChineseAnime')
const OtherAnime = () => import('views/detail/OtherAnime')
const Introduce = () => import('views/introduce/Introduce')
const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      component: Home
    },
    {
      path: '/japan',
      component: JapanAnime
    },
    {
      path: '/chinese',
      component: ChineseAnime
    },
    {
      path: '/europe',
      component: EuropeAnime
    },
    {
      path: '/other',
      component: OtherAnime
    },
    {
      path: '/introduce',
      component: Introduce
    },
    {
      path: '/login',
      component: Login
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
