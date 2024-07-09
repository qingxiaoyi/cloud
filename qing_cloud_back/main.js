const Koa = require('koa')
const Router = require('koa-router')
const { koaBody } = require('koa-body');
const router = new Router()
const app = new Koa()
const static = require('koa-static');

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: 'uploads/', // 设置上传文件的存储路径
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 15 * 1024 * 1024, // 文件大小限制
  }
}))

// 设置静态资源目录
app.use(static(__dirname + '/uploads'));

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello Koa'
  console.log('a request come in the root path')
})


// 登录接口
const user = require('./service/user.service')
const jwt = require('jsonwebtoken')
const getMD5Str = require('./util/getMD5');

router.post('/login', async (ctx,next) => {
  let { uname } = ctx.request.body
  uname = getMD5Str(uname)
  await user.selectUser(uname).then(res=>{
    console.log(res);
    if(res){
      ctx.status = 200
        ctx.body = {
          code: 200,
          message: '登录成功',
          res:{
            token: jwt.sign({uname},'CloudAtlas',{expiresIn: '10m'})
          }
        }
    }else{
      ctx.status = 200
      ctx.body = {
        code: 400,
        message: '该用户不存在',
      }
    }
  },err=>{
    ctx.body = {
      code: 500,
      message: '查询出现异常，登录失败'
    }
  })
})

// 上传图片接口
const photo = require('./service/photo.service')
router.post('/upload', async (ctx,next) => {
  const file = ctx.request.files;
  if (!file) {
    ctx.status = 400;
    ctx.body = { success: false, message: 'upload failed, No file uploaded.' };
    return;
  }else{
    ctx.status = 200;
    ctx.body = { success: true, message: 'File uploaded successfully.' ,data:ctx.request,file}
  }

  const { newFilename, originalFilename, lastModifiedDate } = file.file;
  const {uname} = ctx.request.body

  await photo.createPhoto({
    fileid: newFilename,
    filename: originalFilename,
    uploadedBy: uname,
    filedate: lastModifiedDate
  })
})


//获取已上传图片接口
router.get('/getImages', async (ctx) => {
    const { uname } = ctx.request.query
    await photo.getPhotoList(uname).then(res=>{
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '获取成功',
        data:res
      }
    },err=>{
      ctx.body = {
        code: 500,
        message: '查询出现异常，获取失败'
      } 
    })
})
app.use(router.routes())

app.listen(3456,()=>{
    console.log('server is running at port 3456')
})