<template>
    <div class="recharge_box">
        <div>
            <div class="logo_box">
                <img src="@/assets/cecopay/logo.jpg" alt="">
                <!-- <p class="title">cecopay</p> -->
            </div>
            <div class="top_box">
                <div class="item_box">
                    <div class="left">
                        <p class="name">Transfer Amount</p>
                        <p class="amount">{{rechargeInfo.amount}}</p>
                    </div>
                    <div class="time_box">
                        <img src="@/assets/cecopay/time.svg" alt="">
                        <p class="time">{{timeStr}}</p>
                    </div>
                </div>
                <div class="item_box">
                    <p class="label">Rference Number</p>
                    <div class="right">
                        <p class="value">{{rechargeInfo.remark}}</p>
                        <img src="@/assets/cecopay/copy.svg" alt="" @click="copy(rechargeInfo.orderNo)">
                    </div>
                </div>
                <div class="item_box">
                    <p class="label">UPI ID</p>
                    <div class="right">
                        <p class="value">{{rechargeInfo.upi_id}}</p>
                        <img src="@/assets/cecopay/copy.svg" alt="" @click="copy(rechargeInfo.upi_id)">
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
                        <!-- <qrcode-vue id="qrcode"  :value="value" :size="200" :margin="2" :level="level"
                            :render-as="renderAs" /> -->
                            <img :src="value" alt="">
                    </div>
                </div>
                <div class="code_btn" @click="savePng">Download / Open</div>
                <div class="list_box">
                    <p>PayTM,Phone PE,UPI</p>
                    <div class="list_con">
                        <div class="list_item" 
                            v-for="(item,index) in selectList" 
                            :key="index" 
                            :class="chosedIndex == index ?'chosed':''"
                            @click="chosePay(item,index)">
                            <div class="img_box">
                                <img :src="item.img" alt="">
                            </div>
                            <p>{{item.name}}</p>
                        </div>
                    </div>
                </div>
                <div class="top_step add_margin">
                    <p class="title">Step2</p>
                    <p class="value">Please fill in the Red No./UTP No after the transaction is comleted</p>
                </div>
                <div class="input_box">
                    <p class="title">UTR</p>
                    <input type="text" placeholder="UTR / UPI Ref No / UPI Transaction ID" v-model="inputValue">
                </div>
                <div class="submit" @click="submit">Submit</div>
                <div class="bottom_intro">
                    <p class="title">Instructions for Deposits:</p>
                    <p class="content">1. Please save the QR code or copy the UPI ID for payment purposes. The account is only valid for a single deposit; please do not make any subsequent deposits to avoid potential loss of funds.</p>
                    <p class="content">2. Please ensure that the deposited amount matches the originally applied amount, as any discrepancy may result in a failed transaction or loss of funds</p>
                    <p class="content">3. You may pay through any app for the given UPI ID.</p>
                    <p class="content">4. Complete the transaction in 5 mins or the money may LOST.</p>
                    <p class="content">5. If, within 24 hours, 5 deposit attempts fail to complete a successful payment, your ID will be temporarily suspended for a 24-hour period</p>
                    <p class="content">6. Kindly note that we cannot be held responsible for any losses incurred if you did not adhere to the aforementioned guidelines.</p>
                </div>
            </div>
        </div>
        <!-- <div v-else class="timeout_box">
            <svg class="error" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="circle" cx="26" cy="26" r="25" fill="none"></circle>
                <path class="line" fill="none" d="M17.36,34.736l17.368-17.472"></path>
                <path class="line" fill="none" d="M34.78,34.684L17.309,17.316"></path>
            </svg>
            <p class="title">Payment Timeout</p>
            <p class="subtitle">The order has timed out and is now invalid. Please initiate the payment again.</p>
            <div class="return">Return to App</div>
        </div> -->
        <div class="footer_fixed">
            <img src="@/assets/mpayin/security.svg" alt="">
            <p class="content">100% Secure Payments Powered by UPI</p>
        </div>
    </div>    
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, ref } from 'vue'
import axios from "axios"
import { copyDomText } from "../common/copy.js";
import { showToast } from 'vant';
import Img1 from "@/assets/mpayin/pay_1.png";
import Img2 from "@/assets/mpayin/pay_2.png";
import Img3 from "@/assets/mpayin/pay_3.png";
import Img4 from "@/assets/mpayin/logo.png"
import QRCode from "qrcode"
const copy = (str:any)=>{
     copyDomText(str);
     showToast("copy suuess")
}
const {query} = useRoute();
let rechargeInfo = ref<any>({});
const value = ref('');
let inputValue = ref('')
const selectList = ref(
    [
        {name:'Paytm',img:Img1,link:'paytmmp://pay'},
        {name:'PhonePe',img:Img2,link:'phonepe://pay'},
        {name:'Google Pay',img:Img3,link:'gpay://upi/pay'},
        // upi://pay?mc=5411&am=2100&cu=INR&pa=im.201024410107@indus&pn=Mr.Shoyabkhan&tr=EZV2024013015522025282896&tn=NUmAKJ5roEJY16/
        {name:'UPI',img:Img4,link:'upi://pay'}
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
let payVal = ref<any>(selectList.value[0])
let chosedIndex = ref<number>(0)
const chosePay = (item:any,index:number)=>{
    payVal.value = item;
    chosedIndex.value = index;
    let urlParams = rechargeInfo.value.qrcode.split("?")[1]
    // console.log(item.link+`?mc=5411&am=${Number(rechargeInfo.value.amount)}&cu=INR&`+urlParams,"11")
    window.location.href = item.link+`?mc=5411&am=${Number(rechargeInfo.value.amount)}&cu=INR&`+urlParams
}
onUnmounted(()=>{
    clearInterval(intervalFun)
})
const getDetails = ()=>{
    let params:any = {
        orderNo:query.order_number,
    }
    axios.get('/pay/upi',{params:params}).then(async (res)=>{
        let data = res.data.data;
        rechargeInfo.value = data;
        timeLeft.value = data.exp_time
        let [start,end] = data.qrcode.split('?')
        let qrValue = start + `?mc=5411&am=${Number(rechargeInfo.value.amount)}&cu=INR&`+end
        // console.log(qrValue,"qrValue")
        value.value = await QRCode.toDataURL(qrValue)
    })
}
const savePng = ()=>{
    const downloadLink = document.createElement('a');
    downloadLink.href = value.value;
    downloadLink.download = 'qrCode.png'; // 设置下载文件名
    downloadLink.click();
}
const submit = ()=>{
    
    let params:any = {
        orderNo:query.order_number,
        RefNo:inputValue.value
    }
    axios.post('/pay/upi/ToSubmit',params).then(async (res)=>{
        let data = res.data;
        if(data.code == 1) {
            showToast('successful!')
        }else {
            showToast(data.message)
        }
    })
}
</script>
<style lang="scss" scoped>
.recharge_box {
    width: 100%;
    min-height: 100vh;
    background: #fff;
    padding-bottom: 70px;
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
                    color: #F8B403;
                    font-weight: 600;
                }
            }
            .time_box {
                padding: 8px 16px;
                background: #402408;
                display: flex;
                align-items: center;
                gap: 4px;
                border-radius: 4px;
                // box-shadow: 0px 1px 10px rgba(248, 180, 3,0.8);
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
            border: 1px solid #cdcdcd;
            // box-shadow: 0px 1px 10px rgba(248, 180, 3,0.8);
            .title {
                padding: 4px 12px;
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #F8B403;
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
            border: 1px solid #F8B403;
            box-sizing: border-box;
            padding: 15px;
            .qrcode {
                padding: 20px;
                box-sizing: border-box;
                border-radius: 12px;
                border: 1px solid #F8B403;
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
            border: 2px solid #F8B403;
            color: #F8B403;
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
                flex-wrap: wrap;
                row-gap: 16px;
                .list_item {
                    width: 48%;
                    border-radius: 10px;
                    border: 1px solid #666;
                    padding: 10px 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    .img_box {
                        height: 32px;
                    }
                    img {
                        width: 40px;
                    }
                    &.chosed {
                        border-color: #F8B403;
                    }
                }
            }
        }
        .input_box {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            gap: 20px;
            align-items: center;
            .title {
                font-size: 20px;
                font-weight: 700;
            }
            input {
                flex: 1;
                height: 42px;
                line-height: 42px;
                box-shadow: none;
                outline: none;
                border-radius: 4px;
                color: rgba(0, 0, 0, 0.88);
                padding-left: 10px;
                border: 1px solid #d9d9d9;
                font-size: 16px;
            }
        }
        .submit {
            width: calc(100% - 20px);
            height: 42px;
            margin: 0 auto;
            margin-top: 10px;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #F8B403;
            color: #fff;
            font-size: 20px;
            font-weight: 600;
        }
        .bottom_intro {
            margin-top: 20px;
            .title {
                font-size: 20px;
                font-weight: 600;
            }
            .content {
                margin-top: 16px;
                color: #333333;
                font-size: 14px;
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
    .footer_fixed {
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48px;
        border-top: 1px solid #cdcdcd;
        background: #fff;
        font-size: 12px;
        gap: 8px;
        img {
            width: 32px;
            height: 32px;
        }
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