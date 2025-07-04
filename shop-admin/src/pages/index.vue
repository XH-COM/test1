<template>
  <div>
    <h1> --后台首页-- </h1>
    <el-button @click="set">设置</el-button>
    <el-button @click="get">读取</el-button>
    <el-button @click="remove">删除</el-button>

  </div>

  {{ $store.state.user.username }}
<!--  <el-button @click="HandleLogout">退出登录</el-button>-->
</template>


<script setup>
// import {useCookies} from '@vueuse/integrations/useCookies'// useCookies
// import {ElMessage, ElMessageBox} from 'element-plus' //确认消息提示框
// import {showModal, toast} from "~/composables/util.js";
// import {logout} from "~/api/manager.js";
// import {removeToken} from "~/composables/auth.js";
// import {useRouter} from "vue-router";
// import {useStore} from "vuex";
//
// const router = useRouter()  //跳转路由
// const  store=useStore()
//
// function HandleLogout() {   //退出登录
//   showModal('确认退出登录,继续？').then((resp) => {
//      logout().finally(()=>{
//        //清除 cookie
//        //清除当前用户状态 vuex
//        store.dispatch("logout");
//        //跳转回登录页
//        router.push("/login")
//        //提示退出登录成功
//        toast("退出登录成功",'success');
//      })
//   }).catch(() => {
//
//   })
// }
//
//
// const cookie = useCookies()
// // console.log("login")
// // console.log(cookie)
// function set() {
//   cookie.set("admin-token", "123456")
// }
//
// function get() {//获取cookie
// console.log("token：" + cookie.get("admin-token"))
// }
//
// function remove() { //移除 cookie
//   cookie.remove("admin-token")
// }

</script>

<style scoped>

</style>