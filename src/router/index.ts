import { createRouter,createWebHashHistory,RouteRecordRaw } from "vue-router";;
import Home from "@/views/home.vue";
import Deposit from "@/views/deposit.vue"
import Recharge from "@/views/recharge.vue"
import usdtRecharge from "@/views/usdtRecharge.vue"
import usdtDeposit from "@/views/usdtDeposit.vue"
import mPayin from "@/views/mpayin.vue"
import mPayins from "@/views/mpayins.vue"
import cecoPay from "@/views/cecopay.vue"
import tbPay from "@/views/tbpay.vue"
import zaloPay from "@/views/zaloPay.vue" 
import depositPay from "@/views/depositPay.vue"
import upiPay from "@/views/upi-pay.vue"
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
    },
    {
        path:"/usdtdeposit",
        name:"usdtDeposit",
        component:usdtDeposit
    },
    {
        path:"/mPayin",
        name:"mPayin",
        component:mPayin
    },
    {
        path:"/mPayins",
        name:"mPayins",
        component:mPayins
    },
    {
        path:"/cecoPay",
        name:"cecoPay",
        component:cecoPay,
    },
    {
        path:"/tbPay",
        name:"tbPay",
        component:tbPay,
    },
    {
        path:"/zaloPay",
        name:"zaloPay",
        component:zaloPay,
    },
    {
        path:"/depositPay",
        name:"depositPay",
        component:depositPay,
    },
    {
        path:"/upiPay",
        name:"upiPay",
        component:upiPay,
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;