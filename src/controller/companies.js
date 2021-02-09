const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  /**
   * 新增对公企业客户
   * @returns {Promise<any|void>}
   */
  async addCompaniesAction() {
    // 取得信息
    const companiesInfo = {};
    // 企业名称
    companiesInfo['companyName'] = this.post('companyName');
    // 企业简称
    companiesInfo['abbreviation'] = this.post('abbreviation');
    // 企业证件类型
    companiesInfo['companyCertificateType'] = this.post('companyCertificateType');
    // 企业证件号码
    companiesInfo['companyErtificateNumber'] = this.post('companyErtificateNumber');
    // 证件是否长期有效
    companiesInfo['longTerm'] = this.post('longTerm');
    // 证件到期时间
    companiesInfo['expireTime'] = this.post('expireTime');
    // 企业联系方式
    companiesInfo['telephone'] = this.post('telephone');
    // 企业注册类型
    companiesInfo['registerType'] = this.post('registerType');
    // 企业注册日期
    companiesInfo['registerDate'] = this.post('registerDate');
    // 注册资金币种
    companiesInfo['registerCurrencyType'] = this.post('registerCurrencyType');
    // 注册资金
    companiesInfo['regiseterCapital'] = this.post('regiseterCapital');
    // 机构名称
    companiesInfo['organization'] = this.post('organization');
    // 机构地址
    companiesInfo['organizationAddress'] = this.post('organizationAddress');
    // 国税登记证号
    companiesInfo['nationalTaxNumber'] = this.post('nationalTaxNumber');
    // 地税登记证号
    companiesInfo['LocalTaxNumber'] = this.post('LocalTaxNumber');
    // 登记注册号
    companiesInfo['registerNumber'] = this.post('registerNumber');
    // 机构信用代码证
    companiesInfo['creditCode'] = this.post('creditCode');
    // 负责人名称
    companiesInfo['directorName'] = this.post('directorName');
    // 负责人类型
    companiesInfo['directorType'] = this.post('directorType');
    // 负责人证件类型
    companiesInfo['directorCertificateType'] = this.post('directorCertificateType');
    // 负责人证件号码
    companiesInfo['directorErtificateNumber'] = this.post('directorErtificateNumber');
    // 联系方式
    companiesInfo['phone'] = this.post('phone');
    // 关联柜员_id
    companiesInfo['tellersId'] = this.post('tellersId');

    try {
      const companies = this.mongo('companies');
      // 检查企业客户是否已存在
      const res = await companies.where({companyName: companiesInfo['companyName']}).find();
      if (JSON.stringify(res) !== '{}') {
        return this.fail('The companies has existed', res);
      }
      // 新增企业客户信息
      const companiesId = await companies.add(companiesInfo);
      return this.success(companiesId, 'add companies success');
    } catch (e) {
      think.logger.error(e);
      return this.fail('failed to add companies', companiesInfo);
    }
  }

  /**
   * 获取所有企业客户信息
   * @returns {Promise<any|void>}
   */
  async getCompaniesAction() {
    // 当前页
    const currentPage = this.post('currentPage');
    // 每页显示条数
    const pageSize = this.post('pageSize');

    try {
      const companies = this.mongo('companies');
      // 获取交易流水信息
      const list = await companies.page(currentPage, pageSize).select();
      return this.success(list, 'get companies success');
    } catch (e) {
      think.logger.error(e);
      return this.fail('failed to get companies');
    }
  }

  /**
   * 模糊查询企业客户信息
   * @returns {Promise<any|void>}
   */
  async queryCompaniesAction() {
    // 查询数据
    const queryValue = this.post('queryValue');
    // 查询条件的封装
    const map = [];
    map['companyName'] = ['LIKE', '%' + queryValue + '%'];
    map['directorName'] = ['LIKE', '%' + queryValue + '%'];
    map['_logic'] = 'or'; // 或查询

    try {
      const companies = this.mongo('companies');
      // 获取企业客户信息
      // 只能输入企业名称或负责人名称查询
      const list = await companies.where(map).select();
      return this.success(list, 'get companies success');
    } catch (e) {
      think.logger.error(e);
      return this.fail('failed to get companies');
    }
  }
};
