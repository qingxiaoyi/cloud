const Photo = require('../model/photo.model')

class PhotoService{
    // 新建用户
    async createPhoto({fileid,filename,uploadedBy,filedate}){
        // todo: 写入数据库:模型插入
        let done = false
        await Photo.create({
            fileid,
            filename,
            uploadedBy,
            filedate,
        }).then((res)=>{
            done = true
            console.log('图片信息写入数据库成功：',res);
        },(err)=>{
            done = false
            console.log('图片信息写入数据库失败：',err);
        }).catch(e=>{
           done = false
           console.log('图片信息写入数据库异常：',e);
        })
        return done
    }

    async getPhotoList(uploadedBy){
        return await Photo.findAll({where:{uploadedBy}})
    }
}
module.exports = new PhotoService()