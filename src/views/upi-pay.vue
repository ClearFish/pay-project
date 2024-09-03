<template>
     <div class="big_box">
        <div class="top_box">
            <div class="top_left">
                <div class="title">Transfer payment</div>
                <div class="sub_title">Follow steps below to finish deposit</div>
            </div>
            <div class="top_right">
                <div class="cancle_btn">Cancel</div>
            </div>
        </div>
        <div class="content_box">
            <div class="top_time">
                <img src="@/assets/upi/time.svg" alt="">
                <div class="word">This order will cancel in</div>
                <div class="time">{{timeStr}}</div>
            </div>
            <div class="container_box">
                <div class="cont_title">
                    <div class="title">Step1: Transfer payment</div>
                    <div class="sub_title">Please send payment to this address.</div>
                    <div class="sub_title">Please scan QRcode and send payment to this address.</div>
                </div>
                <div class="qrcode_box">
                    <div class="img_box">
                         <qrcode-vue 
                            class="qrcode"  
                            :value="qrVal" 
                            :size="136" 
                            :margin="2" 
                            :level="level" 
                            id="picture"  
                            ref="qrcodeRef"
                        />
                    </div>
                    <div class="save_btn" @click="saveImg">Save Image</div>
                </div>
                <div class="info_box">
                    <div class="info_item">
                        <div class="label">Amount</div>
                        <div class="value amount_val">
                            <div class="amount">{{rechargeInfo.amount || ''}}</div>
                            <div class="dw">{{rechargeInfo.currency}}</div>
                            <div class="btn" @click="copy(rechargeInfo.amount)">Copy</div>
                        </div>
                    </div>
                    <div class="info_item">
                        <div class="label">Address</div>
                        <div class="value address_val">
                            <div class="amount address">{{rechargeInfo.extParam}}</div>
                            <div class="btn" @click="copy(rechargeInfo.extParam)">Copy</div>
                        </div>
                    </div>
                </div>
                <div class="tips_box">
                    <div class="tips_item">The upi it's 100% safe.please feel free to transfer.</div>
                    <div class="tips_item">This address only valid for this order. Do not transfer without apply.</div>
                </div>
            </div>
             <div class="container_box steps2_box">
                <div class="cont_title">
                    <div class="title">Step2: Fill in UTR Number</div>
                    <div class="sub_title">Please copy and fill in 12 digit UTR number.</div>
                </div>
                <div class="tips_box">
                    <div class="tips_item">Wrong UTR will cause delay.</div>
                </div>
                <div class="guie_box">
                    <img src="@/assets/upi/finger.svg" alt="" class="finger">
                    <div class="word">Where to find UTR?</div>
                </div>
                <div class="input_box">
                    <input 
                        class="utr_input"
                        placeholder="UTR Number"
                        placeholderStyle="color:#999999;font-size:20px;font-weight:700"
                        v-model="utrNumber"
                    />
                    <div class="btn" @click="paste">Paste</div>
                </div>
                <div class="confirm_box">Confirm</div>
            </div>
        </div>
    </div>  
</template>
<script setup>
import {ref, onUnmounted,onMounted} from "vue"
import axios from "axios"
import { useRoute } from "vue-router";
import { showToast } from 'vant';
import { copyDomText } from "../common/copy.js";
import QrcodeVue from "qrcode.vue"
import dayjs from "dayjs"
import {base64ToBlob} from "../common/base64toBlob.js"
const {query} = useRoute();
let rechargeInfo = ref({})
let timeLeft = ref(null)
const utrNumber = ref(null)
let timeStr = ref('10:00')
const qrVal = ref(null)
const level = ref('M');
const qrcodeRef = ref(null)
let intervalFun;
const getData = ()=>{
    axios.get('api/pay/queryOrder/'+query.order_number).then(async (res)=>{
        let data = await res.data.data;
        rechargeInfo.value = data;
        let timeDiff = dayjs().diff(data.expiredTime, 'second');
        qrVal.value = data.extParam
        timeLeft.value = timeDiff
    })
}
const transferTime = (val)=>{
    let min = Math.floor((val % 3600) / 60);
    let sec = val % 60;
    timeStr.value = (min > 10 ? min : '0'+min)+':'+(sec > 10 ? sec : '0'+sec)
}
const copy = (str)=>{
     copyDomText(str);
     showToast("copy suuess")
}
const saveImg = ()=>{
    let myCanvas = document.getElementById('picture');
    let a = document.createElement("a")
    a.href = myCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    a.download = "qrcode.png"
    a.click()
}
const paste = async()=>{
    let res = await navigator.clipboard.readText();
    utrNumber.value = res
}
onMounted(async ()=>{
    await getData()
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
@font-face {
    font-family: SWICC;
    src: url("@/assets/font/SWISSC.TTF");
}
@font-face {
    font-family: Archive;
    src: url("@/assets/font/Archive.otf");
}
.big_box {
    width: 100%;
    min-height: 100vh;
    background: #F1E9E3;
    text-align: left;
    .top_box {
        padding: 10px 16px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #fff;
        .top_left {
            .title {
                font-family: Archive;
                font-weight: 900;
                font-size: 18px;
                color: #333333;
                line-height: 32px;
            }
            .sub_title {
                font-weight: 500;
                font-size: 12px;
                color: #666666;
            }
        }
        .top_right {
            .cancle_btn {
                padding: 6px 10px;
                box-sizing: border-box;
                border-radius: 20px;
                border: 1px solid #666666;
                color: #666666;
                font-size: 14px;
            }
        }
    }
    .content_box {
        padding: 16px;
        box-sizing: border-box;
        .top_time {
            display: flex;
            justify-content: center;
            width: 100%;
            align-items: center;
            font-size: 13px;
            color: #000000;
            gap: 4px;
            img {
                width: 17px;
            }
            .time {
                font-weight: 900;
                font-size: 18px;
                color: #D51010;
            }
        }
        .container_box {
            background: #fff;
            padding: 15px;
            box-sizing: border-box;
            border-radius: 10px;
            margin-top: 16px;
            .cont_title {
                padding-left: 20px;
                box-sizing: border-box;
                position: relative;
                .title {
                    font-weight: 900;
                    font-size: 18px;
                    color: #333333;
                    font-family: SWICC;
                    line-height: 28px;
                }
                .sub_title {
                    margin-bottom: 4px;
                    font-weight: 500;
                    font-size: 12px;
                    color: #666666;
                }
                &::after {
                    content: "";
                    width: 7px;
                    height: 100%;
                    background: #D51010;
                    border-radius: 4px;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
            .qrcode_box {
                margin-top: 12px;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                .img_box {
                    border: 1px solid #E1E1E1;
                    padding: 10px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    #picture {
                        width: 100%;
                        height: 100%;
                    }
                }
                .save_btn { 
                    width: 200px;
                    height: 45px;
                    background-image: linear-gradient(180deg, #FFE84A 0%, #FF6231 100%);
                    border-radius: 6px;
                    color: #fff;
                    font-weight: 900;
                    font-size: 18px;
                    color: #FFFFFF;
                    font-family: Archive;
                    margin-top: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            .info_box {
                margin-top: 20px;
                .info_item {
                    margin-bottom: 16px;
                    .label {
                        font-weight: 700;
                        font-size: 18px;
                        color: #333333;
                    }
                    .value {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        height: 46px;
                        background: #F6F6F6;
                        gap: 6px;
                        border-radius: 6px;
                        padding: 0 6px;
                        margin-top: 10px;
                        .amount {
                            flex: 1;
                            font-weight: 700;
                            font-size: 18px;
                            color: #333333;
                        }
                        .address {
                            flex: unset;
                            max-width: 75%;
                            word-break: break-all;
                            line-height: 16px;
                        }
                        .dw {
                            font-weight: 400;
                            font-size: 14px;
                            color: #999999;
                        }
                        .btn {
                            padding: 6px 13px;
                            border-radius: 4px;
                            font-weight: 900;
                            font-size: 12px;
                            color: #FFFFFF;
                            background-image: linear-gradient(180deg, #FFE84A 0%, #FF6231 100%);
                        }
                    }
                }
            }
            .tips_box {
                margin-top: 18px;
                font-weight: 500;
                font-size: 12px;
                color: #666666;
                .tips_item {
                    padding-left: 20px;
                    position: relative;
                    margin-bottom: 10px;
                    &::after {
                        content: "";
                        width: 5px;
                        height: 5px;
                        border-radius: 5px;
                        background: #D51010;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
            }
        }
        .steps2_box {
            .tips_box {
                margin-top: 10px;
            }
            .guie_box {
                display: flex;
                align-items: center;
                gap: 4px;
                img {
                    width: 16px;
                }
                .word {
                    font-weight: 900;
                    font-size: 12px;
                    color: #EB3131;
                    
                }
            }
            .input_box {
                margin-top: 10px;
                display: flex;
                height: 46px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 46px;
                background: #F6F6F6;
                padding: 0 6px;
                box-sizing: border-box;
                .utr_input {
                    color: #333;
                    font-size: 20px;
                    font-weight: 900;
                    border: none;
                    outline: none;
                    background: none;
                    box-shadow: none;
                    width: 75%;
                }
                .btn {
                    padding: 6px 13px;
                    border-radius: 4px;
                    font-weight: 900;
                    font-size: 12px;
                    color: #FFFFFF;
                    background-image: linear-gradient(180deg, #FFE84A 0%, #FF6231 100%);
                }
            }
            .confirm_box {
                margin-top: 20px;
                width: 100%;
                height: 45px;
                background-image: linear-gradient(180deg, #FF4E4E 0%, #D51010 100%);
                border-radius: 6px;
                color: #fff;
                font-weight: 900;
                font-size: 18px;
                font-family: Archive;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>