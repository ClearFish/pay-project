<template>
    <div class="recharge_box">
        <div class="top_box">
            <div class="content">该地址仅支持充值 USDT-TRC20,不支持其他币种</div>
            <div class="content">到账金额按照实际充值金额计算</div>
        </div>
        <div class="container_box">
            <div class="code_box">
                <img src="data:image/png;base64,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" alt="">
            </div>
            <div class="info_box">
                <p class="title">USDT-TRC20：</p>
                <p class="content">Tron（USDT-TRC20）</p>
            </div>
            <div class="info_box add_margin">
                <p class="title">USDT-TRC20：</p>
                <div class="content dress">
                    <p class="address_info">TTeY5EmTaTENoJm88zoMLJodxL6scy77E9</p>
                    <img src="@/assets/usdt-recharge/copy_icon.png" alt="" @click="copy('TTeY5EmTaTENoJm88zoMLJodxL6scy77E9')">
                </div>
            </div>
            <div class="remind">
                <div class="title">注意事项</div>
                <div class="content">1.最小充值金额: <text style="color:#F0A70A">10USDT</text>, 小于最小金额的充值将不会到账。</div>
                <div class="content">2.请勿向上述地址充值任何非币种资产，否则资产将不可找回.</div>
                <div class="content">3.请务必确认操作环境安全，防止信息被篡改和泄露.</div>
            </div>
            <div class="link_box">
                <img :src="item.img" alt="" v-for="(item,index) in linkList" :key="index" @click="toUrl(item.url)">
            </div>
        </div>
    </div>    
</template>
<script setup lang="ts">
import Ba from "@/assets/usdt-recharge/ba.png"
import Im from "@/assets/usdt-recharge/im.png"
import Okx from "@/assets/usdt-recharge/okx.png"
import { useRoute } from "vue-router";
import { onMounted, ref } from 'vue'
import axios from "axios"
import { copyDomText } from "../common/copy.js";
import { showToast } from 'vant';
const linkList = ref<any>(
            [
                {img:Ba,url:"https://www.binance.com/"},
                {img:Okx,url:"https://www.okx.com/"},
                {img:Im,url:"https://token.im//"},
            ])
const copy = (str:any)=>{
     copyDomText(str);
     showToast("copy suuess")
}
const {query} = useRoute();
const toUrl = (url:any) =>{
     window.open(url,"_blank")
}
onMounted(async()=>{
    getDetails();
})
const getDetails = ()=>{
    let params = {
        lang:"zh-cn",
        order_number:query.order_number
    }
    axios.get('/addons/epay/api/orderinfo',params).then(res=>{
        
    })
}
</script>
<style lang="scss" scoped>
    .recharge_box {
        width: 100%;
        .top_box {
            background: #2d912c;
            height: 200px;
            padding-top: 20px;
            box-sizing: border-box;
            .content {
                text-align: center;
                color: #fff;
            }
        }
        .container_box {
            padding: 0 20px;
            .code_box {
                margin: 0 auto;
                width: 100%;
                background: #ffffff;
                padding: 20px;
                height: 300px;
                border-radius: 10px;
                box-shadow: 2px 2px 2px #a0a3a3;
                margin-top: -100px;
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
               
            }
            .info_box {
                margin-top: 15px;
                .title {
                    font-size: 15px;
                    color: #000;
                    font-weight: bold;
                    text-align: left;
                }
                .content {
                    color: #2d912c;
                    position: relative;
                    margin-top: 4px;
                    &::after {
                        content: "";
                        position: absolute;
                        left: 0;
                        bottom: -8px;
                        width: 100%;
                        height: 2px;
                        background: #F3F5F8;
                    }
                }
            }
            .add_margin {
                margin-top: 30px;
                .dress {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .address_info {
                        color: #F0A70A;
                    }
                    img {
                        width: 23px;
                        height: 23px;
                    }
                }
            }
            .remind {
                width: 100%;
                background: #F3F5F8;
                padding: 15px;
                border-radius: 5px;
                margin-top: 10px;
                margin-top: 15px;
                .title {
                    color: #F6465D;
                    margin-bottom: 12px;
                }
                .content {
                    font-size: 12px;
                    margin-bottom: 8px;
                }
            }
            .link_box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 15px;
                img {
                    width: 30%;
                }
            }
        }
    }
</style>