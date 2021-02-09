module.exports = class extends think.Logic {
  indexAction() {

  }
  addAccountsAction() {
    this.allowMethods = 'post'; //  只允许 POST 请求类型
  }
};
