<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { showToast } from 'vant';
import {useRouter} from "vue-router"
const rechargeList = ref([
  {
    "code": "1",
    "id": "1",
    "maxamount": "1650.00",
    "minamount": "10.00",
    "name": "portefeuille de paiement en ligne",
    "orderby": "3",
    "show": null,
    "status": "0"
  },
    {
    "code": "2",
    "id": "2",
    "maxamount": "1651.00",
    "minamount": "11.00",
    "name": "portefeuille de paiement zh ligne",
    "orderby": "4",
    "show": null,
    "status": "0"
  }
])
let choseIndex = ref(0);
let inputValue = ref();
const router = useRouter()
let choseItem = ref<any>()
const choseOne = (item:any,index:number)=>{
  choseIndex.value = index;
  choseItem.value = item;
}
const toDeposit = ()=>{
  if(!inputValue.value) {
    showToast('amount is must')
  }else if(Number(inputValue.value) > Number(choseItem.value.maxamount)) {
    showToast('maxamount is $'+choseItem.value.maxamount)
  }else if(Number(inputValue.value) < Number(choseItem.value.minamount)) {
    showToast('minamount is $'+choseItem.value.minamount)
  }else {
    router.push("/deposit")
  }
}
onMounted(()=>{
  choseItem.value = rechargeList.value[0];
})
</script>

<template>
 <div class="home_box">
  <div class="top_box">
    <div class="channek_box">
      <p class="title">Recharge channel</p>
      <ul>
        <li v-for="(item,index) in rechargeList" :key="index" @click="choseOne(item,index)" :class="index == choseIndex ? 'active_li':''">
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <div class="channek_box input_box">
      <p class="title">Recharge channel</p>
      <div class="input_container">
        <p>$</p>
        <!-- <input type="number" maxlength="6" placeholder="Please enter the recharge amount"> -->
        <van-field v-model="inputValue" maxlength="6"  placeholder="Please enter the recharge amount" />
      </div>
    </div>
    <div class="btn_box">
      <button @click="toDeposit">Recharge now</button>
    </div>
  </div>
  <div class="bottom_box">
    <p class="title">Recharge instructions</p>
    <p>1. Please pay the amount according to the operating instructions.</p>
    <p>2. The amount entered must be consistent with the payment amount.</p>
    <p>3. If you encounter any situation, please contact your manager consultant in time.</p>
  </div>
 </div>


</template>

<style scoped lang="scss">
.home_box {
  width: 100%;
  padding: 8px;
  background: #fff;
  box-sizing: border-box;
  overflow: hidden;
  .top_box {
    .channek_box {
      padding: 10px;
      background: rgb(241, 241, 241);
      .title {
        color: #333;
        font-weight: bold;
        margin-bottom: 20px;
      }
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 44%;
          padding: 8px;
          border: 1px solid #cdcdcd;
          border-radius: 4px;
          p {
            color: rgba(0, 0, 0, .85);
            font-size: 12px;
          }
        }
        .active_li {
          border: 1px solid #0081ff;
          position: relative;
          &::before {
              content: '';
              position: absolute;
              right: -1px;
              bottom: -1px;
              border: 16px solid #0081ff;
              border-top-color: transparent;
              border-left-color: transparent;
              border-bottom-right-radius: 3px;
          }
          &::after {
              content: '';
              width: 5px;
              height: 12px;
              position: absolute;
              right: 6px;
              bottom: 6px;
              border: 2px solid #fff;
              border-top-color: transparent;
              border-left-color: transparent;
              transform: rotate(45deg);
              border-bottom-right-radius: 5px;
          }
        }
      }
    }
    .input_box {
      margin-top: 10px;
      padding-bottom: 30px;
      .input_container {
        display: flex;
        align-items: center;
        border: 1px solid #D2D2D2 !important;
        background-color: #fff;
        height: 38px;
        line-height: 38px;
        padding: 0px 19px;
        border-radius: 5px;
        color: #000;
        ::v-deep {
          .van-cell {
            height: 100%;
            line-height: 38px;
            margin-left: 20px;
            padding: 0;
            .van-cell__value {
              height: 100%;
            }
          }
        }
      }
    }
    .btn_box {
      margin-top: 10px;
      padding-inline: 10px;
      padding-bottom: 20px;
      button {
        width: 100%;
        font-weight: bold;
        font-size: 16px;
        color: #fff;
        border-radius: 20px;
        border: 0px;
        background-image: linear-gradient(180deg,#0081ff,#0081ff 3%,#0081ff);
        height: 38px;
        line-height: 38px;
      }
    }
  }
  .bottom_box {
    padding: 10px;
    position: relative;
    .title {
      color: #333;
        font-weight: bold;
        margin-bottom: 20px;
    }
    p {
      color: rgba(0, 0, 0, .85);
      line-height: 24px;
      margin-top: 10px;
    }
    &:before {
      content: "";
      width: calc(100% + 22px);
      height: 10px;
      background: rgb(241, 241, 241);
      position: absolute;
      top: 0;
      left: -10px;
    }
  }
}
</style>
