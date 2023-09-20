<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { copyDomText } from "../common/copy.js";
import { showToast } from 'vant';
import axios from "axios"
import Img1 from "../assets/img1.jpg"
import Img2 from "../assets/img2.jpg"
import Img3 from "../assets/img3.png"
import { useRoute } from "vue-router";
const list = [
    {
        name:"Orange Money",
        url:Img1,
        key:'CiOrange'
    },
    {
        name:"Mtn momo",
        url:Img2,
        key:'CiMtn'
    },
        {
        name:"CiWave",
        url:Img3,
        key:'CiWave'
    }
]
let choseItem = ref()
const steps = ref(0)
let inputValue = ref()
let listFilter = ref<any>([])
const {query} = useRoute();
const showCommand = (step:number,item?:any)=>{
    if(step == 1){
        let params = {
            sessionId:query.query,
            bankType:item.key
        }
        axios.post("/pay/bank/Bankconfirm",params).then(res=>{
            let data = res.data.data;
            item.amount = data.money;
            item.banance = data.account
            choseItem.value = item;
            steps.value = step
        })
    }else {
        steps.value = step;
        choseItem.value = item;
    }
}
const confirmValue = ()=>{
    let params = {
        sessionId:query.query,
        refer:inputValue.value
    }
    axios.post("/pay/bank/refer",params).then(res=>{
        let data = res.data;
        if(data.success) {
            showToast('success!')
            steps.value = 0;
        }else {
            showToast(data.message)
        }
    })
}
const copy = (str:any)=>{
     copyDomText(str);
     showToast("copy suuess")
}
const getData = ()=>{
    axios.post('/banks/'+query.query).then(res=>{
        list.filter(item=>{
            if(res.data.onlineBank.includes(item.key)) {
                listFilter.value.push(item)
            } 
        })
    });
}
onMounted(()=>{
    getData()
})
</script>
<template>
    <div class="big_box">
        <div class="content_box" v-if="steps == 0">
            <p class="top">Paiement bancaire</p>
            <p class="title">Veuillez sélectionner la banque bénéficiaire</p>
            <ul>
                <li v-for="(item,index) in listFilter" :key="index" @click="showCommand(1,item)">
                    <img :src="item.url" />
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="content_box step1" v-if="steps == 1">
            <p class="top">Détails de la commande</p>
            <div class="first">
                <p>Montant du transfert:</p>
                <div class="action">
                    <p class="add_line"  @click="copy(choseItem.amount)">{{choseItem.amount}}XOF</p>
                    <button @click="copy(choseItem.amount)">COPIE</button>
                </div>
            </div>
            <div class="first second">
                <p>Nom de banque:</p>
                <img :src="choseItem.url" alt="">
                <p class="name">{{choseItem.name}}</p>
            </div>
            <div class="first last">
                 <p style="padding-left:10px">Numéro de carte bancaire:</p>
                <div class="action">
                    <p class="add_line" @click="copy(choseItem.banance)">{{choseItem.banance}}</p>
                    <button @click="copy(choseItem.banance)">COPIE</button>
                </div>
            </div>
            <div class="btn_box">
                <button @click="showCommand(2,choseItem)">Transfert terminé</button>
            </div>
        </div>
        <div class="content_box step2" v-if="steps == 2">
            <p class="top">Transfert terminé</p>
            <img src="https://api.springtech.me/theme/basic/images/intro/8012.jpg" alt="">
            <p class="content">Saisir les identifiants de transfert</p>
            <div class="input">
                <van-field v-model="inputValue" border/>
            </div>
            <div class="bottom">
                <button @click="confirmValue"> Confirmer </button>
                <button @click="showCommand(0,choseItem)"> Annuler </button>
            </div>
        </div>
        <div v-if="steps == 1" class="notice">
            <p>1."Copiez le bénéficiaire et le montant, puis utilisez l'application bancaire pour effectuer le virement"</p>
            <p>2."Assurez-vous d'entrer le bon bénéficiaire, le montant et le numéro de compte de réception; sinon la transaction échouera"</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.big_box {
    width: 100%;
    height: 100%;
    background: #0f4c81;
    padding: 50px 10px;
    box-sizing: border-box;
    .content_box {
        margin-top: 50px;
        background: #f5f5f5;
        border-radius: 8px;
        padding-bottom: 20px;
        .top {
            text-align: center;
            font-size: 25px;
            color: #328CE5;
            border-bottom: 5px solid #ccc;
            padding: 20px 0;
        }
        .title {
            color: #328CE5;
            font-size: 16px;
            text-align: center;
            padding: 10px 0;
        }
        ul {
            margin-top: 20px;
            padding: 0 20px;
            li {
                display: flex;
                margin-bottom: 10px;
                padding: 20px 10px;
                background: #fff;
                img {
                    width: 24px;
                    height: 24px;
                }
                p {
                    color: #328CE5;
                    font-size: 25px;
                    margin-left: 20px;
                }
            }
        }
    }
    .step1 {
        .top {
            color: #0f4c81;
            border-bottom: 1px solid #0f4c81;
        }
        .first {
            padding: 10px;
            .action {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 20px;
                button {
                    width: 100px;
                    height: 40px;
                    border-radius: 4px;
                    outline: none;
                    border: 1px solid #0f4c81;
                    margin-left: 40px;
                }
                .add_line {
                    text-decoration: underline;
                }
            }
        }
        .second {
            display: flex;
            margin: 20px 0;
            align-items: center;
            img {
                width: 24px;
                height: 24px;
                margin: 0 10px;
            }
            .name {
                font-size: 20px;
                font-weight: bold;
                color: #328CE5;
            }
        }
        .last {
            width: 100%;
            border-bottom: 1px solid #0f4c81;
        }
        .btn_box {
            button {
                cursor: pointer;
                border: 1px solid #cccccc;
                padding: 10px 30px;
                background-color: #fff;
                color: #0f4c81;
                border-radius: 5px;
                margin: 20px;
                font-size: 30px;
            }
        }
    }
    .notice {
        padding: 10px;
        margin-top: 20px;
        border-top: 5px solid #ccc;
        p {
            color: #fff;
            line-height: 24px;
            margin-top: 10px;
        }
    }
    .step2 {
        border: 1px solid #ccc;
        .top {
            color: #1daf38;
            margin: 20px;
            font-size: 20px;
            border: none;
        }
        img {
            width: 50%;
            height: 50%;
        }
        .content {
            margin-top: 20px;
            text-align: center;
        }
        .input {
            width: 50%;
            margin: 0 auto;
            margin-top: 10px;
            ::v-deep {
                .van-cell {
                    border: 1px solid #cdcdcd;
                    border-radius: 4px;
                }
            }

        }
        .bottom {
            display: flex;
            justify-content: space-between;
            // width: 60%;
            margin: 0 auto;
            margin-top: 20px;
            button {
                background: #fff;
                margin: 20px;
                color: #0f4c81;
                font-weight: bold;
                border: 1px solid #0f4c81;
                padding: 20px;
                border-radius: 5px;
            }
        }
    }
}
</style>