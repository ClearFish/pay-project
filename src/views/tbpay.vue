<template>
    <div class="tp_box">
        <div class="top_box">
            <img src="@/assets/tbpay/logo.jpg" alt="">
        </div>
        <div class="container_box">
            <p class="title">Pay to Bank</p>
            <div class="mount_box">
                <p class="money">₹{{rechargeInfo.amount}}</p>
                <p>Payment Amount</p>
            </div>
            <div class="content_box">
                <div class="first_box">
                    <p class="title">UTR</p>
                    <div class="sub_box">
                        <div class="input_box">
                            <input type="text" placeholder="please enter a 12-ditit UTR" v-model="inputVal">
                            <p class="button" @click="copy(inputVal)">Paste</p>
                        </div>
                        <div class="pay_box">
                            <div class="left paymentmonlie" @click="toPayment">Payment Failed</div>
                            <div class="left right" @click="submitUPI">Submit</div>
                        </div>
                    </div>
                    <div class="notes">
                        <p>BACK FILL REF NO./UTR（12DIGITS）</p>
                        <p>IF NOT RECHARGE TRANSACTION WILL FAIL.</p>
                    </div>
                    <div class="item_container">
                        <div class="item_box">
                            <p class="label">Bank Name:</p>
                            <div class="value">
                                <p class="val">{{rechargeInfo.bank_name}}</p>
                                <img src="@/assets/usdt-recharge/copy_icon.png" alt="" @click="copy(rechargeInfo.bank_name)">
                            </div>
                        </div>
                        <div class="item_box">
                            <p class="label">Account No.:</p>
                            <div class="value">
                                <p class="val">{{rechargeInfo.account}}</p>
                                <img src="@/assets/usdt-recharge/copy_icon.png" alt="" @click="copy(rechargeInfo.account)">
                            </div>
                        </div>
                        <div class="item_box">
                            <p class="label">IFSC Code:</p>
                            <div class="value">
                                <p class="val">{{rechargeInfo.ifsc}}</p>
                                <img src="@/assets/usdt-recharge/copy_icon.png" alt="" @click="copy(rechargeInfo.ifsc)">
                            </div>
                        </div>
                        <div class="item_box">
                            <p class="label">Account Holder Name:</p>
                            <div class="value">
                                <p class="val">{{rechargeInfo.AccountHolderName}}</p>
                                <img src="@/assets/usdt-recharge/copy_icon.png" alt="" @click="copy(rechargeInfo.AccountHolderName)">
                            </div>
                        </div>
                        <div class="item_box">
                            <p class="label">Remarks:</p>
                            <div class="value">
                                <p class="val">{{rechargeInfo.remark}}</p>
                                <img src="@/assets/usdt-recharge/copy_icon.png" alt="" @click="copy(rechargeInfo.remark)">
                            </div>
                        </div>
                        <div class="item_box">
                            <p class="label">Amount:</p>
                            <div class="value">
                                <p class="val">{{rechargeInfo.amount}}</p>
                                <img src="@/assets/usdt-recharge/copy_icon.png" alt="" @click="copy(rechargeInfo.amount)">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="second_box">
                     <div class="notes">
                        <p>BACK FILL REF NO./UTR（12DIGITS）</p>
                        <p>IF NOT RECHARGE TRANSACTION WILL FAIL.</p>
                    </div>
                    <img src="@/assets/tbpay/space.svg" alt="">
                </div>
            </div>
            <div class="left payment" @click="toPayment">Payment Failed</div>
        </div>
        <van-popup :show="show" round >
            <div class="pop_content">
                <img src="@/assets/tbpay/err_1.png" alt="">
                <p>Do you want us to replace another UPI ID?</p>
                <div class="bottom">
                    <div class="btn sure" @click="sureReplace">Yes</div>
                    <div class="btn cancle" @click="show = false">No</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script setup lang="ts">
import {ref, onUnmounted,onMounted} from "vue"
import axios from "axios"
import { copyDomText } from "../common/copy.js";
import { showToast } from 'vant';
import { useRoute } from "vue-router";
let show = ref(false)
const copy = (str:any)=>{
     copyDomText(str);
     showToast("copy suuess")
}
const toPayment = ()=>{
    console.log(123)
    show.value = true
}
const {query} = useRoute();
let rechargeInfo = ref<any>({});
let timeLeft = ref(600);
let timeStr = ref('10:00')
let inputVal = ref('')
let intervalFun;
const getDetails = ()=>{
    let params:any = {
        orderNo:query.order_number,
    }
    axios.get('/pay/upi',{params:params}).then(async (res)=>{
        let data = res.data.data;
        rechargeInfo.value = data;
        timeLeft.value = data.exp_time
        // value.value = await QRCode.toDataURL(data.qrcode)
    })
}
const transferTime = (val:number)=>{
    let min = Math.floor((val % 3600) / 60);
    let sec = val % 60;
    timeStr.value = (min > 10 ? min : '0'+min)+':'+(sec > 10 ? sec : '0'+sec)
}
const submitUPI = ()=>{
    let params:any = {
        orderNo:query.order_number,
        RefNo:inputVal.value
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
const sureReplace = ()=> {
    inputVal.value = '';
    show.value = false
}
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
</script>

<style lang="scss" scoped>
.tp_box {
    background: #fff ;
    min-height: 100vh;
    padding: 0 10px;
    box-sizing: border-box;
    margin: 0 auto;
    font-size: 14px;
    .top_box {
        display: flex;
        justify-content: center;
        max-width: 888px;
        margin: 0 auto;
        img {
            width: 80px;
            height: 80px;
        }
    }
    .container_box {
        max-width: 888px;
        margin: 0 auto;
        .title {
            color: #333;
            font-weight: 700;
        }
        .mount_box {
            width: 100%;
            height: 100px;
            border-radius: 4px;
            box-shadow: 0 0 5px 0 #c0cad9;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-top: 10px;
            gap: 10px;
            .money {
                color: #333;
                font-weight: 800;
                font-size: 18px;
            }
        }
        .content_box {
            padding: 10px;
            box-sizing: border-box;
            border-radius: 4px;
            box-shadow: 0 0 5px 0 #c0cad9;
            margin-top: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            .first_box {
                width: 100%;
                .sub_box {
                    width: 100%;
                    .input_box {
                        width: 78%;
                        input {
                            width: 70%;
                        }
                        .button {
                            width: 60px;
                        }
                    }
                }
            }
            .sub_box {
                display: flex;
                justify-content: space-between;
                gap: 8px;
                .pay_box {
                   width: 60px;
                }
            }
            .notes {
                margin-top: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                color: red;
                p {
                    margin-top: 4px;
                    font-weight: 600;
                }
            }
            .title {
                color: #333;
                font-weight: 700;
            }
            .input_box {
                display: flex;
                margin-top: 10px;
                align-items: center;
                height: 42px;
                border: 1px solid #cdcdcd;
                border-radius: 8px;
                padding-left: 10px;
                box-sizing: border-box;
                input {
                    outline: none;
                    border-radius: 2px;
                    height: 100%;
                    border: none;
                    background: none;
                    font-size: 14px;
                    flex: 1;
                }
                .button {
                    width: 80px;
                    height: 100%;
                    background: #F28B08;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    border-radius: 0 8px 8px 0;
                }
            }
            .pay_box {
                display: flex;
                gap: 10px;
                margin-top: 10px;
                .left {
                    flex: 1;
                    height: 42px;
                    border-radius: 8px;
                    border: 1px solid #cdcdcd;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .paymentmonlie {
                    display: none;
                }
                .right {
                    border: none;
                    background: #9FA8B9;
                    color: #fff;
                    width: 65px;
                }
            }
            .item_container {
                margin-top: 10px;
                .item_box {
                    display: flex;
                    justify-content: space-between;
                    height: 42px;
                    align-items: center;
                    border-bottom: 1px solid #cdcdcd;
                    .label {
                        color: #A4A7AC;
                    }
                    .value {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        img {
                            width: 18px;
                            height: 18px;
                        }
                    }
                }
            }
        }
        .payment {
            width: 100%;
            height: 42px;
            border: 1px solid #9fa8b8;
            background-color: #f9fbff;
            color: #9fa8b8;
            margin-top: 30px;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            font-size: 18px;
            align-items: center;
        }

    }
    .second_box {
        display: none;
    }
}
@media (min-width: 700px) {
    .tp_box {
        .container_box {
            .payment {
                display: none;
            }
            .first_box {
                flex: 1;
                .notes {
                    display: none;
                }
                .sub_box {
                    flex-direction: column;
                    .pay_box {
                        .paymentmonlie {
                            display: block;
                             border: 1px solid #9fa8b8;
                            background-color: #f9fbff;
                            color: #9fa8b8;
                            font-size: 16px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }
            }
        }
        .second_box {
            display: block;
            width: 330px;
            img {
                width: 246px;
                height: 360px;
            }
        }
    }
} 
.pop_content {
    padding: 20px;
    box-sizing: border-box;
    p {
        font-size: 16px;
        color: #001229;
    }
    .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        margin-top: 20px;
        .btn  {
            flex: 1;
            height: 42px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #fff;
            border-radius: 8px;
        }
        .sure {
            background: #f0a70a;
        }
        .cancle {
            background: #9fa8b7;
        }
    }
}
</style>