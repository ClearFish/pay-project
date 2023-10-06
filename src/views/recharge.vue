<template>
    <div class="recharge_box">
        <div class="img_box">
            <img src="@/assets/vibbank.png" alt="" class="bank">
        </div>
        <div class="content_box">
            <div class="left">
                <div class="title" id="orderid">
                    <div class="title-1">Mã đơn hàng</div>
                    <div class="content-1">{{details.sessionId}}</div>
                </div>
                <div class="title" id="amount">
                    <div class="title-1">Số dư thanh toán</div>
                    <div class="content-1">{{details.money}}</div>
                </div>
                <div class="main-box" id="type" style="display: block;">
                    <div class="tips expire-time">
                        Quét mã chuyển tiền trong vòng {{bankVals.exp_time}}s
                    </div>
                    <div class="qrcode">
                        <img :src="ercode" alt="">
                    </div>
                    <div v-if="bankVals.exp_tim == 0">
                        <div class="countdown countdown-invalid">Mã QR đã hết hạn</div>
                        <div class="save-tip save-tip-invalid">Vui lòng kéo lại đơn hàng</div>
                    </div>
                </div>
            </div>
            <div class="left rigth">
                <div class="bank">
                    <div class="text-container" style="margin-top: 0.25rem;">
                        <span class="bank-title input-text">NỘI DUNG CHUYỂN KHOẢN</span>
                        <div class="bank-content">
                            <span class="text" id="seno">{{details.trans_code}}</span>
                            <span class="btn btn-invalid" @click="copy(details.trans_code)">Nhấn để sao chép</span>
                        </div>
                    </div>
                    <div class="text-container bank-username bank-info-main">
                        <span class=" bank-title bank-info-username">Thông tin người thụ hưởng</span>
                        <div class="bank-content">
                            <span class="text" id="copy1">{{details.bankName}}</span>
                            <span class="btn btn-invalid" @click="copy(details.bankName)">Nhấn để sao chép</span>
                        </div>
                    </div>
                    <div class="text-container bank-account bank-info-main">
                        <span class=" bank-title bank-info-account">Số tài khoản ngân hàng thụ hưởng</span>
                        <div class="bank-content">
                            <span class="text" id="copy2">{{details.account}}</span>
                            <span class="btn btn-invalid" @click="copy(details.account)">Nhấn để sao chép</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="attention-1">
                <div>
                    <div class="attention-1-title">Danh mục chú ý</div>
                    <div class="attention-1-content" style="color: red;">Các bạn nhớ nhập nội dung ghi chú chuyển khoản, nếu không sẽ không thể nạp tiền thành công</div>
                </div>
                <div>
                    <div class="attention-1-title bottom-title">Lời nhắc nhở ấm áp</div>
                    <div class="attention-1-content bottom-content">Vui lòng xác nhận lại thông tin tài khoản ngân hàng của bạn, điền và thanh toán trong thời gian còn hiệu lực. Nếu hết thời gian hiệu lực, vui lòng tạo mới lại đơn hàng</div>
                </div>
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
const {query} = useRoute();
const details = ref<any>({});
const bankVals = ref<any>({});
const ercode = ref<string>('')
const getData = ()=>{
    axios.post('/banks/'+query.query).then(res=>{
        bankVals.value = res.data
      
    });
}
getData();
const getDetails = ()=>{
    let params = {
        sessionId:query.query,
        bankType:'VnmVietinbank'
    }
     axios.post('/pay/bank/Bankconfirm',params).then(res=>{
         details.value = res.data.data;
         let parms = {
            amount: res.data.data.money,
            card_account: res.data.data.account,
            add_info: res.data.data.recipient,
            acq:res.data.data.bank_othen.pay_acq.value,
         }
         axios.post('/api/qrcode',parms).then(res=>{
            ercode.value = res.data.data;
         })
    });
}
const copy = (str:any)=>{
     copyDomText(str);
     showToast("copy suuess")
}
onMounted(()=>{
    getDetails();
    let timer:any = null;
        timer = setInterval(() => {
             bankVals.value.exp_time --;
             if(bankVals.value.exp_time == 0) {
                clearInterval(timer)
             }
        }, 1000);
})
</script>
<style lang="scss" scoped>
.recharge_box {
    width: 100%;
    .img_box {
        width: 100%;
        height: 44px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 4px rgba(73, 100, 243, 0.1);
        img {
            display: block;
            width: 40%;
            height: auto;
            margin: 5px auto;
            margin-top: 0;
            position: relative;
            z-index: 1;
        }
    }
    .content_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        padding: 10px;
        .left {
            width: 98%;
            min-height: 267px;
            height: initial;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 4px 4px rgba(73, 100, 243, 0.1);
            border-radius: 12px;
            padding: 10px;
            margin-bottom: 10px;
            .title {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                padding: 5px 10px;
                .title-1 {
                    font-family: DINAlternate-Bold;
                    font-size: 14px;
                    color: #ACACB5;
                    letter-spacing: 0;
                    font-weight: 700;
                    position: relative;
                    z-index: 2;
                }
                .content-1 {
                    font-family: DINAlternate-Bold;
                    font-size: 14px;
                    color: #1B1C21;
                    letter-spacing: 0;
                    text-align: right;
                    font-weight: 700;
                    position: relative;
                    z-index: 2;
                }
                &:nth-child(2) {
                    border-bottom: 1px solid rgba(73, 100, 243, 1);
                }
            }
            .main-box {
                width: 100%;
                /* min-height: 230px; */
                height: initial;
                background: rgba(255, 255, 255, 1);
                // box-shadow: 0px 4px 4px rgba(73, 100, 243, 0.1);
                border: 1px solid rgba(255, 255, 255, 1);
                border-radius: 12px;
                padding: 10px 5px;
                color: #ffffff;
                box-sizing: border-box;
                .expire-time {
                    width: 100%;
                    line-height: 10px;
                    text-align: center;
                    font-family: DINAlternate-Bold;
                    font-size: 14px;
                    letter-spacing: 0;
                    color: rgba(27, 28, 33, 1);
                }
                .qrcode {
                    width: 115px;
                    height: 115px;
                    background: #cdcdcd;
                    margin: 0 auto;
                    margin-top: 6px;
                    margin-bottom: 6px;
                    padding: 2px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .countdown {
                    text-align: center;
                    padding-top: 5px;
                    font-family: DINAlternate-Bold;
                    font-size: 18px;
                    color: rgba(255, 83, 83, 1);
                    letter-spacing: 0;
                    text-align: center;
                    font-weight: 700;
                    font-weight: bold;
                }
                .save-tip {
                    /* width: 6.5rem; */
                    /* height: 30px; */
                    /* line-height: 30px; */
                    text-align: center;
                    /* border: 1px solid rgba(255, 255, 255, 1); */
                    font-size: 14px;
                    font-family: DINAlternate-Bold;
                    /* border-radius: 4px; */
                    /* margin: 5px auto; */
                    color: rgb(27, 28, 33);
                }
            }
        }
        .rigth {
            .bank {
                display: flex;
                flex-direction: column;
                gap: 20px;
                align-items: flex-start;
                .text-container {
                    width: 100%;
                    .bank-title {
                        font-family: DINAlternate-Bold;
                        font-size: 14px;
                        color: #ACACB5;
                        letter-spacing: 0;
                        font-weight: 700;
                        padding-left: 10px;
                        display: block;
                        text-align: left;
                        margin-bottom: 8px;
                    }
                    .bank-content {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        .text {
                            width: 60%;
                            height: 34px;
                            line-height: 34px;
                            background: #F3F4FD;
                            border-radius: 12px;
                            padding: 0 10px;
                            font-family: DINAlternate-Bold;
                            font-size: 16px;
                            color: #1B1C21;
                            letter-spacing: 1.2px;
                            font-weight: 700;
                            text-align: left;
                        }
                        .btn {
                            width: 118px;
                            height: 34px;
                            background: #4964F3;
                            border: 1px solid rgba(255, 255, 255, 1);
                            box-shadow: 0px 4px 8px 0px rgba(0, 34, 215, 0.5);
                            border-radius: 12px;
                            /* line-height: 34px; */
                            text-align: center;
                            font-family: DINAlternate-Bold;
                            font-size: 12px;
                            color: #ffffff;
                            letter-spacing: 0;
                            font-weight: 700;
                            line-height: 34px;
                        }
                    }
                }
            }
        }
    }
    .bottom {
        padding:  10px;
        box-sizing: border-box;
        .attention-1 {
            width: 100%;
            min-height: 200px;
            height: initial;
            background-size: 100%;
            margin: 0 auto;
            padding: 7px 12px;
            background: #ffffff;
            border-radius: 12px;
            box-sizing: border-box;
            .attention-1-title {
                font-family: DINAlternate-Bold;
                font-size: 14px;
                color: #ACACB5;
                letter-spacing: 0;
                font-weight: 700;
                padding: 5px 10px;
                text-align: left;
            }
             .attention-1-content {
                /* width: 6.7rem; */
                height: initial;
                background: #F3F4FD;
                border-radius: 12px;
                font-family: DINAlternate-Bold;
                font-size: 16px;
                color: #1B1C21;
                letter-spacing: 1.2px;
                font-weight: 700;
                padding: 10px;
                text-align: left;
            }
        }
    }
}
</style>
<style scoped>
@media screen and (min-width: 450px) {
    .recharge_box > .content_box {
        flex-direction: row;
    }
    .recharge_box >.img_box > .bank {
        width: 4%;
        height: auto;
    }
  .recharge_box > .content_box > .left {
        width: 48%;
        margin-bottom: 0;
    }
}
</style>