import {ElMessage, ElMessageBox, ElNotification} from 'element-plus'

import  nprogress from 'nprogress'

//成功提示
export function toast(message, type = "success", dangerouslyUseHTMLString = false) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000,
    })
}


export function showModal(context = "提示内容", type = "warning", title = "确认提示框") {
    return ElMessageBox.confirm(
        context,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: type,
        }
    )
}

// 显示全屏loading
export function showFUllLoading(){
   nprogress.start()
}

// 隐藏全屏loading
export function hideFUllLoading() {
   nprogress.done()
}