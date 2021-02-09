module.exports = class extends think.Logic {
  indexAction() {

  }
  addCompaniesAction() {
    this.allowMethods = 'post'; //  只允许 POST 请求类型
    const rules = {
      companyName: {
        required: true
      },
      abbreviation: {
        required: true
      },
      companyCertificateType: {
        required: true
      },
      companyErtificateNumber: {
        required: true
      },
      longTerm: {
        required: true
      },
      expireTime: {
        required: true
      },
      telephone: {
        required: true
      },
      registerType: {
        required: true
      },
      registerDate: {
        required: true
      },
      registerCurrencyType: {
        required: true
      },
      regiseterCapital: {
        required: true
      },
      organization: {
        required: true
      },
      organizationAddress: {
        required: true
      },
      nationalTaxNumber: {
        required: true
      },
      LocalTaxNumber: {
        required: true
      },
      registerNumber: {
        required: true
      },
      creditCode: {
        required: true
      },
      directorName: {
        required: true
      },
      directorType: {
        required: true
      },
      directorCertificateType: {
        required: true
      },
      directorErtificateNumber: {
        required: true
      },
      phone: {
        required: true
      },
      tellersId: {
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
