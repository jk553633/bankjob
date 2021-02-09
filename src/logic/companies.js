module.exports = class extends think.Logic {
  indexAction() {

  }
  addCompaniesAction() {
    this.allowMethods = 'post'; //  只允许 POST 请求类型
    const rules = {
      companyName: {
        required: true
      },
      directorName: {
        required: true
      }
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }
  getCompaniesAction() {
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
  queryCompaniesAction() {
    this.allowMethods = 'post'; //  只允许 POST 请求类型
    const rules = {
      queryValue: {
        required: true
      }
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }
};
