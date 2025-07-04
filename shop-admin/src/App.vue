<script setup>

</script>

<template>
<!--  <div>-->

<!--    <h1> hello world app</h1>-->

<!--  </div>-->

<!--  <div class="mb-4">-->
<!--    <el-button>Default</el-button>-->
<!--    <el-button type="primary">Primary</el-button>-->
<!--    <el-button type="success">Success</el-button>-->
<!--    <el-button type="info">Info</el-button>-->
<!--    <el-button type="warning">Warning</el-button>-->
<!--    <el-button type="danger">Danger</el-button>-->
<!--  </div>-->
  <router-view></router-view>

<!--  <p style="color: red"> 换行</p>-->

</template>


<!---->

<style >
#nprogress  .bar{
  background: #f3c40f!important;
  height: 4px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>