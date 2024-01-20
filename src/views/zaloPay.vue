<template>
    <div class="recharge_box">
        <div class="container">
            <div class="top">
                <div class="left">
                    <p class="title">Số tiền</p>
                    <p class="value">{{rechargeInfo.amount}}</p>
                </div>
                <div class="right">
                    <p class="title">Mã ký quỹ</p>
                    <p class="value">{{rechargeInfo.orderNo}}</p>
                </div>
            </div>
            <div class="center">
                <img src="@/assets/zalopay/logo.svg" alt="">
                <img :src="Qrvalue" alt="" class="center">
            </div>
            <div class="info_box">
                <div class="item">
                    <p class="label">Ngân Hàng:</p>
                    <p class="value">{{rechargeInfo.bank_name}}</p>
                    <img src="@/assets/zalopay/copy.svg" alt="" @click="copy(rechargeInfo.bank_name)">
                </div>
                <div class="item">
                    <p class="label">Số Tài Khoản:</p>
                    <p class="value">{{rechargeInfo.account}}</p>
                    <img src="@/assets/zalopay/copy.svg" alt=""  @click="copy(rechargeInfo.account)">
                </div>
                <div class="item">
                    <p class="label">Tên Tài Khoản:</p>
                    <p class="value">{{rechargeInfo.AccountHolderName}}</p>
                    <img src="@/assets/zalopay/copy.svg" alt=""  @click="copy(rechargeInfo.AccountHolderName)">
                </div>
                <div class="item">
                    <p class="label">Số tiền:</p>
                    <p class="value">{{rechargeInfo.amount}}</p>
                    <img src="@/assets/zalopay/copy.svg" alt=""  @click="copy(rechargeInfo.amount)">
                </div>
                <div class="item">
                    <p class="label">Nội Dung CK:</p>
                    <p class="value">{{rechargeInfo.orderNo}}</p>
                    <img src="@/assets/zalopay/copy.svg" alt=""  @click="copy(rechargeInfo.orderNo)">
                </div>
                 <div class="item">
                    <p class="label">Thời gian còn lại:</p>
                    <p class="value">{{timeStr}}</p>
                    <p class="empty"></p>
                </div>
            </div>
            <div class="bottom_info">
                <p class="first">Sử dụng ứng dụng ngân hàng của bạn để quét mã QR để hoàn tất chuyển khoản nhanh chóng! ! !</p>
                <div class="bottom">
                    <p class="second">Vui lòng nhất định phải điền Nội Dung CK <span class="add_color">{{rechargeInfo.orderNo}}</span>phía trên khi chuyển khoản.</p>
                    <p class="add_color">(Nếu không điền đủ thông tin nội dung chuyển khoản, giao dịch của bạn sẽ phải chờ để được xử lý)</p>
                </div>
            </div>
            <div class="footer">
                <div class="line"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from 'vue'
import axios from "axios"
import { copyDomText } from "../common/copy.js";
import { showToast } from 'vant';
import QRCode from "qrcode"
const {query} = useRoute();
const details = ref<any>({});
const bankVals = ref<any>({});
const ercode = ref<string>('')
let timeLeft = ref(600);
let timeStr = ref('10:00')
let rechargeInfo = ref<any>({});
const Qrvalue = ref('')
let intervalFun;
const getDetails = ()=>{
    let params:any = {
        orderNo:query.order_number,
    }
    axios.get('/pay/upi',{params:params}).then(async (res)=>{
        let data = res.data.data;
        rechargeInfo.value = data;
        timeLeft.value = data.exp_time
        Qrvalue.value = await QRCode.toDataURL(data.qrcode)
    })
}
const copy = (str:any)=>{
     copyDomText(str);
     showToast("copy suuess")
}
const transferTime = (val:number)=>{
    let min = Math.floor((val % 3600) / 60);
    let sec = val % 60;
    timeStr.value = (min > 10 ? min : '0'+min)+':'+(sec > 10 ? sec : '0'+sec)
}
onMounted(()=>{
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
.recharge_box {
    width: 100%;
    .container {
        width: 100%;
        box-shadow: 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12), 0 8px 10px -7px rgba(0,0,0,.2);
        background: #fff;
        border: 1px solid transparent;
        height: calc(100% - 160px);
        min-height: calc(100vh - 260px);
        padding: 20px 0;
        box-sizing: border-box;
        background: #fff;
        .top {
            display: flex;
            justify-content: space-between;
            color: #636b6f;
            font-size: 14px;
            padding: 0 30px;
             box-sizing: border-box;
            .value {
                margin-top: 4px;
            }
        }
        .center {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                width: 210px;
                height: 60px;
            }
            .center {
                width: 160px;
                height: 160px;
                margin-top: 10px;
            }
        }
        .info_box {
            margin-top: 10px;
            font-size: 14px;
            color: #636b6f;
            padding: 0 30px;
             box-sizing: border-box;
            .item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 30px;
                border-bottom: 1px dotted #cdcdcd;
                .label {
                    width: 42%;
                }
                .value {
                    width: 50%;
                }
                img {
                    width: 24px;
                }
                .empty {
                    width: 24px;
                }
            }
        }
        .bottom_info {
            margin-top: 20px;
            font-size: 14px;
            color: #636b6f;
            padding: 0 30px;
             box-sizing: border-box;
            p{
                line-height: 24px;
            }
            .first {
                    color: red;
                }
            .bottom {
                .add_color {
                    color: red;
                    margin: 0 2px;
                }
            }
        }
        .footer {
            background: #f0f2f5;
            margin-top: 4px;
            padding: 24px 50px;
            .line {
                height: 2px;
                width: 100%;
                background-color: red;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
@media  (min-width: 768px) {
    .recharge_box {
        width: 750px;
        margin: 0 auto;
        margin-top: 40px;
        .container {
            .center {
                .qrcode {
                    width: 280px;
                    height: 280px;
                }
            }
            .info_box {
                width: 460px;
                margin: 0 auto;
                margin-top: 10px;
            }
        }
    }
}
</style>