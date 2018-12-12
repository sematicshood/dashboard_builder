import VueRouter from 'vue-router'

import Login from './views/login.vue'
import Gallery from './views/gallery.vue'
import Create from './views/create.vue'

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
        path: '/create',
        component: Create,
        meta: {
            requiresAuth: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const token   =   JSON.parse(localStorage.getItem('login'))
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if(token) {
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