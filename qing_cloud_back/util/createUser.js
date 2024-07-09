const userService = require('../service/user.service')

// 无注册功能，自定义脚本注册用户
const uname = 'QingCloud'

const getMD5 = require('./getMD5')

userService.createUser({
  uname: getMD5('QingCloud'),
  udate: new Date().toISOString(),
})

module.exports = getMD5Str