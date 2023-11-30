<template>
    <div class="recharge_box">
        <div v-if="timeLeft>0">
            <div class="logo_box">
                <img src="@/assets/mpayin/logo.png" alt="">
            </div>
            <div class="top_box">
                <p class="time">{{timeStr}}</p>
                <p class="money">₹{{rechargeInfo.amount}}</p>
            </div>
            <div class="container_box">
                <div class="select_box">
                    <p class="title">SELECT AN APP TO PAY</p>
                    <ul>
                        <li v-for="(item,index) in selectList" @click="chosePay(item,index)" :key="index" :class="checkedVal == index ? 'actived':''">
                            <div class="left">
                                <div class="img_box">
                                    <img :src="item.img" alt="" class="logo">
                                </div>
                                <p class="name">{{item.name}}</p>
                            </div>
                            <img src="@/assets/mpayin/checked.png" alt="" class="check" v-if="checkedVal == index">
                            <img src="@/assets/mpayin/no_check.png" alt="" class="check" v-else>
                        </li>
                    </ul>
                </div>
                <div class="ercode_box">
                    <div class="top">
                        <img src="@/assets/mpayin/logo_2.png" alt="">
                        <p class="title" @click="showQr">Click To Show QRCode</p>
                    </div>
                    <div class="content" v-if="isShowQr">
                        <p class="title">Scan the QR-code to pay</p>
                        <p class="subtitle">or take a screenshot and save then open UPI app to pay</p>
                        <div class="qrcode">
                            <qrcode-vue  :value="value" :size="300" :margin="2" :level="level"
                                :render-as="renderAs" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom_box">
                <div style="color: rgb(184, 141, 52); font-size: 12px; padding: 0px 16px;">
                    <p>Note:</p>
                    <p> If you have paid but have not received funds, please click the link to submit UTR. 
                        <a href="javascript:void(0)" style="color: cornflowerblue;font-size:18px">Click here to submit UTR</a>
                    </p>
                </div>
            </div>
            <div class="btn_box">
                <div class="btn"> Pay ₹ {{rechargeInfo.amount}} </div>
            </div>
            <div class="info_box">
                <div class="copys">©2023 Technical Support All Rights Reserved By Mpay</div>
                <div class="copys" style="padding-left: 8px; margin-top: 10px;"> In case of any issuers or queries please contact <strong>paypaycare001@gmail.com</strong> or try again </div>
            </div>
        </div>
        <div v-else class="timeout_box">
            <svg class="error" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="circle" cx="26" cy="26" r="25" fill="none"></circle>
                <path class="line" fill="none" d="M17.36,34.736l17.368-17.472"></path>
                <path class="line" fill="none" d="M34.78,34.684L17.309,17.316"></path>
            </svg>
            <p class="title">Payment Timeout</p>
            <p class="subtitle">The order has timed out and is now invalid. Please initiate the payment again.</p>
            <div class="return">Return to App</div>
        </div>
    </div>    
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, ref } from 'vue'
import axios from "axios"
import { copyDomText } from "../common/copy.js";
import { showToast } from 'vant';
import QrcodeVue,{Level,RenderAs} from "qrcode.vue"
import Img1 from "@/assets/mpayin/pay_1.png";
import Img2 from "@/assets/mpayin/pay_2.png";
import Img3 from "@/assets/mpayin/pay_3.png";
import Img4 from "@/assets/mpayin/pay_4.png"
const copy = (str:any)=>{
     copyDomText(str);
     showToast("copy suuess")
}
const {query} = useRoute();
let rechargeInfo = ref<any>({});
const value = ref('');
const codeVal = ref('');
const level = ref<string>('M');
const renderAs = ref<string>('svg');
const checkedVal = ref<number>(0)
const isShowQr = ref<boolean>(false)
const selectList = ref(
    [
        {name:'Paytm',img:Img1},
        {name:'PhonePe',img:Img2},
        {name:'Google Pay',img:Img3},
        {name:'OTHER APPS',img:Img4}
    ]
)
let timeLeft = ref(600);
let timeStr = ref('10:00')
let intervalFun;
onMounted(async()=>{
    getDetails();
    clearInterval(intervalFun)
    intervalFun = setInterval(()=>{
        if(timeLeft.value == 0) {
            timeLeft.value = 0
        }else {
            timeLeft.value--;
            transferTime(timeLeft.value)
        }
    },1000)
    
})
const transferTime = (val:number)=>{
    let min = Math.floor((val % 3600) / 60);
    let sec = val % 60;
    timeStr.value = (min > 10 ? min : '0'+min)+':'+(sec > 10 ? sec : '0'+sec)
}
onUnmounted(()=>{
    clearInterval(intervalFun)
})
const getDetails = ()=>{
    let params:any = {
        orderNo:query.order_number,
    }
    axios.get('/pay/upi',{params:params}).then(res=>{
        let data = res.data.data;
        rechargeInfo.value = data;
        // timeLeft.value = data.exp_time
        value.value = data.qrcode
    })
}
const chosePay = (itemm:any,index:number)=>{
    checkedVal.value = index
}
const showQr = ()=>{
    isShowQr.value = !isShowQr.value
}
</script>
<style lang="scss" scoped>
.recharge_box {
    width: 100%;
    min-height: 100vh;
    background: #e3e3e4;
    padding-bottom: 20px;
    .logo_box {
        display: flex;
        justify-content: center;
        padding: 20px 0;
        img {
            width: 52%;
            height: auto;
        }
    }
    .top_box {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
        .time {
            font-size: 18px;
        }
        .money {
            font-size: 20px;
            font-weight: 600;
        }
    }
    .container_box {
        margin-top: 10px;
        padding: 0 20px;
        box-sizing: border-box;
        .select_box {
            background: #fff;
            border-radius: 8px;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            .title {
                font-size: 14px;
                height: 42px;
                line-height: 42px;
            }
            ul {
                width: 100%;
                li{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    height: 62px;
                    align-items: center;
                    padding: 10px;
                    box-sizing: border-box;
                    margin-bottom: 8px;
                    .left {
                        display: flex;
                        align-items: center;
                        .img_box {
                            width: 80px;
                            display: flex;
                            justify-content: flex-start;
                        }
                        .name {
                            font-weight: 700;
                            font-size: 14px;
                        }
                    }
                    .check {
                        width: 18px;
                        height: 18px;
                    }
                    &:nth-child(1) {
                        .logo {
                            width: 76px;
                            height: 60px;
                        }
                    }
                    &:nth-child(2) {
                        .logo {
                            width: 52px;
                            height: 42px;
                        }
                    }
                    &:nth-child(3) {
                        .logo {
                            width: 52px;
                            height: 42px;
                        }
                    }
                    &:nth-child(4) {
                        .logo {
                            width: 42px;
                            height: 42px;
                        }
                    }
                }
                .actived {
                    border: 1px solid #00b8f2;
                    border-radius: 8px;
                }
            }
        }
        .ercode_box {
            background: #fff;
            border-radius: 8px;
            width: 100%;
            padding: 16px;
            box-sizing: border-box;
            margin-top: 16px;
            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 0;
                img {
                    width: 85px;
                    height: 39px;
                }
            }
            .content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-top: 8px;
                .title {
                    font-size: 20px;
                    font-weight: bold;
                }
                .subtitle {
                    font-size: 14px;
                    line-height: 24px;
                    text-align: center;
                }
            }
        }
        
    }
    .bottom_box {
        margin-top: 10px;
    }
    .btn_box {
        padding: 0 16px;
        box-sizing: border-box;
        margin-top: 16px;
        .btn {
            width: 100%;
            height: 46px;
            border-radius: 8px;
            color: #fff;
            background: #00b8f2;
            font-size: 18px;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .info_box {
        padding: 16px;
        box-sizing: border-box;
        font-size: 12px;
        color: #755757;
    }
}
.timeout_box {
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background: #fff;
    .error {
        width: 96px;
        height: 96px;
        border-radius: 50%;
        display: block;
        stroke-width: 2;
        stroke: #fff;
        stroke-miterlimit: 10;
        margin: 20px auto;
        box-shadow: inset 0px 0px 0px #e74c3c;
        animation: fillred 0.5s ease-in-out 0.5s forwards, scale 0.3s ease-in-out 0.7s both;
        .line {
            transform-origin: 50% 50%;
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            animation: stroke 0.7s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        .circle {
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            stroke-width: 2;
            stroke-miterlimit: 10;
            stroke: #e74c3c;
            fill: none;
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        @keyframes stroke {
            100% {
                stroke-dashoffset: 0;
            }
        }
    }
    svg {
        overflow: hidden;
        vertical-align: middle;
    }
    .title {
        font-size: 24px;
        text-align: center;
        font-family: Space Grotesk;
        font-weight: 600;
        color: #212529;
    }
    .subtitle {
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 16px;
        color: #212529;
        margin-top: 10px;
        text-align: center;
    }
    .return {
        width: 110px;
        height: 32px;
        margin: 0 auto;
        margin-top: 30px;
        color: #fff;
        background: #007bff;
        text-align: center;
        line-height: 32px;
        border-radius: 4px;
    }
    @keyframes fillred {
        100% {
            box-shadow: inset 0px 0px 0px 3rem #e74c3c;
        }
    }
    @keyframes scale {
        0%,100%{
            transform: none;
        }
        50% {
            transform: scale3d(1.2, 1.2, 1);
        }
        80% {
            transform: scale3d(0.8, 0.8, 1);
        }
    }
}
</style>