import VueRouter from 'vue-router'

import Login from './views/login.vue'
import Gallery from './views/gallery.vue'
import Dashboard from './views/dashboard.vue'

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Gallery,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/dashboard/:name/:type',
        component: Dashboard,
        name: 'dashboard',
        meta: {
            requiresAuth: true,
            breadcumb: 'Home / Dashboard / :name'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const token   =   JSON.parse(localStorage.getItem('login')),
          acc     =   JSON.parse(localStorage.getItem('user'))

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if(token && acc) {
            if(token['access_token'])
                next()
            else
                router.push('/login')
        } else {
            router.push('/login')
        }
    }

    next()
})

export default router