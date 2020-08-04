import Vue from 'vue'
import VueRouter from 'vue-router'
const JapanAnime = () => import('views/detail/JapanAnime')
const EuropeAnime = () => import('views/detail/EuropeAnime')
const ChineseAnime = () => import('views/detail/ChineseAnime')
const OtherAnime = () => import('views/detail/OtherAnime')
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
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
