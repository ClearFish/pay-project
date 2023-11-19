<template>
    <div class="recharge_box">
        <div class="logo_box">
            <img src="@/assets/mpayin/logo.png" alt="">
        </div>
        <div class="top_box">
            <p class="time"></p>
            <p class="money"></p>
        </div>
    </div>    
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from 'vue'
import axios from "axios"
import { copyDomText } from "../common/copy.js";
import { showToast } from 'vant';
import QrcodeVue,{Level,RenderAs} from "qrcode.vue"
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
    min-height: 100vh;
    background: #e3e3e4;
    .logo_box {
        display: flex;
        justify-content: center;
        padding: 20px 0;
        img {
            width: 50%;
            height: auto;
        }
    }
}
</style>