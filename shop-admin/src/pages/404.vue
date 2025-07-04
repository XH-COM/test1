<script setup lang="ts">

</script>
<!--<template>-->

<!--  <div>-->
<!--    <h1> Your page has not find ,this is 404</h1>-->
<!--  </div>-->

<!--</template>-->

<template>
    <div>
      <h1> Your page has not find ,this is 404</h1>
    </div>

  <el-col :sm="12" :lg="6" :xl="4">
    <el-result
        icon="warning"
        title="404 提示"
        sub-title="你找的页面走丢了，点击按钮返回主页"
    >
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">Back</el-button>
      </template>
    </el-result>
  </el-col>
</template>


