<template>
    <div class="box">
        <div class="left">
            <img src="../assets/1.jpg" alt="">
        </div>
        <div class="right">
            <h1>Cloud Atlas</h1>
            <input type="text" class="inputItem" placeholder="your account" v-model="uname">
            <!-- <input type="password" class="inputItem" placeholder="your password"> -->
            <!-- <a href="#" class="forgetPassword">forget password?</a> -->
            <button class="btn" @click="login">Login</button>
        </div>
    </div>
</template>


<script setup name="LoginArea">
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import api from '@/api/index.js'
import { ElMessage } from 'element-plus'
let uname = ref('')
const router = useRouter();

// 登录
function login(){
  if(uname.value == ''){
    ElMessage({
      message: '用户名不能为空',
      type: 'warning',
    })
    return
  }
  api.post('/login',{uname:uname.value})
      .then(res=>{
        let resData = res.data
        if(resData.code == '200'){
          ElMessage({
            message: '登录成功',
            type: 'success',
          })
          // 存储登录信息
          const cloudCookie = {
            uname:uname.value,
            token: res.data.res.token
          }
          localStorage.setItem('cloudCookie',JSON.stringify(cloudCookie))
          setTimeout(()=>{
            router.push('/home');
          },500)
        }else if(resData.code == '400'){
          ElMessage.error(resData.message)
        }
      },err=>{
        ElMessage.error('登录出现异常：'+err)
      }).catch(e=>{
    console.log(e)
  })
}
</script>

<style scoped>
.box {
    width: 60%;
    height: 450px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .8);
    display: flex;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.left {
    width: 65%;
}

.left>img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.right {
    width: 35%;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 20px;
}

h1 {
    text-align: center;
    padding-top: 45px;
    margin-top: 0;
}

.inputItem {
    height: 44px;
    padding: 0;
    padding-left: 5px;
    border: none;
    background: none;
    outline: none;
    border-bottom: 3px solid #B3A5FC;
    width: 100%;
    font-size: 18px;
    margin-top: 20px;
}

.forgetPassword {
    margin-top: 25px;
    color: #9C3493;
    text-align: right;
    display: block;
}

.btn {
    background: linear-gradient(to right, #65CBF7, #B3A5FC);
    color: #9C3493;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    height: 46px;
    width: 80%;
    font-size: 18px;
    display: block;
    margin: auto;
    margin-top: 30px;
}

/* 适配PC */
@media screen and (min-width:960px) {
    .box {
        max-width: 950px;
        min-width: 750px;
    }
}

/* 适配ipad */
@media screen and (max-width:960px) {
    .box {
        display: block;
        height: auto;
    }

    .left,
    .right {
        width: 100%;
        margin-top: 0;
    }

    .left {
        height: 200px;
    }

    .right {
        padding: 2vw 2vw;
    }

    h1 {
        padding-top: 0;
        margin-bottom: 1vw;
    }

    .inputItem,
    .forgetPassword,
    .btn {
        margin-top: 2vw;
    }
}

/* 适配移动 */
@media screen and (max-width:750px) {
    .box {
        width: 85%;
    }
}
</style>