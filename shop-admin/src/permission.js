//导航守卫

import {router,addRoutes} from "~/router"
import {getToken} from "~/composables/auth.js";
import {store} from './store';
import {
    toast,
    showFUllLoading,
    hideFUllLoading
} from "~/composables/util.js";
// GOOD
router.beforeEach(async (to, from, next) => {
    //显示loading
    showFUllLoading()
    console.log("全局前置守卫");
    console.log(to, from);
    const token = getToken();

    if (!token && to.path != '/login') {
        toast("请先登录", "error")
        return next({path: '/login'})
    }
    //防止重复登录
    if (token && to.path == '/login') {
        toast("您已登录，请勿重复登录", "error")
        return next({path: from.path ? from.path : '/'})
    }

    //如果用户登陆了，自动获取用户信息，并存储在veux中
    let hasNewRoutes = false
    if (token) {
        let {menus}=await store.dispatch("getInfo")
        //动态添加路由
       hasNewRoutes= addRoutes(menus)
    }
    //设置页面的标题
    console.log(to.meta.title)
    let title=(to.meta.title? to.meta.title:"")+"-刘晓科技后台"
    document.title = title

    //手动指定路由
     hasNewRoutes?  next(to.fullPath):next()
})

//全局后置守卫
router.afterEach((to, from) => {
   hideFUllLoading()  //加载完就关闭
})