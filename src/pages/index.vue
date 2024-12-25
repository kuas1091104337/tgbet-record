<script setup>
import axios from 'axios';
import QrcodeVue from 'qrcode.vue';
const route = useRoute(),
      tgData = reactive({
        token:'',
        svcLink:'',
        feeRate:'',
        tgGroupUrl:'',
        type:0, //welcome:0 lucky:1 how:2
        list:[]
      }),
      typeChange = (type) => tgData.type = type,
      changeType = (val) => tgData.type = ((tgData.type += val) + 3) % 3;

onMounted(async () => {
  try{
    document.title = '【发发拳】有趣好玩 公平公正 时时开奖';
    const urlKey = 'token=',
          routeParameter = route.fullPath;
    tgData.token = routeParameter.substr(routeParameter.indexOf(urlKey)+urlKey.length);
    // const res = await axios.post('/api/game/home', { token:tgData.token });
    const betArr = ['剪刀','拳头','布'],
          res = {
            data:{
              success:true,
              data:{
                custServiceUrl:'https://www.google.com.tw/', 
                luckyRecordList:[
                  {tgName:'388U.'+Math.round(Math.random()*100000000),betContent:betArr[Math.round(Math.random()*2)],winLoss:(Math.random()*10000).toFixed(2)},
                  {tgName:'188U.'+Math.round(Math.random()*100000000),betContent:betArr[Math.round(Math.random()*2)],winLoss:(Math.random()*10000).toFixed(2)},
                  {tgName:'88U.'+Math.round(Math.random()*100000000),betContent:betArr[Math.round(Math.random()*2)],winLoss:(Math.random()*10000).toFixed(2)},
                  {tgName:'38U.'+Math.round(Math.random()*100000000),betContent:betArr[Math.round(Math.random()*2)],winLoss:(Math.random()*10000).toFixed(2)},
                  {tgName:'38U.'+Math.round(Math.random()*100000000),betContent:betArr[Math.round(Math.random()*2)],winLoss:(Math.random()*10000).toFixed(2)},
                  {tgName:'38U.'+Math.round(Math.random()*100000000),betContent:betArr[Math.round(Math.random()*2)],winLoss:(Math.random()*10000).toFixed(2)},
                  {tgName:'38U.'+Math.round(Math.random()*100000000),betContent:betArr[Math.round(Math.random()*2)],winLoss:(Math.random()*10000).toFixed(2)},
                  {tgName:'38U.'+Math.round(Math.random()*100000000),betContent:betArr[Math.round(Math.random()*2)],winLoss:(Math.random()*10000).toFixed(2)},
                  {tgName:'38U.'+Math.round(Math.random()*100000000),betContent:betArr[Math.round(Math.random()*2)],winLoss:(Math.random()*10000).toFixed(2)},
                  {tgName:'38U.'+Math.round(Math.random()*100000000),betContent:betArr[Math.round(Math.random()*2)],winLoss:(Math.random()*10000).toFixed(2)},
                ], 
                tgGroupUrl:'https://www.google.com.tw/', 
                feeRate:(Math.random()*10).toFixed(2)
              }
            }
          };
    // console.log(res.data);
    if(res.data.success === true){
      tgData.svcLink = res.data.data.custServiceUrl;
      tgData.list = res.data.data.luckyRecordList;
      tgData.tgGroupUrl = res.data.data.tgGroupUrl;
      tgData.feeRate = res.data.data.feeRate;
    }else{
      window.location.search = ''
    }
  }catch(err){
    console.error(err.message)
  }
});
</script>

<template>
  <header class="tgHead tgHead-index">
    <hgroup class="tgHead_wrap">
      <h3 class="tgHead__logo">
        <img class="tgHead__logo_img" src="@/assets/img/logo.png" alt="发发拳 logo">
      </h3>
      <a
        :href="tgData.svcLink" 
        class="tgHead__link" 
        target="_blank"
        v-show="tgData.svcLink"
      >
        <img class="tgHead__link_img" src="@/assets/img/service_btn.png" alt="联系客服">
      </a>
    </hgroup>
  </header>
  <div class="index">
    <h1 class="tgTitle">
      <img class="tgTitle_img" src="@/assets/img/title.png" alt="发发拳 有趣好玩 公平公正 时时开奖">
    </h1>
    <nav class="tgMenu">
      <a href="javascript:;" :class="['tgMenu_link',{'tgMenu_link-active':tgData.type === 0}]" @click="typeChange(0)">
        <p class="tgMenu_link_title">
          <img class="tgMenu_link__img" src="@/assets/img/btn-close.png">
          <img class="tgMenu_link__img tgMenu_link__img-active" src="@/assets/img/btn-open.png">
          <span class="tgMenu_link_title_text">欢迎加入</span>
        </p>
        <span class="tgMenu_link_icon">
          <img class="tgMenu_link__img" src="@/assets/img/stone_btn.png">
          <img class="tgMenu_link__img tgMenu_link__img-active" src="@/assets/img/cloth_btn.png">
        </span>
      </a>
      <a href="javascript:;" :class="['tgMenu_link',{'tgMenu_link-active':tgData.type === 1}]" @click="typeChange(1)">
        <p class="tgMenu_link_title">
          <img class="tgMenu_link__img" src="@/assets/img/btn-close.png">
          <img class="tgMenu_link__img tgMenu_link__img-active" src="@/assets/img/btn-open.png">
          <span class="tgMenu_link_title_text">排位赛</span><!-- 幸运玩家 -->
        </p>
        <span class="tgMenu_link_icon">
          <img class="tgMenu_link__img" src="@/assets/img/stone_btn.png">
          <img class="tgMenu_link__img tgMenu_link__img-active" src="@/assets/img/cloth_btn.png">
        </span>
      </a>
      <a href="javascript:;" :class="['tgMenu_link',{'tgMenu_link-active':tgData.type === 2}]" @click="typeChange(2)">
        <p class="tgMenu_link_title">
          <img class="tgMenu_link__img" src="@/assets/img/btn-close.png">
          <img class="tgMenu_link__img tgMenu_link__img-active" src="@/assets/img/btn-open.png">
          <span class="tgMenu_link_title_text">玩法说明</span>
        </p>
        <span class="tgMenu_link_icon">
          <img class="tgMenu_link__img" src="@/assets/img/stone_btn.png">
          <img class="tgMenu_link__img tgMenu_link__img-active" src="@/assets/img/cloth_btn.png">
        </span>
      </a>
    </nav>
    <ul class="tgMain">
      <li class="tgMain_btn tgMain_btn-prev" @click="changeType(-1)">
        <img class="tgMain_btn_img" src="@/assets/img/prev.png" alt="prev btn">
      </li>
      <li class="tgMain_part" v-show="tgData.type === 0">
        <div class="tgMain_part_wrap tgMain_part_wrap-welcome">
          <img class="tgMain_part__banner" src="@/assets/img/banner.png" alt="发发拳 Banner">
          <span class="tgMain_part__aside">
            <qrcode-vue class="tgMain_part__aside_qrcode" :value="tgData.tgGroupUrl" :size="260" :margin="2"/>
            <a :href="tgData.tgGroupUrl" class="tgMain_part__aside_link" target="_blank">
              <img class="tgMain_part__aside__img" src="@/assets/img/enter.png" alt="发发拳 Banner">
            </a>
          </span>
        </div>
      </li>
      <li class="tgMain_part" v-show="tgData.type === 1">
        <div class="tgMain_part_wrap tgMain_part_wrap-ranke">
          <img class="tgMain_part__img tgMain_part__rankeTitle" src="@/assets/img/ranke_title.png">
          <p class="tgMain_part__text tgMain_part__rankeText">全服总投注排名前十名的用户即可获得奖金</p>
          <img class="tgMain_part__img tgMain_part__rankeImg-m" src="@/assets/img/ranke_img-m.png">
          <img class="tgMain_part__img tgMain_part__rankeImg-d" src="@/assets/img/ranke_img-d.png">
          <!-- <li class="tgMain_part__luckyList_item">
            <span class="tgMain_part__luckyList__icon">
              <img class="tgMain_part__luckyList__icon_img" src="@/assets/img/avatar_2.png"> <img src="@/assets/img/avatar_3.png">
            </span>
            <p class="tgMain_part__luckyList__tgName">天乐7788</p>
            <p class="tgMain_part__luckyList__betContent">
              <img class="tgMain_part__luckyList__betContent_img" src="@/assets/img/cloth.png" alt="cloth"> <img src="@/assets/img/scissors.png" alt="scissors">赢
            </p>
            <p class="tgMain_part__luckyList__winLoss">8000USDT</p>
          </li> -->
          <h2 class="tgMain_part__title">
            <img class="tgMain_part__title_img" src="@/assets/img/lucky_title.png" alt="幸运玩家">
          </h2>
          <ul class="tgMain_part__luckyList">
            <li class="tgMain_part__luckyList_item" v-if="!tgData.list.length">
              <img class="tgMain_part__luckyList__empty" src="../assets/img/empty.png" alt="暂无数据">
            </li>
            <li 
              class="tgMain_part__luckyList_item"
              v-for="(item,idx) in tgData.list" 
              :key="idx"
            >
              <span class="tgMain_part__luckyList__icon">
                <img v-if="(idx+1)%4 === 0" class="tgMain_part__luckyList__icon_img" src="@/assets/img/avatar_4.png">
                <img v-else-if="(idx+1)%3 === 0" class="tgMain_part__luckyList__icon_img" src="@/assets/img/avatar_3.png">
                <img v-else-if="(idx+1)%2 === 0" class="tgMain_part__luckyList__icon_img" src="@/assets/img/avatar_2.png">
                <img v-else class="tgMain_part__luckyList__icon_img" src="@/assets/img/avatar_1.png">
              </span>
              <p class="tgMain_part__luckyList__tgName">{{ item.tgName }}</p>
              <p class="tgMain_part__luckyList__betContent">
                <img v-if="item.betContent === '剪刀'" class="tgMain_part__luckyList__betContent_img" src="@/assets/img/scissors.png" alt="scissors">
                <img v-else-if="item.betContent === '拳头'" class="tgMain_part__luckyList__betContent_img" src="@/assets/img/stone.png" alt="stone">
                <img v-else-if="item.betContent === '布'" class="tgMain_part__luckyList__betContent_img" src="@/assets/img/cloth.png" alt="cloth">
                赢
              </p>
              <p class="tgMain_part__luckyList__winLoss">{{ item.winLoss }} USDT</p>
            </li>
          </ul><!--  -->
        </div>
      </li>
      <li class="tgMain_part" v-show="tgData.type === 2">
        <div class="tgMain_part_wrap tgMain_part_wrap-how">
          <h2 class="tgMain_part__title tgMain_part__title-how">
            <img class="tgMain_part__title_img" src="@/assets/img/how_title.png" alt="玩法说明">
          </h2>
          <p class="tgMain_part__text">
            还记得儿时的游戏吗？发发拳带你在闲暇之余重温儿时记忆！<br>
            拳头A、剪刀B、布C，简单易记！<br>
            玩家小伙伴可以随意投注拳头、剪刀、布中的任何一种或几种，但庄家一局只能出一种。所以必有一个玩家会赢！<br>
            发发拳是一个纯娱乐平台，希望能给大家带来一些乐趣。<br>
            猜赢的小伙伴会被收取{{tgData.feeRate}}%服务费，希望大家多支持！
            <!-- <a @click="regSubmit">送出</a> -->
          </p>
          <ul class="tgMain_part__howList">
            <li class="tgMain_part__howList_title">
              <p class="tgMain_part__howList__text">拳头</p>
              <p class="tgMain_part__howList__text">剪刀</p>
              <p class="tgMain_part__howList__text">布</p>
            </li>
            <li class="tgMain_part__howList_item">
              <p class="tgMain_part__howList__text">A</p>
              <p class="tgMain_part__howList__text">B</p>
              <p class="tgMain_part__howList__text">C</p>
            </li>
          </ul>
          <p class="tgMain_part__text">
            发发拳基于TG，会有一些简单的命令提供给大家<br>
            <strong class="tgMain_part___mark">如果要投注拳头100USDT</strong><br>
            <strong class="tgMain_part___mark">命令为：A100, 剪刀就是B100</strong>
          </p>
          <img class="tgMain_part__img" src="@/assets/img/play_banner.jpg" alt="玩法说明 game">
          <p class="tgMain_part__text">
            进入智能客服后，可以使用<strong class="tgMain_part___mark"> start/ </strong>命令获得功能菜单<br>
            <strong class="tgMain_part___mark">cb/ </strong>获得充币信息（cb就是充币的意思）<br>
            <strong class="tgMain_part___mark">tb/ </strong>数量 可进行提币（tb就是提币的意思）<br>
            <strong class="tgMain_part___mark">trc/ </strong>收币地址 可进行收币地址绑定，<br>
            目前发发拳暂时仅支持TRC20的USDT
          </p>
        </div>
      </li>
      <li class="tgMain_btn tgMain_btn-next" @click="changeType(1)">
        <img class="tgMain_btn_img" src="@/assets/img/next.png" alt="next btn">
      </li>
    </ul>
    <footer class="tgFoot">
      <p class="tgFoot_txt"><strong>Copyright © 2016-2023 FFQ88.com All Rights Reserved</strong></p>
    </footer>
  </div>
</template>

<style lang="scss">
@import"@/assets/scss/variablesExtendMixin.scss";
%w100b{
  width: 100%;
  display: block;
}
@keyframes bannerScale{
  0%,66.66%,100%{transform:scale3d(1,1,1);}
  33.33%{transform:scale3d(1.075,1.075,1);}
}
@keyframes btnScale{
  0%,66.66%,100%{transform:scale3d(1,1,1);}
  33.33%{transform:scale3d(1.05,1.05,1);}
}
@keyframes tgMainPartFadeIn{
  0%{
    transform:scale3d(.95,.95,1);
    opacity: 0;
  }
  100%{
    transform:scale3d(1,1,1);
    opacity: 1;
  }
}
// @include body_scrollbar(#EFEBCF);
.index{
  background:#EFEBCF url("@/assets/img/bg-m.jpg") no-repeat center top/100% auto;
  min-height: calc(100% - 48px);
  padding-top: 1px;
}
.tgTitle{
  width: calc(366/828)*100%;
  display: block;
  margin: size_pxToVw(10,414) auto size_pxToVw(110,414);
  animation:bannerScale 1.5s linear infinite;
  &_img{@extend %w100b;}
}
.tgMenu{
  display: flex;
  justify-content:space-around;
  &_link{
    text-decoration:none;
    width: size_pxToVw(101,414);
    &-active{
      .tgMenu_link{
        &__img{
          opacity: 0;
          &-active{opacity: 1;}
        }
        &_title_text{text-shadow: 0 0 3px rgba(#54341D,.5);}
      }
    }
    &_title, &_icon{position: relative;}
    &_title{
      margin: 0 0 size_pxToVw(4,414);
      &_text{
        color:#fff;
        font-size: size_pxToVw(16,414);
        font-weight: bold;
        line-height: 1;
        @extend %disFlexJustifyAlignCenter;
        @extend %wh100pPosaT0L0;
      }
    }
    &_icon{
      width: size_pxToVw(42,414);
      display: block;
      margin:0 auto;
    }
    &__img{
      @extend %w100b;
      &-active{
        opacity: 0;
        @extend %posaT0L0;
        transition:opacity .4s;
      }
    }
  }
}
.tgMain{
  padding: size_pxToVw(40,828) size_pxToVw(32,828) size_pxToVw(4,828);
  &_btn{display: none;}
  &_part{
    background-color:rgba(#fff,.5);
    border-radius: size_pxToVw(28,828);
    box-shadow: 0 size_pxToVw(2,828) size_pxToVw(4,828) rgba(#DF9112,.5);
    padding: size_pxToVw(20,828);
    animation: tgMainPartFadeIn .4s;
    &_wrap{
      color: #54341D;
      font-size: size_pxToVw(28,828);
      background:#F9E6B7 url("@/assets/img/index_bg.png") no-repeat center/contain;
      border-radius: size_pxToVw(20,828);
      box-shadow: 0 size_pxToVw(2,828) size_pxToVw(4,828) #DF9112;
      padding: size_pxToVw(20,828);
    }
    &__banner{
      width: size_pxToVw(610,828);
      display: block;
      margin: size_pxToVw(96,828) auto size_pxToVw(70,828);
    }
    &__aside{
      &_qrcode{display: none;}
      &_link{
        width: size_pxToVw(560,828);
        margin: 0 auto size_pxToVw(70,828);
        // border-radius: size_pxToVw(16,828);
        // box-shadow: 0 size_pxToVw(2,828) size_pxToVw(6,828) 1px #DF9112;
        animation:btnScale 1.5s -1s linear infinite;
      }
      &__img{@extend %w100b;}
    }
    &__title{
      border-bottom: 1px solid #DEBC72;
      padding: size_pxToVw(12,828) 0 size_pxToVw(32,828);
      margin:0;
      &-how{margin-bottom: size_pxToVw(14,828);}
      &_img{
        width: size_pxToVw(166,828);
        display: block;
        margin:0 auto;
      }
    }
    &__luckyList{
      min-height: 240px;
      &_item{
        line-height: calc(114/28);
        text-shadow: 0 0 1px rgba(#54341D,.6);
        display: flex;
        + .tgMain_part__luckyList_item{border-top: 1px solid #DEBC72;}
      }
      &__tgName, &__betContent, &__winLoss{margin:0;}
      &__empty{
        width: 155px;
        display: block;
        margin:50px auto;
      }
      &__icon{
        width: calc(89/684)*100%;
        display: flex;
        &_img{
          width: size_pxToVw(72,828);
          margin:auto 0;
        }
      }
      &__tgName{
        white-space: nowrap;
        text-overflow: ellipsis;
        width: calc(219/684)*100%;//183
        overflow: hidden;
      }
      &__betContent{
        color: #C15D26;
        text-shadow: 0 0 1px rgba(#C15D26,.6);
        width: calc(190/684)*100%;//226
        @extend %disFlexJustifyAlignCenter;
        &_img{
          width: size_pxToVw(72,828);
          margin-right: size_pxToVw(22,828);
        }
      }
      &__winLoss{
        text-align: right;
        width: calc(186/684)*100%;
      }
    }
    &__text{
      line-height: 1.57;
      text-shadow: 0 0 1px rgba(#54341D,.5);
      margin: 0 0 size_pxToVw(40,828);
    }
    &___mark{
      color: #C15D26;
      text-shadow: 0 0 1px rgba(#C15D26,.5);
    }
    &__img{
      @extend %w100b;
      margin-bottom: size_pxToVw(40,828);
    }
    &__howList{
      border: 1px solid #C15D26;
      margin-bottom: size_pxToVw(40,828);
      &_item, &_title{display: flex;}
      &_title{
        color:#fff;
        text-shadow: 0 0 1px rgba(#fff,.75);
        background-color:#C15D26;
      }
      &_item{
        color:#C15D26;
        font-weight: bold;
      }
      &__text{
        font-size: size_pxToVw(32,828);
        text-align: center;
        line-height: calc(70/28);
        flex:1 1 0;
        margin:0;
        + .tgMain_part__howList__text{border-left: 1px solid #C15D26;}
      }
    }
    &__rankeTitle{
      max-width:640px;
      margin-top: size_pxToVw(20,828);
      margin-left: auto;
      margin-right: auto;
    }
    &__rankeText{text-align: center;}
    &__rankeImg{
      &-m, &-d{margin: 0 auto;}
      &-m{max-width: 648px;}
      &-d{height: 0;}
    }
  }
}
.tgFoot{
  color: #54341D;
  font-size: size_pxToVw(12,414);
  line-height: size_pxToVw(82,414);
  text-align: center;
  &_txt{margin:0;}
}
@media screen and (min-width: 600px){
  .tgMain_part{
    &__luckyList_item{font-weight: bold;}
    &__luckyList_item, &__luckyList__betContent{text-shadow: none;}
  }
}
@media screen and (min-width: 1024px){
  .index{background-image:url("@/assets/img/bg-d.jpg");}
  .tgTitle{
    width: calc(520/1920)*100%;
    margin: size_pxToVw(125,1920) auto size_pxToVw(313,1920);
  }
  .tgMenu{
    justify-content:center;
    position: relative;
    &:before{
      content:"";
      width: 670px;
      border-bottom: 1px dashed #54341D;
      margin-left: -335px;
      position:absolute;
      left:50%;
      bottom:0;
    }
    &_link{
      width: 195px;
      + .tgMenu_link{margin-left: 62px;}
      &_title{
        margin-bottom: 9px;
        &_text{font-size: 22px;}
      }
      &_icon{width: 58px;}
    }
  }
  .tgMain{
    padding: 42px 42px 14px;
    &_part{
      border-radius: 28px;
      box-shadow: 0 2px 4px rgba(#DF9112,.5);
      padding: 30px;
      &_wrap{
        font-size: 18px;
        background-size:58.25% auto;
        border-radius: 28px;
        box-shadow: 0  2px 4px #DF9112;
        padding: 35px;
        &-how{
          display: flex;
          flex-wrap:wrap;
          position: relative;
          > .tgMain_part__title, > .tgMain_part__howList, > .tgMain_part__text{width: 100%;}
          > .tgMain_part__howList{order:1;}
          > .tgMain_part__img{
            width: 300px;
            margin-bottom: 0;
            position:absolute;
            left: 35px;
            bottom: 35px;
            + .tgMain_part__text{
              order:1;
              padding-left: 330px;
              margin: 60px auto;
            }
          }
        }
        &-welcome{
          display: flex;
          align-items:center;
        }
      }
      &__banner{
        width:66.5%;
        margin:35px 0;
      }
      &__aside{
        width: 33.5%;
        padding: 0 4.6%;
        &_qrcode{
          width: 100% !important;
          height: auto !important;
          display: block;
          border-radius: 8px;
        }
        &_link{
          width: 100%;
          margin: 40px 0 0;
        }
      }
      &__title{
        border-bottom: 1px solid #DEBC72;
        padding: 0 0 35px;
        margin:0;
        &-how{
          margin-bottom: 28px;
          // + .tgMain_part__text{margin-bottom: 8px;}
        }
        &_img{width: 165px;}
      }
      &__luckyList{
        &_item{line-height: 79px;}
        &__icon{width: 15%;}
        &__betContent, &__winLoss{width: 20%;}
        &__tgName{width: 45%;}
        &__icon_img, &__betContent_img{width: 48px;}
        &__betContent_img{margin-right: 14px;}
      }
      &__text{line-height: 30px;}
      &__text, &__howList{
        max-width: 900px;
        margin:0 auto 22px;
      }
      &__howList{
        &__text{
          font-size: 20px;
          line-height: calc(39/20);
        }
      }
      &__rankeTitle{
        max-width:534px;
        margin-top: 0;
        margin-bottom: 30px;
      }
      &__rankeImg{
        &-m{height:0;}
        &-d{
          max-width: 776px;
          height:auto;
        }
      }
    }
  }
  .tgFoot{
    font-size: 14px;
    line-height: 72px;
  }
}
@media screen and (min-width: 1122px){
  .tgMain_part_wrap-how > .tgMain_part__img{
    left: 50%;
    transform:translate3d(-450px,0,0);
  }
}
@media screen and (min-width: 1200px){
  .tgMain{
    max-width: 1284px;
    margin:0 auto;
    &_part{
      &__banner{margin: 65px 0;}
      &__luckyList{
        // &__icon, &__tgName, &__betContent, &__winLoss{width: 25%;}
        &__empty{
          margin-top:120px;
          margin-bottom:120px;
        }
        &__icon, &__betContent, &__winLoss{width: 22.5%;}
        &__tgName{width: 32.5%;}
      }
    }
  }
}
@media screen and (min-width: 1350px){
  .tgMain{
    position: relative;
    &_btn{
      display: block;
      position: absolute;
      top: 380px;
      transition:transform .4s, filter .4s;
      &-prev{left: -37px;}
      &-next{right: -37px;}
      &_img{display: block;}
      &:hover{
        transform:scale3d(1.1,1.1,1);
        filter:brightness(.75);
      }
    }
  }
}
@media screen and (min-width: 1920px){
  .index{
    max-width: 1920px;
    margin:0 auto;
  }
  .tgHead-index{
    max-width:1920px;
    margin:0 auto;
  }
}
</style>