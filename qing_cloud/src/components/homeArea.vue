<template>
  <div class="home-area">
    <h1>Cloud Atlas</h1>

    <el-upload class="upload" 
      drag 
      action="http://127.0.0.1:5173/cloud/upload"
      multiple
      :data={uname}
      with-credentials:true
      :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 10Mb
        </div>
      </template>
    </el-upload>

    <el-divider content-position="center" class="divider"> {{ uname }}</el-divider>

    <ul class="uploadedlist">
      <li v-for="(item,index) in uploadedImg" :key=index>
        <el-text class="mx-1" type="primary">||{{ item.originalFilename }}||</el-text>
        <el-text class="mx-1" >上传成功，点击</el-text>
        <el-link @click="pasteLink(item.newFilename)" type="primary">复制链接</el-link>
      </li>
    </ul>

  </div>
</template>
<script setup name="homeArea">
import { UploadFilled  } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive,onMounted,ref  } from 'vue'

let userInfo = reactive({})
let uploadedImg = reactive([])
let uname = ref('')
onMounted(()=>{
  userInfo = JSON.parse(localStorage.getItem('cloudCookie'))
  uname.value = userInfo.uname
})

function handleAvatarSuccess (response,uploadFile) {
  const {originalFilename,newFilename} = response.file.file
  uploadedImg.push({originalFilename,newFilename})
}
function beforeAvatarUpload(rawFile) {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('Avatar picture size can not exceed 10MB!')
    return false
  }
  return true
}

function pasteLink(newFilename){
  const fullLink = 'http://127.0.0.1:3456/'+newFilename
  try {
    navigator.clipboard.writeText(fullLink)
    ElMessage({
      message: '已复制到粘贴板',
      type: 'success',
    })
  }catch (e) {
    console.log(e)
  }
}

</script>

<style scoped>
.home-area {
  background-color: #fff;
  width: 80vw;
  margin: 0 auto;
  padding: 5vw;
  border-radius: 5vw;
}
.divider{
  margin: 8vh 0 5vh 0;
}
.uploadedlist li{
  list-style: none;
}
</style>