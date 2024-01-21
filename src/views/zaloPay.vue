<template>
    <div class="recharge_box">
        <div v-if="hasExpred" class="other_box">
            <img src="@/assets/zalopay/cuo.jpeg" alt="">
            <p class="word">Lệnh chuyển tiền vô hiệu . Hãy tạo lệnh mới</p>
        </div>
        <div class="container" v-else>
            <div class="top">
                <div class="left">
                    <p class="title">Số tiền</p>
                    <p class="value">{{rechargeInfo.money}}</p>
                </div>
                <div class="right">
                    <p class="title">Mã ký quỹ</p>
                    <p class="value">{{rechargeInfo.sessionId}}</p>
                </div>
            </div>
            <div class="center">
                <img src="@/assets/zalopay/logo.svg" alt="">
                <img :src="ercode" alt="" class="center">
            </div>
            <div class="info_box">
                <div class="item">
                    <p class="label">Ngân Hàng:</p>
                    <p class="value">{{rechargeInfo.bankName}}</p>
                    <img src="@/assets/zalopay/copy.svg" alt="" @click="copy(rechargeInfo.bankName)">
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
                    <p class="value">{{rechargeInfo.money}}</p>
                    <img src="@/assets/zalopay/copy.svg" alt=""  @click="copy(rechargeInfo.money)">
                </div>
                <div class="item">
                    <p class="label">Nội Dung CK:</p>
                    <p class="value" style="color:red">{{rechargeInfo.sessionId}}</p>
                    <img src="@/assets/zalopay/copy.svg" alt=""  @click="copy(rechargeInfo.sessionId)">
                </div>
                 <div class="item">
                    <p class="label">Thời gian còn lại:</p>
                    <p class="value"  style="color:red">{{timeStr}}</p>
                    <p class="empty"></p>
                </div>
            </div>
            <div class="bottom_info">
                <p class="first">Sử dụng ứng dụng ngân hàng của bạn để quét mã QR để hoàn tất chuyển khoản nhanh chóng! ! !</p>
                <div class="bottom">
                    <p class="second">Vui lòng nhất định phải điền Nội Dung CK <span class="add_color">{{rechargeInfo.sessionId}}</span>phía trên khi chuyển khoản.</p>
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
const hasExpred = ref(false)
const Qrvalue = ref('')
let intervalFun;
const getData = ()=>{
    axios.post('/banks/'+query.order_number).then(res=>{
        bankVals.value = res.data;
        timeLeft.value = res.data.exp_time;
        if(res.data.exp_time == 0) {
            hasExpred.value = true
        }
    });
}
getData();
const getDetails = ()=>{
    let params:any = {
        sessionId:query.order_number,
        bankType:'VnmVietinbank'
    }
    axios.post('/pay/bank/Bankconfirm',params).then(async (res)=>{
        let data = res.data.data;
        rechargeInfo.value = data;
        let parms = {
            amount: res.data.data.money,
            card_account: res.data.data.account,
            add_info: res.data.data.remark,
            acq:res.data.data.bank_othen.pay_acq.value,
         }

        axios.post('/api/qrcode',parms).then((res)=>{
            ercode.value = res.data.data;
         })
        
    })
}
const copy = (str:any)=>{
     copyDomText(str);
     showToast("copy suuess")
}
const transferTime = (val:number)=>{
    let min = Math.floor((val % 3600) / 60);
    let sec = val % 60;
    timeStr.value = (min >= 10 ? min : '0'+min)+':'+(sec >= 10 ? sec : '0'+sec)
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
    .other_box {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            width: 234px;
            height: 234px;
        }
        .word {
            color: red;
            font-size: 20px;
            margin-top: 10px;
            text-align: center;
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