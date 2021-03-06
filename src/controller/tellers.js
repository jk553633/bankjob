const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  /**
   * 登录
   * @returns {Promise<any|void>}
   */
  async loginAction() {
    // 查询条件的封装
    const arr = [];
    // 账号
    arr.push({'account': this.post('account')});
    // 密码
    arr.push({'password': think.md5(this.post('password'))});

    try {
      const tellers = this.mongo('tellers');
      // 检查账户是否已存在
      const res = await tellers.where({ $and: arr }).find();
      if (JSON.stringify(res) === '{}') {
        return this.fail('Incorrect username or password', res);
      }

      // 令牌创建成功，返回给客户端"userInfo"和"token"给前端
      const userInfo = {
        account: res.account,
        name: res.name
      };

      // 实例化一个tokenservice对象，来调用create()方法创建一个token
      const TokenService = this.service('token');
      const token = await TokenService.create(userInfo);
      // 判断token是否创建成功
      if (think.isEmpty(token)) {
        return this.fail('failed to create token');
      }

      return this.success({
        token: token,
        userInfo: userInfo
      }, 'login success');
    } catch (e) {
      think.logger.error(e);
      return this.fail('failed to login');
    }
  }

  /**
   * 注册
   * @returns {Promise<any|void>}
   */
  async registerAction() {
    // 取得信息
    const tellersInfo = {};
    // 账号
    tellersInfo['account'] = this.post('account');
    // 柜员名字
    tellersInfo['name'] = this.post('name');
    // 密码
    tellersInfo['password'] = think.md5(this.post('password'));

    const now = Date.now();

    // 创建者
    tellersInfo['insertUser'] = tellersInfo['name'];
    // 创建时间
    tellersInfo['insertDateTime'] = now;
    // 更新者
    tellersInfo['updateUser'] = tellersInfo['name'];
    // 更新时间
    tellersInfo['updateDateTime'] = now;

    try {
      const tellers = this.mongo('tellers');
      // 检查柜员是否已存在
      const res = await tellers.where({account: tellersInfo['account']}).find();
      if (JSON.stringify(res) !== '{}') {
        return this.fail('The tellers has existed', res);
      }
      // 新增柜员信息
      const tellersId = await tellers.add(tellersInfo);
      return this.success(tellersId, 'register success');
    } catch (e) {
      think.logger.error(e);
      return this.fail('failed to register', tellersInfo);
    }
  }
};
