const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  /**
   * 查询交易流水
   * @returns {Promise<any|void>}
   */
  async getHandlesByParamsAction() {
    // 查询条件的封装
    const map = {};
    // 与查询
    map['_logic'] = 'and';
    // 交易流水号
    const number = this.get('number');
    if (typeof (number) !== 'undefined') {
      map['number'] = number;
    }
    // 柜员 _id
    const tellersId = this.get('tellersId');
    if (typeof (tellersId) !== 'undefined') {
      map['tellersId'] = tellersId;
    }
    // 最小金额
    const minAmount = this.get('minAmount');
    if (typeof (minAmount) !== 'undefined') {
      map['minAmount'] = ['>=', minAmount];
    }
    // 最大金额
    const maxAmount = this.get('maxAmount');
    if (typeof (maxAmount) !== 'undefined') {
      map['maxAmount'] = ['<=', maxAmount];
    }
    // 交易起始日期
    const startDate = this.get('startDate');
    if (typeof (startDate) !== 'undefined') {
      map['startDate'] = ['>=', startDate];
    }
    // 交易结束日期
    const endDate = this.get('endDate');
    if (typeof (endDate) !== 'undefined') {
      map['endDate'] = ['<=', endDate];
    }
    // 当前页
    const currentPage = this.get('currentPage');
    // 每页显示条数
    const pageSize = this.get('pageSize');

    try {
      const flows = this.mongo('flows');
      // 获取交易流水信息
      const list = await flows.where(map).page(currentPage, pageSize).select();
      return this.success(list, 'get flows success');
    } catch (e) {
      think.logger.error(e);
      return this.fail('failed to get flows');
    }
  }

  /**
   * 获取所有交易流水
   * @returns {Promise<any|void>}
   */
  async getHandlesAction() {
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
};
