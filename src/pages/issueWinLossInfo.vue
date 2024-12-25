<script setup>
import axios from 'axios';
import Head from '../components/Head.vue';
const route = useRoute(),
      issueWinLoss = reactive({
        apiIsSuccess:true,
        apiMsg:'',
        bookmaker:'',
        issueNo:'',
        token:'',
        list:[]
      }),
      // totalPeople = computed(() => {
      //   const newArr = issueWinLoss.list.map(item => item.tgUserName)
      //   return new Set(newArr).size
      // }), 
      totalAmount = computed(() => {
        return Number(issueWinLoss.list.reduce((total, item) => total + Number(item.betAmount),0).toFixed(4));
      }),
      totalRevenue = computed(() => { 
        return Number(issueWinLoss.list.reduce((total, item) => total + Number(item.winLoss),0).toFixed(4));
      }),
      totalFee = computed(() => {
        return Number(issueWinLoss.list.reduce((total, item) => total + Number(item.fee),0).toFixed(4));
      });
onBeforeMount(() => {
  const routeParameter = route.fullPath;
  issueWinLoss.token = routeParameter.substr(routeParameter.indexOf('token=')+6);
  issueWinLoss.issueNo = route.query.issueNo;
})
onMounted(async () => {
  try{
    document.title = '发发拳 - 开奖结果';
    // const res = await axios.post('/api/game/issueWinLossInfo',{token:issueWinLoss.token})
    const betArr = ['剪刀','拳头','布'],
          res = {
            data:{ 
              success:true, 
              data:{
                records:[
                  {tgUserName:'失**菜菜1',betContent:'剪刀',betAmount:'20000.00',result:'拳头',winLoss:2932,fee:null},
                  {tgUserName:'失**菜菜2',betContent:'拳头',betAmount:'20000.00',result:'拳头',winLoss:0,fee:1.23},
                  {tgUserName:'失**菜菜3',betContent:'布',betAmount:'20000.00',result:'拳头',winLoss:-2939,fee:null},
                ],
                dealerMsg:'🌹🌹katy❤️🤢🦞'
              }, 
              msg:'Request failed with status code 502'
            }
          };
    console.log(res.data);
    if(res.data.success === true){
      issueWinLoss.list = res.data.data.records
      issueWinLoss.bookmaker = res.data.data.dealerMsg
      // console.log(res.data.data);
    }else if(data.success === false){
      issueWinLoss.apiIsSuccess = false;
      issueWinLoss.apiMsg = res.data.msg
    }
  }catch(err){console.error(err)}
});
// function roundToFourDecimalPlaces(num) {
//   return +(Math.round(num + "e+4")  + "e-4");
//   return +(Math.round(num + "e+"+num)  + "e-"+num);
// }
</script>

<template>
  <div class="wrap">
    <Head :token="issueWinLoss.token"/>
    <div v-if="!issueWinLoss.apiIsSuccess" class="error">
      <h3 class="error_title">{{ issueWinLoss.apiMsg }}</h3>
    </div>
    <div v-if="issueWinLoss.apiIsSuccess" class="game game-issue">
      <h2 class="game_issue">
        <img class="game_issue_deco" src="@/assets/img/issueDeco.png">
        局号{{ issueWinLoss.issueNo }} 开奖结果
        <img class="game_issue_deco" src="@/assets/img/issueDeco.png">
      </h2>
      <div class="game_wrap">
        <p class="game__bookmaker">{{ issueWinLoss.bookmaker }}</p>
        <div class="game__bar">
          <p class="game___item-name">TG用户</p>
          <p class="game___item-content">投注</p>
          <p class="game___item-amount">投注数量</p>
          <p class="game___item-bookmaker">庄家</p>
          <p class="game___item-winLoss">盈亏</p>
          <p class="game___item-service">服务费</p>
        </div>
        <ul class="game__list game__list-winLoss">
          <!-- <li class="game__list_item" v-for="i in 2" :key="'winLoss'+i">
            <p class="game___item-name">失**菜菜</p>
            <p class="game___item-content">
              <em class="game___item_tag">拳头</em>
              <img src="@/assets/img/stone.png" class="game___item_img">
            </p>
            <p class="game___item-amount">20000.00</p>
            <p class="game___item-bookmaker">
              <em class="game___item_tag">剪刀</em>
              <img src="@/assets/img/scissors.png" class="game___item_img">
            </p>
            <p class="game___item-winLoss game___item-wlNegative">2938.00</p>
            <p class="game___item-service">0</p>
          </li> -->
          <li v-for="(item,idx) in issueWinLoss.list" :key="idx" class="game__list_item">
            <p class="game___item-name">{{ item.tgUserName }}</p>
            <p class="game___item-content">
              <em class="game___item_tag">{{ item.betContent }}</em>
              <img v-if="item.betContent === '剪刀'" src="@/assets/img/scissors.png" class="game___item_img">
              <img v-else-if="item.betContent === '拳头'" src="@/assets/img/stone.png" class="game___item_img">
              <img v-else-if="item.betContent === '布'" src="@/assets/img/cloth.png" class="game___item_img">
            </p>
            <p class="game___item-amount">{{ item.betAmount }}</p>
            <p class="game___item-bookmaker">
              <em class="game___item_tag">{{ item.result }}</em>
              <img v-if="item.result === '剪刀'" src="@/assets/img/scissors.png" class="game___item_img">
              <img v-else-if="item.result === '拳头'" src="@/assets/img/stone.png" class="game___item_img">
              <img v-else-if="item.result === '布'" src="@/assets/img/cloth.png" class="game___item_img">
            </p>
            <p :class="['game___item-winLoss',item.winLoss < 0 ? 'game___item-wlNegative' : item.winLoss/1 === 0 ? 'game___item-wlZero' : 'game___item-wlPositive']">{{ item.winLoss }}</p>
            <p class="game___item-service">{{ item.fee === null ? 0 : item.fee }}</p>
          </li>
          <li class="game__list_item game__list_item-bottom">
            <p class="game___item-wlTotal">总计{{ issueWinLoss.list.length }}笔</p>
            <!-- <p class="game___item-wlTotal">总计 {{ totalPeople }} 人</p> -->
            <p class="game___item-amount">{{ totalAmount }}</p>
            <p class="game___item-bookmaker"></p>
            <p :class="['game___item-winLoss',{'game___item-wlPositive':totalRevenue > 0}]">{{ totalRevenue }}</p>
            <p class="game___item-service">{{ totalFee }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import"@/assets/scss/variablesExtendMixin.scss";
.game{
  &__bookmaker{
    color: #54341D;
    font-weight: bold;
    text-align: center;
    text-shadow: 0 0 1px rgba(#54341D,.5);
    line-height: 36px;
    background-color:#fff;
    margin:0;
  }
  &__list-winLoss{height:calc(100% - 78px);}
  &___item{
    // &-content, 
    &-amount, &-bookmaker, &-winLoss{text-align:center;}
    &-name, &-wlTotal{padding-left: 2%;}
    &-name{
      @extend %textIndentDot;
      width: 25.05%;//width:75/399*100%; 100/399*100%
    }
    &-content, &-bookmaker{
      width: 13.55%;//width: 62/399*100%; 54/399*100%
      @extend %disFlexJustifyAlignCenter;
    }
    // &-bookmaker{width: 13.55%;}//width:54/399*100%; 59/399*100%
    &_tag{
      display: none;
      // font-style: normal;
      // width: 32px;
    }
    &_img{width: 26px;}
    &-amount{width: 17.55%;}//width:84/399*100%; 70/399*100%
    &-winLoss{width: 15.55%;}//width:57.5/399*100%; 62/399*100%
    &-wlZero{
      color: #444;
      text-shadow: 0 0 1px rgba(#444,.5);
    }
    &-wlNegative{
      color: #C15D26;
      text-shadow: 0 0 1px rgba(#C15D26,.5);
    }
    &-wlPositive{
      color: #4A934F;
      text-shadow: 0 0 1px rgba(#4A934F,.5);
      &:before{content:"+";}
    }
    &-service{
      text-align: right;
      width: 14.75%;// width:61.5/399*100%; 59/399*100%
      padding-right: 2%;
    }
    &-wlTotal{width: 38.6%;}
  }
}
@media screen and (min-width: 1024px) {
  .game{
    &__bookmaker{
      font-size: 20px;
      line-height: 50px;
      text-shadow: none;
      background-color:#FCF7EA;
      border-radius: 8px;
      margin-bottom: 14px;
    }
    &__list-winLoss{height:calc(100% - 106px);}
    &___item{
      &-name, &-wlTotal{padding-left: 4.5%;}
      &-name{width:21.75%;}//243_212/1120*100%; 21.7352415027%
      &-content, &-bookmaker{width:15.65%;}//175_241/1120*100%; 15.6529516995%
      &_tag{
        font-style: normal;
        text-align:center;
        width: 32px;
        display: block;
      }
      &_img{margin-left: 6px;}
      &-amount{width:16.55%;}//185_269/1120*100%; 16.5474060823%
      &-winLoss{width:16.1%;}//180_218/1120*100%; 16.1001788909%
      &-wlNegative, &-wlPositive{text-shadow:none;}
      &-service{
        width:14.3%; //160_180/1120*100%; 14.3112701252%
        padding-right: 4.5%;
        // padding-right: 50/1118*100%;//4.4642857143% 4.4722719141%
      }
      &-wlTotal{width: 37.4%;}
    }
  }
}
@media screen and (min-width: 1200px){
  .game__bookmaker{margin-top: 10px;}
}
</style>