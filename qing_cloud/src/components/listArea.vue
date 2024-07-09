<template>
  <div class="listArea">
    <h1>Cloud Atlas</h1>
    <div class="imgList">
        <div class="imgItem" v-for="(item,index) in uploadedImg" :key="item">
          <el-image
              :src="item"
              lazy
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="uploadedImg"
              :initial-index="index"
              fit="cover"
          />
        </div>
    </div>
  </div>
</template>


<script setup name="HomeArea">
import {reactive,onMounted} from "vue";
import api from '@/api/index.js'

let userInfo = reactive({})
let uploadedImg = reactive([])
onMounted(()=>{
  userInfo = JSON.parse(localStorage.getItem('cloudCookie'))
  api.get('/getImages',{
    params:{
      uname:userInfo.uname
    }
  }).then(res=>{
    const imgList = res.data.data
    console.log(imgList)
    imgList.forEach(item=>{
      uploadedImg.push('http://47.95.198.69:3456/'+item.fileid)
    })
  })
})
</script>

<style>
.listArea{
  background-color: #fff;
  width: 80vw;
  margin: 0 auto;
  padding: 5vw;
  border-radius: 5vw;
}
.imgList{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 10px;
}
/*.imgList .imgItem{*/
/*  width: 25vw;*/
/*  height: 25vw;*/
/*}*/
</style>