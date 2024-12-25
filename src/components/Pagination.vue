<script setup>
const props = defineProps({
        currentPage:{
          type:Number,
          default:1
        },
        totalPage:{
          type:Number,
          default:1
        },
        changePage:{
          type:Function,
          default:() => {}
        }
      }),
      // 計算需要顯示的頁碼數 
      displayPages = computed(() => {
        const otherPage = 8,
              maxPage = 1 + otherPage,
              minPage = props.totalPage - otherPage,
              startPage = Math.max(
                1, props.currentPage - otherPage/2 > minPage ? minPage : props.currentPage - otherPage/2
              ),
              endPage = Math.min(
                props.totalPage,
                props.currentPage + otherPage/2 < maxPage ? maxPage : props.currentPage + otherPage/2
              ),
              pages = [];
        for(let i = startPage; i <= endPage; i++){pages.push(i)}
        return pages;
      });
</script>

<template>
<ul class="pagination">
  <li 
    :class="[
      'pagination_btn pagination_btn-long',
      {'pagination_btn-disabled':props.currentPage <= 10}
    ]"
    @click="props.changePage(props.currentPage - 10)"
  >上10页</li>
  <li
    :class="[
      'pagination_btn pagination_btn-m',
      {'pagination_btn-disabled':props.currentPage === 1}
    ]" 
    @click="props.changePage(props.currentPage - 1)"
  >上一页</li>
  <li
    v-show="props.totalPage !== 1"
    v-for="page in displayPages"
    :key="page"
    :class="[
      'pagination_btn pagination_btn-short',
      {'pagination_btn-active':page === props.currentPage}
    ]"
    @click="props.changePage(page)"
  >{{page}}</li>
  <li
    :class="[
      'pagination_btn pagination_btn-m',
      {'pagination_btn-disabled':props.currentPage === props.totalPage}
    ]" 
    @click="props.changePage(props.currentPage + 1)"
  >下一页</li>
  <li
    :class="[
      'pagination_btn pagination_btn-long',
      {'pagination_btn-disabled':props.currentPage > props.totalPage - 10}
    ]" 
    @click="props.changePage(props.currentPage + 10)"
  >下10页</li>
</ul>
</template>

<style lang="scss">
.pagination{
  width: 100%;
  display: flex;
  justify-content:space-between;
  padding: 15px 12px;
  position:absolute;
  left:0;
  bottom: 0;
  &_btn{
    color:#666;
    line-height: 28px;
    text-align: center;
    display: none;
    border-radius: 2px;
    cursor: pointer;
    border: 1px solid #E1E1E1;
    transition:color .3s, background-color .3s, border-color .3s;
    &-m{
      width: 80px;
      display: block;
      border-radius: 4px;
    }
    &:hover, &-active{
      color:#fff;
      background-color:#4A954F;
      border-color:#4A954F;
    }
    &-disabled{
      color:#999;
      cursor: no-drop;
      &:hover{border-color:#E1E1E1;}
    }
    &-disabled, &-disabled:hover{
      color:#999;
      background-color:#E1E1E1;
    }
  }
}
// 手機版拿橫的時候 Landscape
@media screen and (min-width: 640px) and (max-width: 950px) and (orientation:landscape){
  .pagination{padding: 12px;}
}
// ===== 平板版型區 =====
@media screen and (min-width: 1024px) {
  .pagination{
    justify-content:center;
    &_btn{
      display: block;
      &-m{border-radius: 0;}
      &-long{width: 80px;}
      &-short{
        min-width: 30px;
        padding: 0 5px;
      }
      + .pagination_btn{margin-left: 16px;}
    }
  }
}
@media screen and (min-width: 1200px) {
  .pagination{padding: 50px 0;}
}
</style>