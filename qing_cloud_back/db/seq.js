const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('cloud','root','123456',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
// 测试数据库是否连接成功
// sequelize.authenticate().then(()=>{
//     console.log('数据库连接成功');
// }).catch(err=>{
//     console.log('数据库连接失败',err);
// })

module.exports = sequelize



