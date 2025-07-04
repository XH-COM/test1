
<template>
  <div class="f-menu" :style="{width:store.state.asideWidth}">
    <el-menu
        unique-opened
        default-active="2"
        class="border-0"
        @select="handleSelect"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="defaultActive"

    >
      <!-- unique-opened 只能展开一子菜单 -->
      <!-- 关闭动画，因为不能调动画 速度-->
      <!-- 第一个参数是index，第二个参数是 path-->

      <!-- 循环生成菜单项 -->
      <template v-for="(item,index) in asideMenus" :key="index" >
        <!-- 情况1：有子菜单 -->
        <el-sub-menu v-if="item.child && item.child.length>0":index="item.name">   <!-- 有子菜单的话-->
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{item.name}}</span>
          </template>

          <!-- 生成子菜单项 -->
          <el-menu-item v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath" >
            <el-icon>
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>

        </el-sub-menu>

        <!-- 情况2：无子菜单 -->
        <el-menu-item v-else :index="item.frontpath" >
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>Navigator Two</span>
        </el-menu-item>

      </template>
    </el-menu>

  </div>

</template>

<script setup>
import {computed,ref,reactive} from 'vue'  // 计算属性
import {useRouter,useRoute } from 'vue-router';
import {useStore} from 'vuex';
const route = useRoute()
// 默认选中
const defaultActive = ref(route.path)

const store=useStore()
//是否折叠
const  isCollapse=computed(()=>!(store.state.asideWidth=='250px'))
const router = useRouter()

//获取真实数据
const asideMenus = computed(() => (store.state.menus))

// const asideMenus = [{
//   "name": "后台面板",
//   "icon": "help",
//   "child": [{
//     "name": "主控台",
//     "icon": "home-filled",
//     "frontpath": "/",
//   }]
// }, {
//   "name": "商城管理",
//   "icon": "shopping-bag",
//   "child": [{
//     "name": "商品管理",
//     "icon": "shopping-cart-full",
//     "frontpath": "/goods/list",
//   }]
// }]

const handleSelect = (e) => {
  router.push(e)
}
</script>

<style >
.f-menu {
  //width: 250px;
  transition:all 0.4s;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md fixed bg-light-100;
}
.f-menu ::-webkit-scrollbar{
  width: 0px;
}
</style>