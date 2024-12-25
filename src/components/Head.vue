<script setup>
import axios from 'axios';
const props = defineProps({
        tgName:{
          type:String,
          default:''
        },
        token:{
          type:String,
          default:''
        }
      }),
      svcLink = ref('');//,
      // windowOpen = (link) => window.open(link);
onMounted(async () => {
  const {data} = await axios.post('/api/game/custService',{
    token: props.token
  });
  svcLink.value = data.data;
});
</script>

<template>
  <header class="tgHead">
    <hgroup class="tgHead_wrap">
      <h3 class="tgHead__logo">
        <img class="tgHead__logo_img" src="@/assets/img/logo.png" alt="发发拳 logo">
      </h3>
      <p class="tgHead__name">
        <span v-show="props.tgName">TG用户：</span>{{props.tgName}}
      </p>
      <RouterLink 
        class="tgHead__link"
        :to="`/?token=${props.token}`"
      >
        <img class="tgHead__link_img" src="@/assets/img/indexBtn.png" alt="进入官网">
      </RouterLink>
    </hgroup>
    <!-- <a href="javascript:;" class="tgHead_service" @click="windowOpen(svcLink)"> -->
    <a v-if="svcLink" :href="svcLink" class="tgHead_service" target="_blank">
      <img class="tgHead_service_img" src="@/assets/img/service.png" alt="客服">
    </a>
  </header>
</template>

<style lang="scss">
// 移到common.scss
</style>