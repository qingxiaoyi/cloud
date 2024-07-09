import { createRouter, createWebHashHistory } from 'vue-router'

import loginView from '@/components/loginArea.vue'
import homeView from '@/components/homeArea.vue'
import listView from '@/components/listArea.vue'
import {ElMessage} from "element-plus";


const routes = [
  { path: '/', component: loginView,name:'login' },
  { path: '/home', component: homeView },
  { path: '/list', component: listView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const userLoginInfo =  localStorage.getItem('cloudCookie')
  if((userLoginInfo == {} || userLoginInfo == undefined || userLoginInfo == null)
      &&(to.path === '/home' || to.path === '/list')){
    ElMessage.error('请先登录')
    await setTimeout(()=>{},1000)
    return { name: 'login' }
  }else{
    return true
  }
})

export default router