<script setup>
import axios from 'axios'; 
import dayjs from 'dayjs';
let timer = null;
const route = useRoute(),
      inputVal = ref(null),
      lotteryCenter = reactive({
        issueNo:'',//20230425543
        lotteryCode:'',
        currentPage:1,//1464
        pageSize:25,
        totalPage:1,
        list:[],
        countdown:'',
        searchStatus:false,
        issueNoError:false,
        apiError:false,
        apiMsg:'',
      }),
      lotteryCenterMake = async () => {
        try{
          // const {data} = await axios.post('/api/game/issueInfo',{
          const res = await axios.post('/api/game/issueInfo',{
            issueNo:lotteryCenter.issueNo,
            lotteryCode:lotteryCenter.lotteryCode,
            page:lotteryCenter.currentPage,
            pageSize:lotteryCenter.pageSize
          });
          // console.log(res.data.data);
          if(res.data.success === true){
            if(res.data.data.data.length === 0) lotteryCenter.issueNoError = true
            lotteryCenter.list = res.data.data.data
            lotteryCenter.totalPage = res.data.data.totalPage
            if(res.data.data.data[1].result === null){
              // console.log('api再打一次，先站停計時器');
              setTimeout(() => {
                clearInterval(timer)
                timer = null
                lotteryCenterMake()
              },3000);
            }
          }else if(res.data.success === false){
            lotteryCenter.apiError = true
            lotteryCenter.apiMsg = res.data.msg
            console.error(res.data);
          }
        }catch(error){
          // lotteryCenter.apiError = true
          // lotteryCenter.apiMsg = error.message
          console.error(error)
        }
      },
      // 點擊頁碼時改變當前頁數
      changePage = (page) => {
        if (page >= 1 && page <= lotteryCenter.totalPage) {
          if(timer !== null){
            clearInterval(timer)
            timer = null
          }
          lotteryCenter.currentPage = page
          lotteryCenterMake()
        }
      },
      showCountdownSec = (diff) => {
        // const hours = (Math.floor(diffSec / (60 * 60))+'').padStart(2,'0');
        const minutes = (Math.floor((diff / 60) % 60)+'').padStart(2,'0'),
              seconds = (Math.floor(diff % 60)+'').padStart(2,'0');
        lotteryCenter.countdown = '00:'+minutes+':'+seconds
        // console.log(hours+':'+minutes+':'+seconds);
      },
      apiClassKeyHandle = (key) => {
        switch(key) {
          case '已开奖' :
            return 'result'
          case '待开奖' :
            return 'wait'
          case '已撤销' :
            return 'revoke'
        }
      },
      // apiResultKeyHandle = (key) => {
      //   switch(key) {
      //     case '拳头' :
      //       return key+'✊'
      //     case '剪刀' :
      //       return key+'✌️'
      //     case '布' :
      //       return key+'🖐️'
      //     case null :
      //       return ''
      //   }
      // },
      apiWaitNextKeyHandle = (lotteryTime, result) => {
        if(result !== null) return ''
        const targetTime = dayjs(lotteryTime),
              diff = targetTime.diff(dayjs(),'second');
        // console.log('剩:'+diff+'秒');
        if(diff > 0){
          showCountdownSec(diff)
          timer = setInterval(() => {
            const diffSec = targetTime.diff(dayjs(),'second')
            // console.log('看計時器秒數 : '+diffSec) 
            if(diffSec > 0){
              showCountdownSec(diffSec)
            }else{
              lotteryCenter.countdown = '00:00:00'
              clearInterval(timer)
              timer = null
              setTimeout(() => lotteryCenter.countdown = '',1000)
              setTimeout(() => lotteryCenterMake(),3000) // api reset
            }
          },1000);
        }
        // else if(diff === 0){console.log('diff = 0')}
        // else if(diff < 0){console.log('api 再打一次，timer：'+timer)}
        if(diff === 0) return ''
        if(diff > 0) return '距离下期 (' + lotteryTime.substr(lotteryTime.indexOf(' ') + 1, 5) + '开奖)'
      },
      searchArr = computed(() => {
        if(!lotteryCenter.list.length) return
        const arr = lotteryCenter.list.map(item => {
          return {
            class:apiClassKeyHandle(item.status),
            issueNo:item.issueNo+'期',
            // result:apiResultKeyHandle(item.result),
            result:item.result,
            status:item.status,
            waitNext:apiWaitNextKeyHandle(item.lotteryTime, item.result)
          }
        });
        // console.log(arr);
        return arr; 
      }),
      searchReset = () => {
        if(timer !== null){
          clearInterval(timer)
          timer = null
        }
        lotteryCenter.searchStatus = false
        lotteryCenter.issueNoError = false
        lotteryCenter.issueNo = ''
        inputVal.value.value = ''
        lotteryCenter.currentPage = 1
        lotteryCenterMake()
      },
      searchSubmit = () => {
        if(!inputVal.value.value) return
        if(timer !== null){
          clearInterval(timer)
          timer = null
        }
        lotteryCenter.issueNo = inputVal.value.value
        lotteryCenterMake()
        lotteryCenter.searchStatus = true
      };
onMounted(() => {
  document.title = '发发拳 - 开奖中心';
  lotteryCenter.lotteryCode = route.query.lotteryCode;
  console.log(route.query.lotteryCode);
  lotteryCenterMake();
});
</script>

<template>
  <div class="wrap">
    <div class="lotteryCenter">
      <img class="lotteryCenter_title" src="@/assets/img/fafaquanTitle.png">
      <div class="lotteryCenter_issueNum" v-show="lotteryCenter.searchStatus">
        <p class="lotteryCenter_issueNum_title">搜索：{{lotteryCenter.issueNo}}期</p>
        <a 
          href="javascript:;"
          class="lotteryCenter_issueNum_reset"
          @click="searchReset"
        >重置</a>
      </div>
      <div class="lotteryCenter_search" v-show="!lotteryCenter.searchStatus">
        <input 
          type="number" 
          class="lotteryCenter_search_input" 
          placeholder="请输入要搜索的局号" name="" id=""
          ref="inputVal"
          @keydown.enter="searchSubmit"
        >
        <a 
          href="javascript:;"
          class="lotteryCenter_search_submit" 
          @click="searchSubmit"
        >
          <img src="@/assets/img/searchIcon.png" class="lotteryCenter_search__img">
        </a>
      </div>
      <div :class="['lotteryCenter_wrap',{'lotteryCenter_wrap-search':lotteryCenter.searchStatus}]">
        <ul class="lotteryCenter__list">
          <li class="lotteryCenter__list_item lotteryCenter__list_item-wait">
            <img src="@/assets/img/fafaquanIcon.png" class="lotteryCenter__list__icon">
            <p class="lotteryCenter__list__issueNo">202304170093期</p>
            <p class="lotteryCenter__list__result"></p>
            <p class="lotteryCenter__list__wait">
              <span class="lotteryCenter__list__wait_time">00:06:50</span>
              <span class="lotteryCenter__list__wait_next">距离下期 (13:05开奖)</span>
            </p>
            <p class="lotteryCenter__list__status">待开奖</p>
          </li>
          <li class="lotteryCenter__list_item lotteryCenter__list_item-revoke">
            <img src="@/assets/img/fafaquanIcon.png" class="lotteryCenter__list__icon">
            <p class="lotteryCenter__list__issueNo">202304170093期</p>
            <p class="lotteryCenter__list__result"></p>
            <p class="lotteryCenter__list__status">已撤销</p>
          </li>
          <li class="lotteryCenter__list_item lotteryCenter__list_item-result">
            <img src="@/assets/img/fafaquanIcon.png" class="lotteryCenter__list__icon">
            <p class="lotteryCenter__list__issueNo">202304170093期</p>
            <p class="lotteryCenter__list__result">拳头✊</p>
            <p class="lotteryCenter__list__status">已开奖</p>
          </li>
          <!--  -->
          <li :class="['lotteryCenter__list_item lotteryCenter__list_item-'+item.class]" v-for="item in searchArr" :key="item.issueNo">
            <img src="@/assets/img/fafaquanIcon.png" class="lotteryCenter__list__icon">
            <p class="lotteryCenter__list__issueNo">{{item.issueNo}}</p>
            <p class="lotteryCenter__list__result">
              <em class="lotteryCenter__list__result_tag">{{item.result}}</em>
              <img v-if="item.result === '剪刀'" src="@/assets/img/scissors.png" class="lotteryCenter__list__result_img">
              <img v-else-if="item.result === '拳头'" src="@/assets/img/stone.png" class="lotteryCenter__list__result_img">
              <img v-else-if="item.result === '布'" src="@/assets/img/cloth.png" class="lotteryCenter__list__result_img">
            </p>
            <p class="lotteryCenter__list__wait" v-if="item.waitNext">
              <span class="lotteryCenter__list__wait_time">{{lotteryCenter.countdown}}</span>
              <span class="lotteryCenter__list__wait_next">{{item.waitNext}}</span>
            </p>
            <p class="lotteryCenter__list__status">{{item.status}}</p>
          </li>
          <li class="lotteryCenter__list_item" v-show="lotteryCenter.issueNoError">
            <p class="lotteryCenter__list__error">查无局号资料</p>
          </li>
          <li class="lotteryCenter__list_item" v-show="lotteryCenter.apiError">
            <p class="lotteryCenter__list__error">{{lotteryCenter.apiMsg}}</p>
          </li>
        </ul>
        <LotteryCenterPage v-show="!lotteryCenter.searchStatus" :currentPage="lotteryCenter.currentPage" :totalPage="lotteryCenter.totalPage" :changePage="changePage"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import"@/assets/scss/variablesExtendMixin.scss";
@keyframes inputFocusShadow{
 0%, 27%{box-shadow: 0 0 0 2px #2F94F9;}
 75%, 100%{box-shadow: 0 0 0 0 #2F94F9;}
}
.lotteryCenter{
  display: flex;
  flex-direction:column;
  height: 100%;
  padding:0 8px 12px;
  &_title{
    width: 151px;
    display: block;
    margin:0 auto;
  }
  &_issueNum{
    line-height: 30px;
    display: flex;
    justify-content:space-between;
    padding: 20px 8px 16px;
    &_title{
      font-size: 14px;
      margin:0;
    }
    &_reset{
      color:#fff;
      font-size: 14px;
      text-align: center;
      text-decoration:none;
      letter-spacing: 1px;
      width: 60px;
      border-radius: 30px;
      background-color:#1D7FE8;
      transition:box-shadow .4s;
      &:hover{box-shadow: 0 0 0 2px rgba(#1D7FE8,.4);}
    }
  }
  &_search{
    height: 42px;
    flex-shrink: 0;
    margin: 8px 42px 14px;
    position: relative;
    &_input{
      font-size: 14px;
      width: 100%;
      height: 100%;
      border:none;
      border-radius: 50px;
      padding: 11px 18px;
      transition:box-shadow 1s;
      &:focus{box-shadow: 0 0 0 2px #2F94F9;}
      @include input_placeholder_text_style{
        color:#b4bbca;
        font-family:"Microsoft YaHei", "Microsoft JhengHei", "PingFangTC", Arial, Helvetica, sans-serif;
      }
    }
    &_submit{
      height: 100%;
      background-color:#fff;
      border: none;
      border-radius: 0 50px 50px 0;
      cursor:pointer;
      padding: 11px;
      position:absolute;
      top:0;
      right:0;
      &:hover > .lotteryCenter_search__img{transform:scale3d(1.1,1.1,1);}
    }
    &__img{
      width: 20px;
      transition:transform .4s;
    }
  }
  &_wrap{
    background-color:#fff;
    flex:1 1 auto;
    overflow: hidden;
    padding-bottom: 60px;
    position: relative;
    &-search{
      flex-grow: 0;
      padding-bottom: 0;
      > .lotteryCenter__list{height:auto;}
    }
  }
  &__list{
    height: 100%;
    overflow: auto;
    @include dom_scrollbar(#fff, rgba(#000,.25));
    &_item{
      display: flex;
      align-items: flex-start;
      padding: 12px 12px 12px 8px;
      position: relative;
      &:nth-of-type(even){background-color:#FCF7EA;}
      &-revoke{color: #999;}
      &-wait{color: #333;}
      &-result{color: #4A934F;}//#2F94F9
    }
    &__issueNo, &__result, &__status, &__error{margin:0;}
    &__status, &__wait_time, &__error{font-weight: bold;}
    &__issueNo, &__wait_next{font-size: 12px;}
    &__result, &__error{line-height: 45px;}
    &__wait, &__error{text-align: center;}
    &__wait_time, &__error{font-size: 20px;}
    &__error{
      color: #999;
      width: 100%;
    }
    &__wait{
      color:#606060;
      margin:0 auto;
      &_time, &_next{display: block;}
    }
    &__icon{width: 47px;}
    &__issueNo{
      position:absolute;
      right: 12px;
      bottom: 14px;
    }
    &__result{
      color: #051E50;
      display: flex;
      align-items:center;
      padding: 0 7px;
      &:empty{padding:0;}
      &_img{
        width: 26px;
        margin-left: 6px;
      }
      &_tag{
        font-style: normal;
        text-align: center;
        width: 32px;
      }
    }
    &__status{
      font-size: 15px;
      line-height: 27px;
      margin-left: auto;
    }
  }
}
// 手機版拿橫的時候 Landscape
@media screen and (min-width: 640px) and (max-width: 950px) and (orientation:landscape){
  .lotteryCenter{
    &_title{width: 70px;}
    &_wrap{
      padding-bottom: 54px;
      &-search{padding-bottom: 0;}
    }
  }
}
// ===== 平板版型區 =====
@media screen and (min-width: 1024px) {
  .lotteryCenter{
    &_search{
      width: 630px;
      margin-right: auto;
      margin-left: auto;
    }
    &__list{
      &_item{
        align-items:center;
        padding: 12px 32px 12px 30px;
      }
      &__issueNo, &__result{text-shadow: 0 0 1px rgba(#000,.35);}
      &__issueNo{
        color: #051E50;
        font-size: 14px;
        padding: 0 23px 0 26px;
        position: initial;
      }
      &__wait_time, &__error{font-size: 30px;}
      &__wait{
        display: flex;
        flex-direction:row-reverse;
        align-items:center;
        &_next{
          font-size: 14px;
          margin-right: 15px;
        }
      }
      &__status{font-size: 18px;}
    }
  }
}
@media screen and (min-width: 1200px) {
  .lotteryCenter{
    max-width: 1200px;
    padding: 0;
    margin:30px auto 140px;
    &_title{width: 217px;}
    &_issueNum{
      justify-content:flex-start;
      &_title{
        font-size: 18px;
        text-shadow: 0 0 1px rgba(#000,.6);
        margin-right: 22px;
      }
    }
    &_search{
      height: 60px;
      margin-top: 20px;
      margin-bottom: 40px;
      &_input{
        font-size: 18px;
        box-shadow: 0 0 2px rgba(#000,.2);
      }
      &_submit{padding: 17px;}
      &__img{width: 26px;}
    }
    &_wrap{
      border: 1px solid #E9D1A1;
      border-radius: 8px;
      box-shadow: 0 0 2px #E9D1A1;
      padding:12px 42px 130px;
      &-search{
        padding-top: 21px;
        padding-bottom: 21px;
      }
    }
    &__list{height:1725px;}//828px
  }
}
</style>