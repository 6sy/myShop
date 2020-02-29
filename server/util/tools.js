const bcrypt = require('bcryptjs')
const tools = {
  // 加密密码
  enbcrypt (password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt)
    return hash + ''
  }
}
module.exports = tools