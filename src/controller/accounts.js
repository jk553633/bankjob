const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  /**
   * 开户（新增个人客户开户信息）
   * @returns {Promise<any|void>}
   */
  async addAccountsAction() {
    // 取得信息
    const accountsInfo = {};
    // 证件类型
    accountsInfo['certificateType'] = this.post('certificateType');
    // 证件号码
    accountsInfo['ertificateNumber'] = this.post('ertificateNumber');
    // 币种
    accountsInfo['currencyType'] = this.post('currencyType');
    // 账户性质
    accountsInfo['nature'] = this.post('nature');
    // 冠字号（人民币上的编码）
    accountsInfo['currencyNumber'] = this.post('currencyNumber');
    // 存折号（卡号）
    accountsInfo['passbookNumber'] = this.post('passbookNumber');
    // 支取频度
    accountsInfo['frequency'] = this.post('frequency');
    // 开户金额
    accountsInfo['openAmount'] = this.post('openAmount');
    // 资金来源
    accountsInfo['amountSource'] = this.post('amountSource');
    // 支取方式
    accountsInfo['checkType'] = this.post('checkType');
    // 密码
    accountsInfo['password'] = this.post('password');
    // 关联柜员_id
    accountsInfo['tellersId'] = this.post('tellersId');

    const now = Date.now();

    // 创建者
    accountsInfo['insertUser'] = think.userInfo.account;
    // 创建时间
    accountsInfo['insertDateTime'] = now;
    // 更新者
    accountsInfo['updateUser'] = think.userInfo.account;
    // 更新时间
    accountsInfo['updateDateTime'] = now;

    // 取得信息
    const flowsInfo = {};
    // 币种
    flowsInfo['currencyType'] = accountsInfo['currencyType'];
    // 交易金额（包含"+"、"-"）
    flowsInfo['transitionAmount'] = Number(accountsInfo['openAmount']);
    // 存折号（卡号）
    flowsInfo['passbookNumber'] = accountsInfo['passbookNumber'];
    // 创建者
    flowsInfo['insertUser'] = think.userInfo.account;
    // 创建时间
    flowsInfo['insertDateTime'] = now;
    // 更新者
    flowsInfo['updateUser'] = think.userInfo.account;
    // 更新时间
    flowsInfo['updateDateTime'] = now;

    try {
      const accounts = this.mongo('accounts');
      // 检查账户是否已存在
      const res = await accounts.where({passbookNumber: accountsInfo['passbookNumber']}).find();
      if (JSON.stringify(res) !== '{}') {
        return this.fail('The accounts has existed', res);
      }
      // 新增账户信息
      const accountsId = await accounts.add(accountsInfo);

      const flows = this.mongo('flows');
      // 新增交易流水信息
      await flows.add(flowsInfo);
      return this.success(accountsId, 'add accounts success');
    } catch (e) {
      think.logger.error(e);
      return this.fail('failed to add accounts', accountsInfo);
    }
  }

  /**
   * 获取所有个人客户开户信息
   * @returns {Promise<any|void>}
   */
  async getAccountsAction() {
    // 当前页
    const currentPage = this.get('currentPage');
    // 每页显示条数
    const pageSize = this.get('pageSize');

    try {
      const accounts = this.mongo('accounts');
      // 获取交易流水信息
      const list = await accounts.page(currentPage, pageSize).select();
      return this.success(list, 'get accounts success');
    } catch (e) {
      think.logger.error(e);
      return this.fail('failed to get accounts');
    }
  }
};
