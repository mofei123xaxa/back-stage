import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,anyRoutes,asynRoutes,constantRoutes, } from '@/router';

// 引入路由组件
import router from '@/router';

const getDefaultState = () => {
  return {
    token: getToken(),
    // 存储相应的用户名
    name: '',
    //用户头像
    avatar: '',
    //点击按钮的数据
    buttons:[],
    // 路由信息【服务器返回的路由信息，不同的角色返回的信息是不同的】
    router :[],
    //角色信息
    roles :[],
    // 对比之后的【项目中已有的异步路由，与服务器返回的标记信息进行对比】
    resultAsyncRoutes:[],
    // 进行存储最后需要展示的数据
    resultAllRoutes:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  //获取用户登录信息，进行存储
  SET_UESRINFO:(state,userInfo)=>{
    state.name = userInfo.name;
    state.avatar = userInfo.avatar;
    state.buttons = userInfo.buttons;
    state.roles = userInfo.roles;
    state.router = userInfo.router;
  },
  // 进行计算出来的异步路由
  SET_RESULTASYNCROUTES(state,asyncroutes){
    // 这里只是筛选出用户的异步路由需要展示什么
    state.resultAsyncRoutes = asyncroutes;
    //合并其他路由
     state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes,anyRoutes);

     //向路由器中添加新的路由
    router.addRoutes(state.resultAllRoutes);
  }
  }

  const computedAsyncRoutes = (asynRoutes,routes) =>{
    //首先过滤当前的函数
    return asynRoutes.filter(item =>{
      if(routes.indexOf(item.name) != -1){
   
        // 使用递归：因为不止有一级路由 还有二级、三级路由 
         if(item.children&&item.children.length){
            item.children = computedAsyncRoutes(item.children,routes)
         }
        return true;
      }
    })
  }




const actions = {
  // 这个就是在登录页面发送的actiond请求
  async login({ commit }, userInfo) {
    //解构
    const { username, password } = userInfo;
    let resule =  await login({ username: username.trim(), password: password });
    //返回的结果进行判断，是否为成功，一般返回的数据是200，这个是mock的数据；
    if(resule.code == 20000 ){
      //成功以后就进行mutations的进行。
      commit('SET_TOKEN', resule.data.token);
      //同时存储数据
      setToken(resule.data.token);
      //返回一个值为成功
      return 'ok'
    }else{
      //返回不成功
      return Promise.reject(new Error('failure'))
    }
  },

  //用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response


        commit('SET_UESRINFO',data);
        // 
        commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asynRoutes,data.routes));

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

