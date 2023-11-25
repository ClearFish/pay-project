<template>
    <div class="recharge_box">
        <div v-if="timeLeft>0">
            <div class="logo_box">
                <img src="@/assets/cecopay/logo.png" alt="">
                <p class="title">cecopay</p>
            </div>
            <div class="top_box">
                <div class="item_box">
                    <div class="left">
                        <p class="name">Transfer Amount</p>
                        <p class="amount">5000</p>
                    </div>
                    <div class="time_box">
                        <img src="@/assets/cecopay/time.svg" alt="">
                        <p class="time">{{timeStr}}</p>
                    </div>
                </div>
                <div class="item_box">
                    <p class="label">Rference Number</p>
                    <div class="right">
                        <p class="value">123123123123123</p>
                        <img src="@/assets/cecopay/copy.svg" alt="">
                    </div>
                </div>
                <div class="item_box">
                    <p class="label">UPI ID</p>
                    <div class="right">
                        <p class="value">123123123123123</p>
                        <img src="@/assets/cecopay/copy.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="container_box">
                <div class="top_step">
                    <p class="title">Step1</p>
                    <p class="value">Please scan the QR code with your favorite UPI app and copy the UTR code</p>
                </div>
                <div class="qr">
                    <div class="qrcode">
                        <qrcode-vue  :value="value" :size="200" :margin="2" :level="level"
                            :render-as="renderAs" />
                    </div>
                </div>
                <div class="code_btn">Download / Open</div>
                <div class="list_box">
                    <p>PayTM,Phone PE,UPI</p>
                    <div class="list_con">
                        <div class="list_item" v-for="(item,index) in selectList" :key="index">
                            <img :src="item.img" alt="">
                            <p>{{item.name}}</p>
                        </div>
                    </div>
                </div>
                <div class="top_step add_margin">
                    <p class="title">Step2</p>
                    <p class="value">Please fill in the Red No./UTP No after the transaction is comleted</p>
                </div>
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
import Img4 from "@/assets/mpayin/logo.png"
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
        {name:'UPI',img:Img4}
    ]
)
let timeLeft = ref(600);
let timeStr = ref('10:00')
let intervalFun;
onMounted(async()=>{
    // getDetails();
    clearInterval(intervalFun)
    // intervalFun = setInterval(()=>{
    //     if(timeLeft.value == 0) {
    //         timeLeft.value = 0
    //     }else {
    //         timeLeft.value--;
    //         transferTime(timeLeft.value)
    //     }
    // },1000)
    
})
const transferTime = (val:number)=>{
    let min = Math.floor((val % 3600) / 60);
    let sec = val % 60;
    timeStr.value = min+':'+sec
}
onUnmounted(()=>{
    clearInterval(intervalFun)
})
const getDetails = ()=>{
    let params:any = {
        lang:"zh-cn",
        order_number:query.order_number,
    }
    axios.get('/addons/epay/api/orderinfo',{params:params}).then(res=>{
        let data = res.data.data;
        rechargeInfo.value = data;
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
    background: #fff;
    padding-bottom: 20px;
    .logo_box {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
        img {
            width: 25%;
            height: auto;
        }
        .title {
            font-size: 22px;
            margin-top: -10px;
        }
    }
    .top_box {
        margin-top: 20px;
        padding: 0 20px;
        box-sizing: border-box;
        .item_box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            .left {
                .amount {
                    font-size: 24px;
                    color: #457FC3;
                    font-weight: 600;
                }
            }
            .time_box {
                padding: 8px 16px;
                background: #457FC3;
                display: flex;
                align-items: center;
                gap: 4px;
                border-radius: 4px;
                box-shadow: 0px 1px 10px rgba(69, 127, 195,0.8);
                .time {
                    color: #fff;
                }

            }
            .right {
                display: flex;
                gap: 6px;
                .value {
                    color: red;
                }
            }
        }
    }
    .container_box {
        padding:20px;
        box-sizing: border-box;
        .top_step {
            display: flex;
            padding: 10px;
            gap: 8px;
            border-radius: 4px;
            align-items: center;
            box-shadow: 0px 1px 10px rgba(2, 157, 250,0.8);
            .title {
                padding: 4px 12px;
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #029DFA;
                color: #fff;
                font-size: 12px;
            }
            .value {
                font-size: 12px;
            }
        }
        .add_margin {
            margin-top: 20px;
        }
        .qr {
            width: 76%;
            margin: 0 auto;
            margin-top: 20px;
            border-radius: 12px;
            border: 1px solid #029DFA;
            box-sizing: border-box;
            padding: 15px;
            .qrcode {
                padding: 20px;
                box-sizing: border-box;
                border-radius: 12px;
                border: 1px solid #029DFA;
                position: relative;
                &::before {
                    content: "";
                    width: 50%;
                    height: 4px;
                    background: #fff;
                    position: absolute;
                    right: 0;
                    top: -2px;
                }
                &::after {
                    content: "";
                    width: 13px;
                    height: 50%;
                    background: #fff;
                    position: absolute;
                    right: -2px;
                    top: -10px;
                }
            }
        }
        .code_btn {
            width: 74%;
            margin: 0 auto;
            margin-top: 10px;
            border-radius: 10px;
            padding: 12px;
            border: 2px solid #029DFA;
            color: #029DFA;
        }
        .list_box {
            margin-top:20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            .list_con {
                display: flex;
                width: 98%;
                justify-content: space-between;
                margin-top: 20px;
                .list_item {
                    width: 30%;
                    border-radius: 10px;
                    border: 1px solid #666;
                    padding: 10px 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: 40px;
                    }
                    p {
                        // height: 40px;
                    }
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