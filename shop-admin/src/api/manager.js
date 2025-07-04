import axios from "~/axios.js";

export function login(username, password) {
    return axios.post("/admin/login", {//post请求 admin/login 是后端的接口
        username,
        password
    })
}

export function getInfo() {
    return axios.post("/admin/getInfo")
}

export function logout() {
    return axios.post("/admin/logout")
}

//修改密码
export  function updatePassword(data){
    return axios.post("/admin/updatepassword",data)
}