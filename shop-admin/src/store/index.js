import {createApp} from 'vue'
import {createStore} from 'vuex'
import {getInfo, login} from "~/api/manager.js";
import {removeToken, setToken} from "~/composables/auth.js";

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            //用户信息
            user: {},

            //侧边宽度状态
            asideWidth:"250px",

            menus:[],
            ruleNames:[],

        }
    },
    mutations: {
        SET_USERINFO(state, user) {
            //记录用户信息
            state.user = user;
        },
        // 展开/缩起侧边
        handleAsideWidth(state){
            state.asideWidth = state.asideWidth === "250px" ? "64px" : "250px" //如果是250px 则变成64px 否则变成250px
        },
        SET_MENUS(state, menus) {
            state.menus = menus;
        },
        SET_RULENAMES(state, ruleNames) {
            state.ruleNames = ruleNames;
        }

    },
    actions: {
        //登录
        login({commit}, {name, pwd}) {
            return new Promise((resolve, reject) => {
                login(name, pwd).then(resp => {
                    setToken(resp.token);
                    resolve(resp);
                }).catch(err => reject(err));
            })
        },
        //获取当前登录用户信息
        getInfo({commit}) {
            return new Promise((resolve, reject) => {
                getInfo().then(resp => {
                    // const info = resp
                    //     ? {
                    //         id: resp.id,
                    //         username: resp.username,
                    //         avatar: resp.avatar
                    //     }
                    //     : {id: null, username: '', avatar: ''};
                    // store.commit("SET_USERINFO", info)
                    commit("SET_USERINFO", resp)
                    commit("SET_MENUS", resp.menus)
                    commit("SET_RULENAMES", resp.ruleNames)
                    console.log(resp)
                    // console.log(info)
                    resolve(resp)
                }).catch(err => reject(err));
            })
        },

        //退出登录
        logout({commit}) {
            removeToken()
            //清除用户状态
            commit("SET_USERINFO", {})
        }
    }
})


export {store}