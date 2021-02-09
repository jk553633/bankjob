module.exports = class extends think.Controller {
  __before() {
    // 如果当前路由不是'/tellers/login'且不是'/tellers/register'
    if (this.ctx.originalUrl === '/tellers/login' ||
      this.ctx.originalUrl === '/tellers/register') {
      return;
    }
    // 从客户端请求头header中获取发送过来的token,如果没有获取到给think.token赋空值
    think.token = this.ctx.header['Authorization'] || '';
    // 声明一个Token实例来调用token.js里的parse()方法来对token进行验签,通过则返回用户ID，失败返回null
    const Token = this.service('token');
    think.userId = Token.parse();
    if (!think.isNullOrUndefined(think.userId)) { // 如果用户ID为空
      return;
    }

    return this.fail('Please login in first');
  }
};
