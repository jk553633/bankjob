module.exports = class extends think.Logic {
  indexAction() {

  }
  addFlowsAction() {
    this.allowMethods = 'post'; //  只允许 POST 请求类型
    const rules = {
      currencyType: {
        required: true
      },
      transitionAmount: {
        required: true
      },
      passbookNumber: {
        required: true
      }
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }
  getFlowsAction() {
    this.allowMethods = 'get'; //  只允许 GET 请求类型
    const rules = {
      currentPage: {
        required: true,
        int: true // 需要是 int 型
      },
      pageSize: {
        required: true,
        int: true // 需要是 int 型
      }
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }
  getFlowsByPassbookAction() {
    this.allowMethods = 'get'; //  只允许 GET 请求类型
    const rules = {
      passbookNumber: {
        required: true
      },
      currentPage: {
        required: true,
        int: true // 需要是 int 型
      },
      pageSize: {
        required: true,
        int: true // 需要是 int 型
      }
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }
};
