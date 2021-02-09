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
    const arr = [];
    // 交易流水号
    const number = this.get('number');
    if (typeof (number) !== 'undefined') {
      arr.push({'number': number});
    }
    // 柜员 _id
    const tellersId = this.get('tellersId');
    if (typeof (tellersId) !== 'undefined') {
      arr.push({'insertUser': tellersId});
    }
    // 最小金额
    const minAmount = this.get('minAmount');
    if (typeof (minAmount) !== 'undefined') {
      arr.push({'transitionAmount': { $gte: Number(minAmount) }});
    }
    // 最大金额
    const maxAmount = this.get('maxAmount');
    if (typeof (maxAmount) !== 'undefined') {
      arr.push({'transitionAmount': { $lte: Number(maxAmount) }});
    }
    // 交易起始日期
    const startDate = this.get('startDate');
    if (typeof (startDate) !== 'undefined') {
      arr.push({'insertDateTime': { $gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)).getTime() }});
    }
    // 交易结束日期
    const endDate = this.get('endDate');
    if (typeof (endDate) !== 'undefined') {
      arr.push({'insertDateTime': { $lt: new Date(new Date(endDate).setHours(0, 0, 0, 0)).getTime() + 24 * 60 * 60 * 1000 }});
    }
    // 当前页
    const currentPage = this.get('currentPage');
    // 每页显示条数
    const pageSize = this.get('pageSize');

    const where = think.isEmpty(arr) ? arr : {$and: arr};

    try {
      const flows = this.mongo('flows');
      // 获取交易流水信息
      const list = await flows.where(where).page(currentPage, pageSize).select();
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
