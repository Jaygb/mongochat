const Router = require('./router');
const Service = require('./service');
const Controller = require('./controller');
const Repo = require('./repo');

const repo = new Repo();
const service = new Service(repo);
const controller = new Controller(service);
const router = new Router(controller);

module.exports = {
  router: router.getRouter(),
};