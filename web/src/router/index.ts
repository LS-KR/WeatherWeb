import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import("../views/Home.vue")
    },
    {
        path: '/city/:cityId',
        name: 'City',
        props: true,
        component: () => import('../views/City.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) return { selector: to.hash }
        return { top: 0 }
    }
})

export default router