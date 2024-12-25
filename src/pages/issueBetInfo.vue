<script setup>
import axios from 'axios';
import Head from '../components/Head.vue';
const route = useRoute(),
      issueBet = reactive({
        apiIsSuccess:true,
        apiMsg:'',
        issueNo:'',
        token:'',
        list:[]
      }),
      // totalPeople = computed(() => {
      //   const newArr = issueBet.list.map(item => item.tgUserName)
      //   return new Set(newArr).size
      // }),
      totalAmount = computed(() => { 
        return Number(issueBet.list.reduce((total,item) => total + Number(item.betAmount),0).toFixed(4));
      });
onBeforeMount(() => {
  const routeParameter = route.fullPath;
  issueBet.token = routeParameter.substr(routeParameter.indexOf('token=')+6);
  issueBet.issueNo = route.query.issueNo;
  console.log(routeParameter, route.query)
})
onMounted(async () => {
  try{
    document.title = '发发拳 - 投注记录';
    // const res = await axios.post('/api/game/issueBetInfo',{
    //   token:issueBet.token
    //   // issueNo: issueBet.issueNo,
    //   // lotteryCode: lotteryCode.value,
    //   // tgGid: tgGid.value,
    // });
    const betArr = ['剪刀','拳头','布'],
          res = {
            data:{ success:true, data:[], msg:'Request failed with status code 502' }
          };
    if(res.data.success === true){
      for(var i=0, max=Math.round(Math.random()*60); i<max; i++) {
        res.data.data.push({tgUserName:'@'+Math.round(Math.random()*1000000)+'备份',betContent:betArr[Math.round(Math.random()*2)],betAmount:(Math.random()*100000000).toFixed(2)})
      }
      issueBet.list = res.data.data;
    }else{
      issueBet.apiIsSuccess = false;
      issueBet.apiMsg = res.data.msg
    }
  }catch(err){
    console.error(err.message)
  }
});
</script>

<template>
  <div class="wrap">
    <Head :token="issueBet.token"/>
    <div v-if="!issueBet.apiIsSuccess" class="error">
      <h3 class="error_title">{{ issueBet.apiMsg }}</h3>
    </div>
    <div v-if="issueBet.apiIsSuccess" class="game game-issue">
      <h2 class="game_issue">
        <img class="game_issue_deco" src="@/assets/img/issueDeco.png">
        局号{{ issueBet.issueNo }} 投注记录
        <img class="game_issue_deco" src="@/assets/img/issueDeco.png">
      </h2>
      <div class="game_wrap">
        <div class="game__bar">
          <p class="game___item-tgName">TG用户</p>
          <p class="game___item-betContent">投注</p>
          <p class="game___item-betAmount">投注数量</p>
        </div>
        <ul class="game__list game__list-bet">
          <!-- <li class="game__list_item" v-for="i in 20" :key="i">
            <p class="game___item-tgName">@09596546备份</p>
            <p class="game___item-betContent">
              <em class="game___item_tag-betContent">布</em>
              <img src="@/assets/img/cloth.png" class="game___item_img-betContent">
            </p>
            <p class="game___item-betAmount">20000</p>
          </li> -->
          <li
            v-for="(item,idx) in issueBet.list" :key="idx"
            class="game__list_item"
          >
            <p class="game___item-tgName">{{ item.tgUserName }}</p>
            <p class="game___item-betContent">
              <em class="game___item_tag-betContent">{{item.betContent}}</em>
              <img v-if="item.betContent === '剪刀'" src="@/assets/img/scissors.png" class="game___item_img-betContent">
              <img v-else-if="item.betContent === '拳头'" src="@/assets/img/stone.png" class="game___item_img-betContent">
              <img v-else-if="item.betContent === '布'" src="@/assets/img/cloth.png" class="game___item_img-betContent">
            </p>
            <p class="game___item-betAmount">{{ item.betAmount }}</p>
          </li>
          <li class="game__list_item game__list_item-bottom">
            <p class="game___item-total">总计{{ issueBet.list.length }}笔</p>
            <!-- <p class="game___item-total">总计{{ totalPeople }}人</p> -->
            <p class="game___item-betAmount">{{ totalAmount }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import"@/assets/scss/variablesExtendMixin.scss";
.game{
  &__list-bet{height: calc(100% - 42px);}
  &___item{
    &-tgName, &-total{padding-left: 5%;}
    &-tgName{
      @extend %textIndentDot;
      width: 32%;
      padding-right: 5px;
    }
    &-betContent{
      width: 35.4%;
      @extend %disFlexJustifyAlignCenter;
    }
    &-betAmount{
      text-align: right;
      width: 32.6%;
      padding-right: 5%;
    }
    &-total{width: 67.4%;}
    &_img-betContent{
      width: 26px;
      margin-left: 8px;
    }
    &_tag-betContent{
      font-style: normal;
      text-align: center;
      width: 32px;
    }
  }
}
@media screen and (min-width: 1024px) {
  .game___item{
    &-tgName, &-total{padding-left: 4.5%;}
    &-tgName{width: 28.9%;}
    &-betContent{width: 41.7%;}
    &-betAmount{
      width: 29.4%;
      padding-right: 4.5%;
    }
    &-total{width:70.6%;}
  }
}
</style>