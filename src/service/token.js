const jwt = require('jsonwebtoken');
const secret = '&w@ueJnXy!Gj0J@qVmMPR^9ip00EP0^Qy5Se#lzwStExJ3Zw4j02NVLm^btjBO8x';

module.exports = class extends think.Service {
  create(userInfo) { // 创建令牌
    return jwt.sign(userInfo, secret, { expiresIn: '2h' });
  }

  parse(token) { // 令牌验签
    if (think.isEmpty(token)) { // 如果token为空
      return null;
    }

    try {
      return jwt.verify(token, secret);
    } catch (e) {
      think.logger.error(e);
      return null;
    }
  }
};
