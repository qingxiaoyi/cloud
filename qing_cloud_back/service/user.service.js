const User = require('../model/user.model')

class UserService{
    // 新建用户
    async createUser({uname,udate}){
        // todo: 写入数据库:模型插入
        let done = false
        await User.create({
            uname,
            udate,
        }).then((res)=>{
            done = true
            console.log('用户创建成功')
        },(err)=>{
            done = false
            console.log('用户创建失败',err);
        }).catch(e=>{
           done = false
        })
        return done
    }

    // 查询用户
    async selectUser(uname){
        const res = await User.findOne({where:{uname}}).catch(e=>{
            console.log('查询用户失败',e)
            return null
        })
        return res
    }
}

module.exports = new UserService()