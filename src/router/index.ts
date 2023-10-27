import { createRouter,createWebHashHistory,RouteRecordRaw } from "vue-router";;
import Home from "@/views/home.vue";
import Deposit from "@/views/deposit.vue"
import Recharge from "@/views/recharge.vue"
import usdtRecharge from "@/views/usdtRecharge.vue"
const routes : Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Home,
        redirect: '/usdtrecharge',
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
    },
    {
        path:"/usdtrecharge",
        name:"usdtRecharge",
        component:usdtRecharge
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;