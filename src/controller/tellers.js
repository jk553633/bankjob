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
    const map = {};
    // 与查询
    map['_logic'] = 'and';
    // 账号
    map['account'] = this.post('account');
    // 密码
    map['password'] = global.md5(this.post('password'));

    try {
      const tellers = this.mongo('tellers');
      // 检查账户是否已存在
      const res = await tellers.where(map).find();
      if (JSON.stringify(res) === '{}') {
        return this.fail('Incorrect username or password', res);
      }
      return this.success(res, 'login success');
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
    tellersInfo['account'] = this.post('currencyType');
    // 柜员名字
    tellersInfo['name'] = this.post('name');
    // 密码
    tellersInfo['password'] = global.md5(this.post('password'));

    const now = Date.now();

    // 创建者
    tellersInfo['insertUser'] = 'admin';
    // 创建时间
    tellersInfo['insertDateTime'] = now;
    // 更新者
    tellersInfo['updateUser'] = 'admin';
    // 更新时间
    tellersInfo['updateDateTime'] = now;

    try {
      const tellers = this.mongo('tellers');
      // 检查柜员是否已存在
      const res = await tellers.where({passbookNumber: tellersInfo['passbookNumber']}).find();
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
