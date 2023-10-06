import { createRouter,createWebHashHistory,RouteRecordRaw } from "vue-router";;
import Home from "@/views/home.vue";
import Deposit from "@/views/deposit.vue"
import Recharge from "@/views/recharge.vue"
const routes : Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Home,
        redirect: '/recharge',
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
    },
    {
        path:"/recharge",
        name:"Recharge",
        component:Recharge
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;