const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

// 创建模型
const Photo = seq.define('photo',{
    fileid: {
        type:DataTypes.STRING,
        allowNull: false
    },
    filename: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    uploadedBy:{
        type:DataTypes.STRING,
        allowNull: false
    },
    filedate: {
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
})
// 模型同步:强制同步数据库（创建数据表）
// Photo.sync({force:true})
module.exports = Photo