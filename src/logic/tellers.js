module.exports = class extends think.Logic {
  indexAction() {

  }

  loginAction() {
    this.allowMethods = 'post'; //  只允许 POST 请求类型
    const rules = {
      account: {
        required: true
      },
      password: {
        required: true
      }
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }

  registerAction() {
    this.allowMethods = 'post'; //  只允许 POST 请求类型
    const rules = {
      account: {
        required: true
      },
      name: {
        required: true
      },
      password: {
        required: true
      }
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }
};
