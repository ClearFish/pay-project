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
                    <div class="input_box">
                        <input type="text" placeholder="please enter a 12-ditit UTR">
                        <p class="button">Paste</p>
                    </div>
                    <div class="pay_box">
                        <div class="left">Paymen Failed</div>
                        <div class="left right">Submit</div>
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
                            <p class="label">IFSC:</p>
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
            </div>
        </div>
    </div>
</template>
<script setup>
</script>

<style lang="scss" scoped>
.tp_box {
    background: #F8FBFF;
    min-height: 100vh;
    padding: 0 10px;
    box-sizing: border-box;
    max-width: 800px;
    margin: 0 auto;
    font-size: 14px;
    .top_box {
        display: flex;
        justify-content: center;
        img {
            width: 80px;
            height: 80px;
        }
    }
    .container_box {
        .title {
            color: #333;
            font-weight: 700;
        }
        .mount_box {
            width: 100%;
            height: 100px;
            border-radius: 4px;
            box-shadow: 0px 1px 10px #666;
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
            box-shadow: 0px 1px 10px #666;
            margin-top: 10px;
            display: flex;
            flex-direction: column;
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
                .right {
                    border: none;
                    background: #9FA8B9;
                    color: #fff;
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
    }
}
</style>