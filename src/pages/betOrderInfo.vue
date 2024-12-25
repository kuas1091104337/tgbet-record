<script setup>
import axios from 'axios';
import dayjs from 'dayjs';
import { debounce } from '@/lib/debounce.js'
import Head from '../components/Head.vue';

const route = useRoute(),
      startTime = ' 00:00:00',
      endTime = ' 23:59:59',
      today = dayjs(),
      todayFormat = today.format('YYYY-MM-DD'),
      weekStartDate = today.startOf('week').add(1,'day').format('YYYY-MM-DD'),//週一開始本週
      // weekStartDate = today.startOf('week').format('YYYY-MM-DD'),//週日開始本週
      monthStartDate = today.subtract(30,'day').format('YYYY-MM-DD'),
      game = ref(null),
      betOrder = reactive({
        apiIsSuccess:true,
        searchStatus:false,
        apiMsg:'',
        tgName:'',
        list:[],
        pageSize:500, // 手機版pageSize預設500
        currentPage:1,
        totalPage:1,
        totalCount:0,
        totalBetAmount:0,
        totalWinLoss:0,
        gameWidth:0,
        token:'',
        searchRange:'month', //today week month 
        startDate:monthStartDate,
        endDate:todayFormat,
      }),
      // totalBetAmount = computed(() => {
      //   let total = 0;
      //   betOrder.list.forEach(item => total += item.betAmount);
      //   return total;
      // }),
      // totalWinLoss = computed(() => {
      //   let total = 0;
      //   betOrder.list.forEach(item => total += item.winLoss);
      //   return total;
      // }),
      // 計算需要顯示的頁碼數
      displayPages = computed(() => {
        const otherPage = 8,
              maxPage = 1 + otherPage,
              minPage = betOrder.totalPage - otherPage,
              startPage = Math.max(
                1, betOrder.currentPage - otherPage/2 > minPage ? minPage : betOrder.currentPage - otherPage/2
              ),
              endPage = Math.min(
                betOrder.totalPage,
                betOrder.currentPage + otherPage/2 < maxPage ? maxPage : betOrder.currentPage + otherPage/2
              ),
              pages = [];
        for(let i = startPage; i <= endPage; i++){pages.push(i)}
        return pages;
      }),
      // 點擊頁碼時改變當前頁數
      changePage = (page) => {
        if (page >= 1 && page <= betOrder.totalPage) {
          betOrder.currentPage = page;
          betOrderMake();
        }
      },
      disabledDate = (time) => dayjs(time).format('YYYY-MM-DD') < dayjs(betOrder.startDate).format('YYYY-MM-DD'),
      // return time.getTime() < dayjs(betOrder.startDate).subtract(1,'day').valueOf() ||  time.getTime() < Date.parse(betOrder.startDate)
      setDateFn = () => {
        if(betOrder.endDate === todayFormat && betOrder.startDate === todayFormat){
          betOrder.searchRange = 'today';
        }else if(betOrder.endDate === todayFormat && betOrder.startDate === weekStartDate){
          betOrder.searchRange = 'week';
        }else if(betOrder.endDate === todayFormat && betOrder.startDate === monthStartDate){
          betOrder.searchRange = 'month';
        }else{betOrder.searchRange = ''}
        betOrderMake();
        betOrderTotal();
        // nextTick(() => {})
      },
      setSearchRangeFn = (range) => {
        betOrder.endDate = todayFormat;
        switch(range) {
          case 'today' :
            betOrder.startDate = todayFormat;
            betOrder.searchRange = 'today';
            break;
          case 'week' :
            betOrder.startDate = weekStartDate;
            betOrder.searchRange = 'week';
            break;
          case 'month' :
            betOrder.startDate = monthStartDate;
            betOrder.searchRange = 'month';
            break;
        }
        betOrderMake();
        betOrderTotal();
      },
      gameResize = () => betOrder.gameWidth = game.value.offsetWidth, // console.log(betOrder.gameWidth);
      betOrderTotal = async () => {
        try{
          // const {data} = await axios.post('/api/game/betOrderInfoTotal',{
          const res = await axios.post('/api/game/betOrderInfoTotal',{
            startTime:betOrder.startDate + startTime,
            endTime:betOrder.endDate + endTime,
            token:betOrder.token,
          });
          // console.log(data)
          if(res.data.success === true){
            betOrder.totalBetAmount = res.data.data.totalBetAmount;
            betOrder.totalWinLoss = res.data.data.totalWinLoss;
          }else if(res.data.success === false){console.error(res.data.msg)}
        }catch(error){console.error(error)}
      },
      betOrderMake = async () => {
        try{
          // const {data} = await axios.get('/api/game/getBetOrderToken',{ params:{userId:11} });
          const res = {
            data:{
              "msg":"success", "code":0, "success":true,
              "data":{
                "currentPage":1, "pageSize":500, "totalPage":1, "totalCount":4,
                "data":[
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  // {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  // {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  // {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  // {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  // {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  // {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  // {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIzDUvst1gpXAT","betTime":"2023-05-22 16:35:30","betContent":"拳头","coinName":"USDT","betAmount":8,"winLoss":-8},
                  // {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nIqUunJv1gpXAT","betTime":"2023-05-22 16:35:21","betContent":"布","coinName":"USDT","betAmount":5,"winLoss":-2},
                  // {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                  // {"tgName":"FlorenceCheng","tgAccount":"@florencecheng12","orderNo":"dcqc20230522nzVH3QgF1gpXAT","betTime":"2023-05-22 16:30:38","betContent":"剪刀","coinName":"USDT","betAmount":1E+1,"winLoss":-1E+1},
                ],
              },
            }
          }
          // const {data} = await axios.post('/api/game/betOrderInfo',{
          // const res = await axios.post('/api/game/betOrderInfo',{
          //   page:betOrder.currentPage,
          //   pageSize:betOrder.pageSize,
          //   startTime:betOrder.startDate + startTime,
          //   endTime:betOrder.endDate + endTime,
          //   token: betOrder.token
          // });
          console.log(res.data.data)
          if(res.data.success === true){
            betOrder.list = res.data.data.data;
            betOrder.totalPage = res.data.data.totalPage;
            betOrder.currentPage = res.data.data.currentPage;
            betOrder.totalCount = res.data.data.totalCount; //每頁幾筆資料
          }else if(data.success === false){
            betOrder.apiIsSuccess = false;
            betOrder.apiMsg = res.data.msg
          }
        }catch(err){console.error(err)}
      };
watch(() => betOrder.totalCount,(newCount) => {
  if(betOrder.gameWidth >= 1024) betOrder.pageSize = 30;//30
  if(betOrder.gameWidth < 1024 && newCount > betOrder.pageSize) betOrder.pageSize = newCount;
});
watch(() => betOrder.pageSize,(newSize) => {
  // console.log(newSize)
  betOrderMake();
});
onBeforeMount(() => {
  // betOrder.token = route.query.token; // vue-router會自動將路由地址中的'+'號變成空格
  const routeParameter = route.fullPath;
  betOrder.token = routeParameter.substr(routeParameter.indexOf('token=')+6);
  betOrder.tgName = route.query.tgName;
  console.log(betOrder.tgName, betOrder.token);
})
onMounted(() => {
  // console.log(todayFormat, weekStartDate, monthStartDate);
  document.title = '发发拳 - 个人投注记录';
  gameResize();
  betOrderMake();
  betOrderTotal();
  window.addEventListener('resize',debounce(gameResize,400)); // window.addEventListener('resize',gameResize);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize',debounce);
});
</script>

<template>
  <div class="wrap">
    <Head :token="betOrder.token" :tgName="betOrder.tgName"/>
    <div v-if="!betOrder.apiIsSuccess" class="error">
      <h3 class="error_title">{{ betOrder.apiMsg }}</h3>
    </div>
    <div v-if="betOrder.apiIsSuccess" class="game game-bet" ref="game">
      <nav class="game_head">
        <ul class="game_head_right">
          <li 
            :class="['game_head__btn',{'game_head__btn-active':betOrder.searchRange === 'today'}]"
            @click="setSearchRangeFn('today')"
          >今天</li>
          <li 
            :class="['game_head__btn',{'game_head__btn-active':betOrder.searchRange === 'week'}]"
            @click="setSearchRangeFn('week')"
          >本周</li>
          <li
            :class="['game_head__btn',{'game_head__btn-active':betOrder.searchRange === 'month'}]"
            @click="setSearchRangeFn('month')"
          >近30天</li>
        </ul>
        <div class="game_head_left">
          <p class="game_head__title">起始日期：</p>
          <div class="game_head__box">
            <el-date-picker
              v-model="betOrder.startDate"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="选择日期"
              size="large"
              :clearable="false"
              @change="setDateFn"
            />
          </div>
          <span class="game_head__text"/>
          <div class="game_head__box">
            <el-date-picker
              v-model="betOrder.endDate"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="选择日期"
              size="large"
              :clearable="false"
              @change="setDateFn"
              :disabled-date="disabledDate"
            />
          </div>
        </div>
      </nav>
      <div class="game__bar game_bar">
        <p class="game_bar_tgName">TG用户</p>
        <p class="game_bar_orderNo">交易流水号</p>
        <p class="game_bar_betTime">投注时间</p>
        <p class="game_bar_betContent">投注</p>
        <p class="game_bar_coinName">币种</p>
        <p class="game_bar_betAmount">投注数量</p>
        <p class="game_bar_winLoss">盈亏</p>
      </div>
      <ul class="game_list">
        <li class="game_list_item">
          <p class="game__item_tgName">DavidYang</p>
          <p class="game__item_betContent">
            <span class="game__item_betContent_mark"> <em class="game__item_betContent__tag">布</em> <img src="/src/assets/img/cloth.png" class="game__item_betContent__img"> </span>
          </p>
          <p class="game__item_coinName">USDT</p>
          <p class="game__item_betAmount">12</p>
          <p class="game__item_winLoss"> <span class="game__item_winLoss_mark game__item_winLoss_mark-negative">-12.00</span> </p>
          <p class="game__item_orderNo">dcqc20230530hUbIMSohl</p>
          <p class="game__item_betTime">2023-05-30 14:31:00</p>
        </li><!--  -->
        <li class="game_list_item" v-show="!betOrder.list.length && betOrder.gameWidth >= 1024">
          <p class="game__item_tgName">- -</p>
          <p class="game__item_betContent">- -</p>
          <p class="game__item_coinName">- -</p>
          <p class="game__item_betAmount">- -</p>
          <p class="game__item_winLoss">- -</p>
          <p class="game__item_orderNo">- -</p>
          <p class="game__item_betTime">- -</p>
        </li>
        <li class="game_list_nothing" v-show="!betOrder.list.length">
          <img class="game__item_nothingImg" src="@/assets/img/empty.png" alt="暂无记录">
        </li>
        <li class="game_list_item" v-for="(item, idx) in betOrder.list" :key="idx">
          <p class="game__item_tgName">{{ item.tgName }}</p>
          <p class="game__item_betContent">
            <span class="game__item_betContent_mark">
              <em class="game__item_betContent__tag">{{item.betContent}}</em>
              <img v-if="item.betContent === '剪刀'" src="@/assets/img/scissors.png" class="game__item_betContent__img">
              <img v-else-if="item.betContent === '拳头'" src="@/assets/img/stone.png" class="game__item_betContent__img">
              <img v-else-if="item.betContent === '布'" src="@/assets/img/cloth.png" class="game__item_betContent__img">
            </span>
          </p>
          <!-- <p class="game__item_tgAccount">{{ item.tgAccount }}</p> --> 
          <p class="game__item_coinName">{{ item.coinName }}</p>
          <p class="game__item_betAmount">{{ item.betAmount }}</p>
          <p class="game__item_winLoss">
            <span :class="[
              'game__item_winLoss_mark',
              item.winLoss > 0 ? 'game__item_winLoss_mark-positive' : item.winLoss/1 === 0 ? 'game__item_winLoss_mark-zero' : 'game__item_winLoss_mark-negative'
            ]">
              {{ item.winLoss.toFixed(2) }}
            </span>
          </p>
          <p class="game__item_orderNo">{{ item.orderNo }}</p>
          <p class="game__item_betTime">{{ item.betTime }}</p>
        </li>
        <li class="game_list_item game_list_item-bottom">
          <p class="game__item_total">总计：</p>
          <p class="game__item_betAmount">{{ betOrder.totalBetAmount }}</p><!-- totalBetAmount -->
          <p class="game__item_winLoss">{{ betOrder.totalWinLoss }}</p><!-- totalWinLoss.toFixed(2) -->
        </li>
      </ul>
      <footer class="game__foot">
        <select
          v-show="betOrder.list.length"
          class="game__foot_select"
          v-model="betOrder.pageSize"
        >
          <option value="30">30条</option>
          <option value="50">50条</option>
          <option value="100">100条</option>
          <option value="200">200条</option>
        </select>
        <ul class="game__foot_page">
          <!-- <li 
            v-if="betOrder.currentPage > 10"
            class="game__foot__btn"
            @click="changePage(betOrder.currentPage - 10)"
          >上10页</li> -->
          <li 
            v-if="betOrder.currentPage > 1"
            class="game__foot__btn"
            @click="changePage(betOrderdata - 1)"
          >上一页</li>
          <li
            v-show="betOrder.totalPage !== 1"
            v-for="page in displayPages"
            :key="page"
            :class="['game__foot__btn',{'game__foot__btn-actice':page === betOrder.currentPage}]"
            @click="changePage(page)"
          >{{ page }}</li> 
          <li 
            v-if="betOrder.currentPage < betOrder.totalPage"
            class="game__foot__btn"
            @click="changePage(betOrder.currentPage + 1)"
          >下一页</li>
          <!-- <li 
            v-if="betOrder.currentPage <= betOrder.totalPage - 10"
            class="game__foot__btn"
            @click="changePage(betOrder.currentPage + 10)"
          >下10页</li> -->
        </ul>
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
@import"@/assets/scss/variablesExtendMixin.scss";
.game{
  &-bet{
    height: auto;
    background-color: #F0F0F0;
    padding: 20px 14px;
  }
  &_head{
    &_right, &_left{display: flex;}
    &_left{
      align-items:center;
      justify-content:space-between;
      padding:15px 0;
    }
    &__btn{
      color: #5C5C5C;
      font-size: 14px;
      line-height: 28px;
      text-align: center;
      text-shadow: 0 0 1px rgba(#5C5C5C, .5);
      flex:1 1 0;
      background-color:#fff;
      border: 1px solid #E8E8E8;
      border-radius: 5px;
      cursor: pointer;
      transition: .4s;
      &:nth-of-type(2){margin: 0 14px;}
      &-active{
        color:#fff;
        text-shadow: 0 0 1px rgba(#fff, .5);
        background-color:#F6A412;
        border: 1px solid #F6A412;
      }
      &-active{cursor: not-allowed;}
      // pointer-events:none;
    }
    &__title{
      color: #54341D;
      font-size: 14px;
      text-shadow: 0 0 1px rgba(#54341D,.5);
      flex-shrink: 0;
      margin: 0 10px 0 0;
    }
    &__box{
      flex: 0 1 140px;
      position: relative;
    }
    &___input{
      color: #576A85;
      font-size: 14px;
      width: 100%;
      height: 40px;
      border: 1px solid #DDD9DC;
      border-radius: 6px;
      padding: 0 size_pxToVw(22,414)  0 size_pxToVw(10,414);
    }
    &__text{
      flex: 0 1 8px;
      height: 1px;
      background-color:#5C5C5C;
      margin: 0 8px;
    }
  }
  &_bar{display: none;}
  &_list_item{
    color: #54341D;
    text-shadow: 0 0 1px rgba(#54341D,.5);
    display: flex;
    flex-wrap:wrap;
    border-radius: 10px;
    overflow: hidden;
    &-bottom{display: none;}
    + .game_list_item{margin-top: 14px;}
    > p{margin: 0;}
  }
  &__item{
    &_nothingImg{
      width: 155px;
      display: block;
      margin:115px auto 0;
    }
    &_tgName, &_betContent, &_coinName, &_betAmount, &_winLoss{
      line-height: 32px;
      background-color:#FCF7EA;
    }
    &_tgName, &_betContent, &_coinName, &_betAmount, &_winLoss{font-size: 16px;}
    &_tgName, &_betAmount{width: 60%;}
    &_betContent, &_winLoss{width: 40%;}
    &_tgName{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 5px 0 0 12px;
      &:before{content: "TG姓名 : ";}
    }
    &_betContent{
      padding: 5px 12px 0;
      &_mark{
        color:#051E50;
        text-shadow: 0 0 1px rgba(#051E50,.5);
        text-align: center;
        width: 84px;
        @extend %disFlexJustifyAlignCenter;
        background-color: #fff;
        border-radius: 15px;
        margin-left:auto;
      }
      &__tag{
        font-style: normal;
        width: 32px;
      }
      &__img{
        width: 24px;
        margin-left: 2px;
      }
    }
    // &_tgAccount{
    //   padding: 0 0 0 12px;
    //   &:before{content: "TG用户名 : ";}
    // }
    &_coinName{
      width: 100%;
      padding: 0 12px;
      &:before{content: "币种 : ";}
    }
    &_betAmount{
      padding: 0 0 5px 12px;
      &:before{content: "投注数量 : ";}
    }
    &_winLoss{
      text-align: right;
      padding: 0 12px 5px;
      &:before{content: "盈亏 : ";}
      &_mark{
        &-zero{
          color: #444;
          text-shadow: 0 0 1px rgba(#444,.5);
        }
        &-positive{
          color: #4A934F;
          text-shadow: 0 0 1px rgba(#4A934F,.5);
          &:before{content:"+";}
        }
        &-negative{
          color: #C15D26;
          text-shadow: 0 0 1px rgba(#C15D26,.5);
        }
      }
    }
    &_orderNo, &_betTime{
      color: #5C5C5C;
      font-size: 14px;
      line-height: 20px;
      text-shadow: 0 0 1px rgba(#5C5C5C,.5);
      width: 100%;
      background-color:#fff;
    }
    &_orderNo{
      padding: 10px 12px 5px;
      &:before{content:"交易流水号 : ";}
    }
    &_betTime{
      padding: 5px 10px 10px 10px;
      &:before{content:"投注时间 : ";}
    }
  }
  &__foot{display: none;}
}
@media screen and (min-width: 1024px) {
  .game{
    &-bet{
      height: calc(100% - 48px);
      background-color: #fff;
      border-radius: 8px;
      padding: 35px 40px;
    }
    &_head{
      display: flex;
      flex-direction: row-reverse;
      justify-content:space-between;
      align-items:flex-end;
      padding-bottom: 17px;
      &_left{
        width: 450px;
        justify-content:flex-start;
        padding: 0;
      }
      &_right{width: 190px;}
      &__title{
        font-size: 16px;
        margin-right: 6px;
      }
      &__box{flex-basis: 125px;}
      &__btn{
        flex:0 0 auto;
        padding: 0 10px;
        &:nth-of-type(2){margin: 0 12px;}
      }
    }
    &_bar{
      display: flex;
      &_winLoss{text-align: right;}
      &_orderNo, &_betTime, &_betContent, &_coinName, &_betAmount{text-align:center;}
    }
    &_list{
      height: calc(100% - 167px);
      display: flex;
      flex-direction:column;
      overflow-y: scroll;
      @include dom_scrollbar;
      &_item{
        flex-shrink: 0;
        border-radius: 0;
        &-bottom{
          color: #C15D26;
          text-shadow: 0 0 1px rgba(#C15D26,.5);
          display: flex;
        }
        &:nth-of-type(even){background-color:#FCF7EA;}
        + .game_list_item{
          margin-top: 0;
          &-bottom{margin-top: auto;}
        }
      }
      &_nothing{margin:auto 0;}
    }
    &__item{
      &_tgName, &_betContent, &_coinName, &_betAmount, &_winLoss, &_orderNo, &_betTime{// , &_tgAccount
        line-height: 50px;
        background-color:transparent;
      }
      &_tgName, &_coinName, &_betAmount, &_winLoss, &_orderNo, &_betTime{
        &:before{content: "";}
      }
      &_betContent, &_coinName, &_betAmount, &_orderNo, &_betTime{
        text-align: center;
        padding: 0;
      }
      &_betContent, &_coinName, &_betAmount, &_winLoss{order: 2;}
      &_betAmount, &_winLoss{font-weight: bold;}
      &_orderNo, &_betTime{
        color: #6E6E6E;
        order: 1;
      }
      &_betContent{
        &_mark{
          color: #54341D;
          text-shadow: 0 0 1px rgba(#54341D,.5);
          width: 100%;
          background-color:transparent;
        }
        &__img{
          width: 26px;
          margin-left: 6px;
        }
      }
      &_total{
        line-height: 50px;
        width:75.7%;//(1120-141-132)/1120*100%
        padding-left: 2.7%;//30/1120*100% 
      }
      &_nothingImg{margin-top: 0;}
    }
    &__item_tgName, &_bar_tgName{
      width:18.2%;
      padding:0 0 0 2.7%;
    }//width:170/1120*100% 30
    &__item_orderNo, &_bar_orderNo{ width:21.3%; }//238/1120*100%
    &__item_betTime, &_bar_betTime{ width:18.3%; }//204/1120*100%;
    &__item_betContent, &_bar_betContent{ width:9.4%; }//128/1120*100%;
    &__item_coinName, &_bar_coinName{ width:8.5%; }//107/1120*100%;
    &__item_betAmount, &_bar_betAmount{ width:12.5%; }//141/1120*100%
    &__item_winLoss, &_bar_winLoss{
      width:11.8%;
      padding:0 2.7% 0 0;
    }//132/1120*100% 30
    &__foot{
      font-size: 14px;
      display: flex;
      justify-content:space-between;
      padding-top: 40px;
      &_page{display: flex;}
      &__btn, &_select{
        color: #54341D;
        line-height: 28px;
        border: 1px solid #54341D;
        border-radius: 2px;
      }
      &__btn{
        min-width: 30px;
        padding: 0 9px;
        transition: color .4s, background-color .4s;
        + .game__foot__btn{margin-left: 12px;}
        &-actice, &:hover{
          color:#fff;
          background-color: #4A954F;
          border-color: #4A954F;
        }
      }
      &_select{
        font-size: 14px;
        width: 80px;
        height: 30px;
        padding-left: 10px;
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .game{
    &-bet{
      height: auto;//896px
      border: 1px solid #E9D1A1;
      box-shadow:0 0 2px #E9D1A1;
      margin: 52px auto;
    }
    &_head__btn:hover{
      color:#fff;
      text-shadow: 0 0 1px rgba(#fff, .5);
      background-color:#F6A412;
      border: 1px solid #F6A412;
    }
    &__item{
      &_orderNo, &_betTime{font-size: 16px;}
    }
  }
}
</style>