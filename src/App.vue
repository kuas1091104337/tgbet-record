<script setup>
const menuOpen = ref(false),
      menuSwitch = () => menuOpen.value = !menuOpen.value ;
</script>

<template>
  <RouterView />
  <!-- to="/issueBetInfo?issueNo=20230530436&token=Rm7+3pxShNwqDWElJpQPiFc0vnuY1vBaFrZaI2OT+KFC1i9Bwi4bC38l2EJaqGLFspM/IaWBOjhEHZTYNH6X+AFou/Jys6OjaQcp1aU4R44=" -->
  <!-- to="/issueWinLossInfo?issueNo=20230530436&token=Rm7+3pxShNwqDWElJpQPiFc0vnuY1vBaFrZaI2OT+KFC1i9Bwi4bC38l2EJaqGLFspM/IaWBOjhEHZTYNH6X+AFou/Jys6OjaQcp1aU4R44=" -->
  <div :class="['betMenuBtn',{'betMenuBtn-open':menuOpen}]" @click="menuSwitch">
    <div class="betMenuBtn_wrap">
      <span class="betMenuBtn__bar"></span>
    </div>
  </div>
  <ul class="betMenu">
    <li class="betMenu_item">
      <RouterLink
        @click="menuSwitch"
        class="betMenu__link" 
        to="/?token=Rm7+3pxShNwqDWElJpQPiFc0vnuY1vBaFrZaI2OT+KFC1i9Bwi4bC38l2EJaqGLFspM/IaWBOjhEHZTYNH6X+AFou/Jys6OjaQcp1aU4R44="
      >首頁</RouterLink>
    </li>
    <li class="betMenu_item">
      <RouterLink
        @click="menuSwitch"
        class="betMenu__link"
        to="/issueBetInfo?issueNo=20230419304&token=ItTb1SWCDdps8YAA48sKuDFsU3q3/zOAyc8wZS6pdmIewl5X0sVu3/3yGIKg0Hl4"
      >投注记录</RouterLink>
    </li>
    <li class="betMenu_item">
      <RouterLink
        class="betMenu__link"
        to="/issueWinLossInfo?issueNo=20230419304&token=ItTb1SWCDdps8YAA48sKuDFsU3q3/zOAyc8wZS6pdmIewl5X0sVu3/3yGIKg0Hl4"
      >开奖结果</RouterLink>
    </li>
    <li class="betMenu_item">
      <RouterLink 
        class="betMenu__link"
        to="/betOrderInfo?tgName=%F0%9F%8C%B9%F0%9F%8C%B9katy%E2%9D%A4%EF%B8%8F%F0%9F%A4%A2%F0%9F%A6%9E&token=cx2lazV5RJlVIrHxohtA1VgMW6gmCMmg5HMedghz166I/LXvYxvEHHhlvZDGLbij"
      >投注信息</RouterLink>
    </li>
    <li class="betMenu_item">
      <RouterLink 
        class="betMenu__link"
        to="/lotteryCenter/?&lotteryCode=rpsgame"
      >彩票中心</RouterLink>
    </li>
    <li class="betMenu_item">
      <RouterLink 
        class="betMenu__link"
        to="/404"
      >404</RouterLink>
    </li>
  </ul>
</template>

<style lang="scss">
@import"@/assets/scss/variablesExtendMixin.scss";
@include body_scrollbar;
html, body{ 
  font-size:16px;
  width:100%;
  min-width:360px;
  -webkit-text-size-adjust:none; // 在 iOS 旋轉畫面鎖定文字不縮放 
  -webkit-overflow-scrolling:touch; // 安卓和IOS使用滾動回彈效果 
}
html{
  -ms-text-size-adjust:100%; 
  -webkit-text-size-adjust:100%;
}
body{
  font-family:"Microsoft JhengHei", "PingFangTC", "Microsoft YaHei", Arial, Helvetica, sans-serif;
  background-color:#f0ebce;
  margin:0;
  // only Firefox
  scrollbar-width: thin;
  scrollbar-color: rgba(#000,.25) #f1f1f1;
}
html, body, #app{height:100%;}
input{outline:0;}
ul{
  list-style: none;
	padding-left: 0;
	margin:0;
}
a{ //手指點連結的顏色變透明
  display:block;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
*{box-sizing:border-box;}
.betMenuBtn{
  width:44px;
  height:44px;
  padding:4px;
  position:fixed;
  right:8px;
  bottom:10%;
  z-index:1;
  &-open{
    .betMenuBtn__bar{
      width:26px;
      background-color:rgba(#fff,0);
      transform:rotate(-180deg);
      &:before{transform:translate3d(0,0,0) rotate(-45deg)}
      &:after{transform:translate3d(0,0,0) rotate(45deg)}
    }
    + .betMenu{z-index:0;}
  } 
  &_wrap{
    height:100%;
    display:flex;
    background-color:#F6A412;
    border-radius:50%;
  }
  &__bar{
    width:22px;
    height:2px;
    background-color:#fff;
    border-radius:2px;
    margin:auto;
    position:relative;
    transition:width .4s, background-color .4s, transform .4s;
    &:before, &:after{
      content:"";
      width: 100%;
      height: 100%;
      display:block;
      background-color:#fff;
      border-radius:2px;
      @extend %posaT0L0;
      transition: transform .4s;
    }
    &:before{transform:translate3d(0,-7px,0);}
    &:after{transform:translate3d(0,7px,0);}
  }
}
.betMenu{
  @extend %wh100pPosfT0L0;
  background-color:#F6A412;
  @extend %disFlexJustifyAlignCenter;
  flex-direction:column;
  z-index:-1;
  &_item{
    width:180px;
    + .betMenu_item{margin-top:20px;}
    &:last-of-type{font-family:sans-serif, Helvetica;}
  }
  &__link{
    color:#fff;
    font-size:32px;
    text-align:center;
    font-weight:lighter;
    line-height:1.2;
    text-decoration:none;
    transform:skew(-4deg);
  }
}
</style>