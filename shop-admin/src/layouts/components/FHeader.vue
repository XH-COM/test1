<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1"><eleme-filled/></el-icon>
      刘晓科技
    </span>
    <el-tooltip
        effect="dark"
        content="折叠"
        placement="bottom"
    >
      <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
        <Fold v-if="$store.state.asideWidth=='250px'"/>
        <Expand v-else/>
      </el-icon>
    </el-tooltip>

    <el-tooltip
        effect="dark"
        content="刷新"
        placement="bottom"
    >
      <el-icon class="icon-btn" @click="handleRefresh">
        <Refresh/>
      </el-icon>
    </el-tooltip>


    <div class="ml-auto flex items-cente">
      <el-tooltip
          effect="dark"
          content="全屏"
          placement="bottom"
      >
        <el-icon class="icon-btn" @click="toggle">   <!--切换全屏 -->
          <full-screen v-if="!isFullscreen"/>
          <aim v-else/>
        </el-icon>
      </el-tooltip>


      <el-dropdown class="dropdown" @command="handleCommand">  <!--监听事件 -->
        <!--        <span class="el-dropdown-link">-->
        <span class="flex items-center text-black-50">
      <el-avatar :size="25" :src="$store.state.user.avatar"></el-avatar>
        {{ $store.state.user.username }}
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>

        <template #dropdown> <!-- 下拉选项 -->
          <el-dropdown-menu>
            <el-dropdown-item command="rePassWord">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>


  <!--  <el-drawer v-model="showDrawer" title="修改密码" size="45%" :close-on-click-modal="false">-->
  <!--    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">-->
  <!--      <el-form-item prop="oldpassword" label="旧密码">-->
  <!--        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item prop="password" label="新密码">-->
  <!--        <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item prop="repassword" label="确认密码">-->
  <!--        <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item>-->
  <!--        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>-->
  <!--      </el-form-item>-->
  <!--    </el-form>-->
  <!--  </el-drawer>-->


  <form-drawer ref="formDrawerRef" title="修改密码" destroy-on-close @submit="onSubmit">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>


<script setup>
import {useCookies} from '@vueuse/integrations/useCookies'// useCookies
import FormDrawer from "~/layouts/components/FormDrawer.vue";
import {ElMessage, ElMessageBox} from 'element-plus' //确认消息提示框
import {showModal, toast} from "~/composables/util.js";
import {logout, updatePassword} from "~/api/manager.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {useFullscreen} from "@vueuse/core";
import {ref, reactive} from "vue";
import {useRePassword,useLogout} from "~/composables/useManager.js";

const {// 是否全屏状态
  isFullscreen,
  // 切换全屏
  toggle
} = useFullscreen()

const {
  formDrawerRef,
  form,
  rules,
  formRef,
  onSubmit,
  openRePassword,
}
=useRePassword()


const {handleLogout}=useLogout()


const router = useRouter()  //跳转路由
const store = useStore()


// 修改密码 显示隐藏

const showDrawer = ref(false)



const loading = ref(false)


const handleCommand = (c) => {
  // console.log(c)
  switch (c) {
    case "logout":
      handleLogout()
      break;
    case "rePassWord":
      // showDrawer.value = true; //修改密码 注释了自己写的表单
      // formDrawerRef.value.open()
        openRePassword()
      // console.log("re 修改密码");
      break;
  }
}
//刷新
const handleRefresh = () => location.reload()

// function handleLogout() {   //退出登录
//   showModal('确认退出登录,继续？').then((resp) => {
//     logout().finally(() => {
//       //清除 cookie
//       //清除当前用户状态 vuex
//       store.dispatch("logout");
//       //跳转回登录页
//       router.push("/login")
//       //提示退出登录成功
//       toast("退出登录成功", 'success');
//     })
//   }).catch(() => {
//     //退出失败不处理
//   })
// }


//组合式API
// function useRePassword(){
//   //修改密码
//   const formDrawerRef = ref(false) //子组件
//   const form = reactive({
//     oldpassword: "",
//     password: "",
//     repassword: ""
//   })
//
//
//   const rules = {
//     oldpassword: [
//       {
//         required: true,
//         message: '旧密码不能为空',
//         trigger: 'blur'
//       },
//     ],
//     password: [
//       {
//         required: true,
//         message: '新密码不能为空',
//         trigger: 'blur'
//       },
//     ],
//     repassword: [
//       {
//         required: true,
//         message: '确认密码不能为空',
//         trigger: 'blur'
//       },
//     ]
//   }
//   const formRef = ref(null)
//
//   const onSubmit = () => {
//     formRef.value.validate((valid) => {
//       if (!valid) {
//         return false
//       }
//       // loading.value = true
//       formDrawerRef.value.showLoading()
//       updatePassword(form)
//           .then(res => {
//             toast("修改密码成功，请重新登录")
//             store.dispatch("logout")
//             // 跳转回登录页
//             router.push("/login")
//           })
//           .finally(() => {
//             formDrawerRef.value.hideLoading()
//           })
//
//     })
//   }
//
//   const openRePassword=()=>{
//     formDrawerRef.value.open()
//   }
//   return{
//     formDrawerRef,
//     form,
//     rules,
//     formRef,
//     onSubmit,
//     openRePassword,
//   }
//
// }

// const cookie = useCookies()
// // console.log("login")
// // console.log(cookie)
// function set() {
//   cookie.set("admin-token", "123456")
// }
//
// function get() {//获取cookie
//   console.log("token：" + cookie.get("admin-token"))
// }
//
// function remove() { //移除 cookie
//   cookie.remove("admin-token")
// }
</script>

<style scoped>

.f-header {
  @apply flex items-center bg-rose-200 text-black-100 fixed top-0 left-0 right-0;
  height: 64px;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>