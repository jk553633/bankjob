const jwt = require('jsonwebtoken'); // JWT
const secret = '&w@ueJnXy!Gj0J@qVmMPR^9ip00EP0^Qy5Se#lzwStExJ3Zw4j02NVLm^btjBO8x';

module.exports = class extends think.Service {
  async create(userId) { // 创建令牌
    return jwt.sign(userId, secret);
  }

  parse() { // 令牌验签
    if (think.isEmpty(think.token)) { // 如果token为空
      return null;
    }

    try {
      return jwt.verify(think.token, secret).id;
    } catch (e) {
      think.logger.error(e);
      return null;
    }
  }
};
