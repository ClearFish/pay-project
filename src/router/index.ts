import { createRouter,createWebHashHistory,RouteRecordRaw } from "vue-router";;
import Home from "@/views/home.vue";
import Deposit from "@/views/deposit.vue"

const routes : Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Home,
        redirect: '/deposit',
        children:[]
    },
    {
        path:"/home",
        name:"Home",
        component:Home
    },
    {
        path:"/deposit",
        name:"Usercenter",
        component:Deposit
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;