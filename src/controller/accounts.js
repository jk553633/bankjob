const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

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

    // 添加
    try {
      const accounts = this.mongo('accounts');
      // 检查管理员是否已存在
      const res = await accounts.where({admin_name: accountsInfo['passbookNumber']}).find();
      if (JSON.stringify(res) !== '{}') {
        return this.fail('The passbookNumber has been registered', res);
      }
      const adminId = await accounts.add(accountsInfo);
      return this.success(adminId, 'add accounts success');
    } catch (e) {
      return this.fail('failed to add accounts', accountsInfo);
    }
  }
};
