module.exports = class extends think.Logic {
  indexAction() {

  }
  getHandlesByParamsAction() {
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
  getHandlesAction() {
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
};
