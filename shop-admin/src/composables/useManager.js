import {reactive, ref} from "vue";
import {updatePassword, logout} from "~/api/manager.js";
import {showModal, toast} from "~/composables/util.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";


export function useRePassword() {

    const router = useRouter()  //跳转路由
    const store = useStore()
    //修改密码
    const formDrawerRef = ref(false) //子组件
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: ""
    })

    const rules = {
        oldpassword: [
            {
                required: true,
                message: '旧密码不能为空',
                trigger: 'blur'
            },
        ],
        password: [
            {
                required: true,
                message: '新密码不能为空',
                trigger: 'blur'
            },
        ],
        repassword: [
            {
                required: true,
                message: '确认密码不能为空',
                trigger: 'blur'
            },
        ]
    }
    const formRef = ref(null)

    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            // loading.value = true
            formDrawerRef.value.showLoading()
            updatePassword(form)
                .then(res => {
                    toast("修改密码成功，请重新登录")
                    store.dispatch("logout")
                    // 跳转回登录页
                    router.push("/login")
                })
                .finally(() => {
                    formDrawerRef.value.hideLoading()
                })

        })
    }

    const openRePassword = () => {
        formDrawerRef.value.open()
    }
    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePassword,
    }

}

//退出登录
export function useLogout() {   //退出登录
    const router = useRouter()  //跳转路由
    const store = useStore()

    function handleLogout() {

        showModal('确认退出登录,继续？').then((resp) => {
            logout().finally(() => {
                //清除 cookie
                //清除当前用户状态 vuex
                store.dispatch("logout");
                //跳转回登录页
                router.push("/login")
                //提示退出登录成功
                toast("退出登录成功", 'success');
            })
        }).catch(() => {
            //退出失败不处理
        })
    }

    return {
        handleLogout
    }
}