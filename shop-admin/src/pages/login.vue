<!--登录界面-->
<template>
  <!--  <title> 登陆界面</title>-->
  <!--  <h1> this is login in Page</h1>-->
  <!--  <el-row style="min-height:100vh;" class="bg-rose-100">-->
  <el-row class="login-continer">    <!-- 抽离class -->
    <el-col :lg="16" :md="12" class="flex items-center justify-center flex-col">
      <div>
        <div class="frot-bold text-5xl text-light-100 mb-4 ">欢迎登录</div>
        <div class="text-gray-400,text-4xl">此站点是登陆界面</div>
      </div>
    </el-col>
    <!--    <el-col C class=" bg-teal-50 flex items-center justify-center flex-col ">-->
    <el-col :lg="16" :md="12" class="left">

      <h2>欢迎回来</h2>
      <!--      <div class="flex items-center justify-center my-5 text-stone-300 space-x-2">-->
      <div class="right">
        <!--        <span class="h-[1px] w-16 bg-stone-300"></span>-->
        <span></span>

        <span>账号密码登录</span>
        <span></span>
      </div>


      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">

        <el-form-item label="账号" prop="name">  <!-- prop绑定到下面的验证规则 -->
          <el-input v-model="form.name" :prefix-icon="UserFilled"/>
        </el-form-item>

        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="form.pwd " :prefix-icon="ChatDotRound"/>
        </el-form-item>

        <el-form-item class="center-button">
          <el-button type="primary" class="w-[150px] ml-[70px] mx-auto" @click="onSubmit" :loading="loading">登录
          </el-button>
        </el-form-item>

      </el-form>

    </el-col>
  </el-row>

</template>

<script setup>
import {ref,reactive,onMounted,onBeforeUnmount}from 'vue'  // 3，4 页面写完 ，页面卸载
import {UserFilled, ChatDotRound} from '@element-plus/icons-vue'
import {login, getInfo} from '~/api/manager.js'
import {ElNotification} from 'element-plus'
import {useRouter} from 'vue-router' //跳转路由
import {useStore} from 'vuex'
import {useCookies} from '@vueuse/integrations/useCookies'// useCookies

import {setToken} from "~/composables/auth.js";
import {toast} from "~/composables/util.js";//封装好的
// import {store} from "~/store";
const router = useRouter()  //跳转路由
const  store=useStore()

// do not use same name with ref
const form = reactive({
  name: '',
  pwd: ''    //这里名字如果传对象的好要一致，如果是形参名字不一定要一样

})

const rules = {
  name: [
    {required: true, message: '请填写用户名!', trigger: 'blur'},
    {min: 4, max: 20, message: '用户名长度4-10位', trigger: 'blur'},
  ],
  pwd: [
    {required: true, message: '请输入密码!', trigger: 'blur'},
    {min: 3, max: 15, message: '密码长度3-10位', trigger: 'blur'},
  ] //key最好一样
}

const formRef = ref(null)
const loading = ref(false) // 加载中 防重复点击

const onSubmit = () => { //提交

  formRef.value.validate((valid) => {
    if (loading.value) return; // 如果正在加载，直接返回
    // console.log(valid)
    if (!valid) {
      return false
    }
    // 防重复
    loading.value = true;//提交

    store.dispatch("login", form).then(resp => {
      //登录成功提示
      toast("登录成功",'success')
      //跳转到后台首页
      router.push('/')
    }).finally(() => {
      loading.value = false
    })

  })
}

//监听回车事件
function onKeyUp(e){
  if (e.key === 'Enter') {
    onSubmit() //如果是回车事件，都执行登录操作
  }
}


//添加键盘监听
onMounted(() => {
  document.addEventListener('keyup',onKeyUp ) //document 是浏览器提供的一个全局对象，代表整个 HTML 文档。
                                                    // 它是 DOM（文档对象模型）的根节点,意味着监听整个页面的事件。
})
onBeforeUnmount(() => {
  document.removeEventListener('keyup',onKeyUp )
})


</script>

<style>
.login-continer {
  @apply min-h-screen bg-rose-100;
}

.left {
  @apply bg-teal-50 flex items-center justify-center flex-col;
}

.right {
  @apply flex items-center justify-center my-5 text-stone-300 space-x-2;
}

.right > span:first-child, .right > span:last-child {
  @apply h-[1px] w-16 bg-stone-300;
}


</style>

<!--//.btn{-->
<!--//  display: block;-->
<!--//  text-align: center;-->
<!--//  margin: 0 auto;-->
<!--//}-->

<!--// login(form.name, form.pwd).then(resp => {//登录成功-->
<!--//   //检查登录状态是否成功-->
<!--//-->
<!--//     console.log("login success")-->
<!--//     console.log(resp)-->
<!--//     //登录成功提示-->
<!--//   toast("登录成功",'success')-->
<!--//     // ElNotification({-->
<!--//     //   title: '登录成功',-->
<!--//     //   // message: resp,-->
<!--//     //   type: 'success',-->
<!--//     //   duration: 3000,-->
<!--//     // })-->
<!--//-->
<!--//-->
<!--//   //存储token和关键信息-->
<!--//   // const cookie = useCookies()-->
<!--//   // cookie.set("admin-token", resp.token)-->
<!--//   // setToken(resp.token) //到store index-->
<!--//   // console.log("token:"+resp.data.data.token)-->
<!--//-->
<!--//   // 获取用户信息-->
<!--//   // getInfo().then(resp => {//封装好了-->
<!--//   //   const info = resp-->
<!--//   //       ? {-->
<!--//   //         id: resp.id,-->
<!--//   //         username: resp.username,-->
<!--//   //         avatar: resp.avatar-->
<!--//   //       }-->
<!--//   //       : {id: null, username: '', avatar: ''};-->
<!--//   //   store.commit("SET_USERINFO", info )-->
<!--//   //   console.log(info)-->
<!--//   // })-->
<!--//-->
<!--//   //跳转到后台首页-->
<!--//   router.push('/')-->
<!--//   // console.log(resp)-->
<!--// }).finally(() => {-->
<!--//   console.log("finally")-->
<!--//   loading.value = false;-->
<!--// })-->
