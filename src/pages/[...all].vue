<script setup>
</script>

<template>
<div class="index404">
  <div class="index404_banner"></div>
  <RouterLink class="index404_link" to="/">
    <img class="index404_link_img" src="../assets/img/btn-404.png" alt="回官网">
  </RouterLink>
  <footer class="index404_foot">Copyright © 2016-2023 FFQ88.com All Rights Reserved</footer>
</div>
</template>

<style lang="scss">
@import"@/assets/scss/variablesExtendMixin.scss";
@keyframes btn404{
  0%{transform:scale3d(1,1,1);}
  100%{transform:scale3d(1.06,1.06,1);}
}
@include body_scrollbar(#FCB92F);
.index404{
  min-height:100%;
  background-color:#FCB92F;
  display: flex;
  flex-direction:column;
  &_banner{
    width: 100%;
    height: 0;
    background-image:url("@/assets/img/bg404-m.png");
    background-size:cover;
    padding-bottom: calc(940/828)*100%;
    margin: calc(170/828)*100% 0 calc(86/828)*100%;
  }
  &_link{
    width: calc(337/828)*100%;
    max-width: 318px;
    display: block;
    margin:0 auto;
    animation:btn404 1.2s linear infinite alternate;
    &_img{
      width: 100%;
      display: block;
    }
  }
  &_foot{
    color: #54341D;
    font-size: 12px;
    line-height: 40px;
    text-align: center;
    text-shadow: 0 0 1px rgba(#54341D,.6);
    margin-top: auto;
  }
}
@media screen and (min-width: 640px){
  .index404{
    &_link{margin-bottom: calc(145/828)*100%;}
    &_foot{font-size: 14px;}
  }
}
@media screen and (min-width: 1024px){
  .index404{
    &_banner{
      width: 827px;
      height: 763px;
      background-image:url("@/assets/img/bg404-d.png");
      padding-bottom: 0;
      margin: 50px auto 0;
    }
    &_link{
      width: 194px;
      margin-bottom: 16px;
    }
    &_foot{line-height: 60px;}
  }
}
</style>