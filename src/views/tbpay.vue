<template>
    <div class="tp_box">
        <div class="top_box">
            <img src="@/assets/tbpay/logo.png" alt="">
        </div>
        <div class="container_box">
            <p class="title">Pay to Bank</p>
            <div class="mount_box">
                <p class="money">₹500</p>
                <p>Payment Amount</p>
            </div>
            <div class="content_box">
                <div class="first_box">
                    <p class="title">UTR</p>
                    <div class="sub_box">
                        <div class="input_box">
                            <input type="text" placeholder="please enter a 12-ditit UTR">
                            <p class="button">Paste</p>
                        </div>
                        <div class="pay_box">
                            <div class="left paymentmonlie" @click="toPayment">Payment Failed</div>
                            <div class="left right">Submit</div>
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
                                <p class="val">12312313</p>
                                <img src="@/assets/usdt-recharge/copy_icon.png" alt="">
                            </div>
                        </div>
                        <div class="item_box">
                            <p class="label">Account No.:</p>
                            <div class="value">
                                <p class="val">12312313</p>
                                <img src="@/assets/usdt-recharge/copy_icon.png" alt="">
                            </div>
                        </div>
                        <div class="item_box">
                            <p class="label">IFSC Code:</p>
                            <div class="value">
                                <p class="val">12312313</p>
                                <img src="@/assets/usdt-recharge/copy_icon.png" alt="">
                            </div>
                        </div>
                        <div class="item_box">
                            <p class="label">Account Holder Name:</p>
                            <div class="value">
                                <p class="val">12312313</p>
                                <img src="@/assets/usdt-recharge/copy_icon.png" alt="">
                            </div>
                        </div>
                        <div class="item_box">
                            <p class="label">Remarks:</p>
                            <div class="value">
                                <p class="val">12312313</p>
                                <img src="@/assets/usdt-recharge/copy_icon.png" alt="">
                            </div>
                        </div>
                        <div class="item_box">
                            <p class="label">Amount:</p>
                            <div class="value">
                                <p class="val">12312313</p>
                                <img src="@/assets/usdt-recharge/copy_icon.png" alt="">
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
                    <div class="btn sure">Yes</div>
                    <div class="btn cancle" @click="show = false">No</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script setup lang="ts">
import {ref} from "vue"
let show = ref(false)
const toPayment = ()=>{
    console.log(123)
    show.value = true
}
</script>

<style lang="scss" scoped>
.tp_box {
    background: #F8FBFF;
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
            border-radius: 4px;
            box-shadow: 0 0 5px 0 #c0cad9;
            margin-top: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            .sub_box {
                display: flex;
                justify-content: space-between;
                gap: 8px;
                .pay_box {
                    flex: 1;
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