const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

// 创建模型
const User = seq.define('user',{
    uname: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    udate: {
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
})
// 模型同步:强制同步数据库（创建数据表）
// User.sync({force:true}) 

module.exports = User