import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Common from '../views/Common'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Common,
        children: [{
            path: '',
            name: 'Home',
            component: Home
        }]
    },
    {
        path: '/detail',
        component: Common,
        children: [{
            path: '',
            name: 'detail',
            component: () =>
                import ('../views/Detail.vue')
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '*',
        name: 'error',
        component: () =>
            import ('../views/Error.vue')
    }
]


//  /*在跳转之前执行*/
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title
//   let user = localStorage.getItem('user')
//   if (to.path === '/login' || to.path ==='/regiest') {
//     next()
//   } else {
//     user ? next() : next('/login')
//   }
// })


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router