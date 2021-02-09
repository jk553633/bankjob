const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  /**
   * 开户（新增个人客户开户信息）
   * @returns {Promise<any|void>}
   */
  async addFlowsAction() {
    // 取得信息
    const flowsInfo = {};
    // 币种
    flowsInfo['currencyType'] = this.post('currencyType');
    // 交易金额（包含"+"、"-"）
    flowsInfo['transitionAmount'] = this.post('transitionAmount');
    // 存折号（卡号）
    flowsInfo['passbookNumber'] = this.post('passbookNumber');

    try {
      const accounts = this.mongo('accounts');
      // 检查账户是否已存在
      const res = await accounts.where({passbookNumber: accountsInfo['passbookNumber']}).find();
      if (JSON.stringify(res) === '{}') {
        return this.fail('The accounts not existed', res);
      }

      const flows = this.mongo('flows');
      // 新增交易流水信息
      const flowsId = await flows.add(flowsInfo);
      return this.success(flowsId, 'add flows success');
    } catch (e) {
      think.logger.error(e);
      return this.fail('failed to add flows', flowsInfo);
    }
  }
};
