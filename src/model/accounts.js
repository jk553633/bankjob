module.exports = class extends think.Mongo {
  getList() {
    return this.field('name').select();
  }
};
