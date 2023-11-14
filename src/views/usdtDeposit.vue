<template>
    <div class="recharge_box">
        <div class="top_box">
            <div class="content">该地址仅支持充值 USDT-TRC20,不支持其他币种</div>
            <div class="content">到账金额按照实际充值金额计算</div>
        </div>
        <div class="container_box">
            <div class="code_box">
                <qrcode-vue  :value="value" :size="300" :margin="2" :level="level"
                    :render-as="renderAs" />
            </div>
            <div class="info_box">
                <p class="title">USDT-TRC20：</p>
                <p class="content">Tron（USDT-TRC20）</p>
            </div>
            <div class="info_box add_margin">
                <p class="title">USDT-TRC20：</p>
                <div class="content dress">
                    <p class="address_info">{{rechargeInfo.qrcode}}</p>
                    <img src="@/assets/usdt-recharge/copy_icon.png" alt="" @click="copy(rechargeInfo.qrcode)">
                </div>
            </div>
            <div class="remind">
                <div class="title">注意事项</div>
                <!-- <div class="content">1.最小充值金额: <text style="color:#F0A70A">10USDT</text>, 小于最小金额的充值将不会到账。</div> -->
                <div class="content">1.请勿向上述地址充值任何非币种资产，否则资产将不可找回.</div>
                <div class="content">2.请务必确认操作环境安全，防止信息被篡改和泄露.</div>
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
import QrcodeVue,{Level,RenderAs} from "qrcode.vue"
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
let rechargeInfo = ref<any>({});
const value = ref('');
const codeVal = ref('');
const level = ref<string>('M');
const renderAs = ref<string>('svg');

onMounted(async()=>{
    getDetails();
})
const getDetails = ()=>{
    let params:any = {
        lang:"zh-cn",
        order_number:query.order_number,
        token:query.token
    }
    console.log(params,"12123123")
    axios.get('/addons/epay/api/orderinfo',{params:params}).then(res=>{
        let data = res.data.data;
        rechargeInfo.value = data;
        value.value = data.qrcode
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
                    text-align: left;
                }
                .content {
                    font-size: 12px;
                    margin-bottom: 8px;
                    text-align: left;
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