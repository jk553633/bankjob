const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  /**
   * 新增交易流水记录（存取款操作）
   * @returns {Promise<any|void>}
   */
  async addFlowsAction() {
    // 取得信息
    const flowsInfo = {};
    // 币种
    flowsInfo['currencyType'] = this.post('currencyType');
    // 交易金额（包含"+"、"-"）
    flowsInfo['transitionAmount'] = Number(this.post('transitionAmount'));
    // 存折号（卡号）
    flowsInfo['passbookNumber'] = this.post('passbookNumber');

    const now = Date.now();

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
      const res = await accounts.where({passbookNumber: flowsInfo['passbookNumber']}).find();
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

  /**
   * 获取所有个人客户的交易流水
   * @returns {Promise<any|void>}
   */
  async getFlowsAction() {
    // 当前页
    const currentPage = this.get('currentPage');
    // 每页显示条数
    const pageSize = this.get('pageSize');

    try {
      const flows = this.mongo('flows');
      // 获取交易流水信息
      const list = await flows.page(currentPage, pageSize).select();
      return this.success(list, 'get flows success');
    } catch (e) {
      think.logger.error(e);
      return this.fail('failed to get flows');
    }
  }

  /**
   * 根据卡号获取某一个客户的交易流水
   * @returns {Promise<any|void>}
   */
  async getFlowsByPassbookAction() {
    // 存折号（卡号）
    const passbookNumber = this.get('passbookNumber');
    // 当前页
    const currentPage = this.get('currentPage');
    // 每页显示条数
    const pageSize = this.get('pageSize');

    try {
      const flows = this.mongo('flows');
      // 获取交易流水信息
      const list = await flows.where({passbookNumber: passbookNumber}).page(currentPage, pageSize).select();
      return this.success(list, 'get flows success');
    } catch (e) {
      think.logger.error(e);
      return this.fail('failed to get flows');
    }
  }
};
