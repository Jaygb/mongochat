const Router = require('./router');
const Service = require('./service');
const Controller = require('./controller');

const service = new Service();
const controller = new Controller(service);
const router = new Router();

const userRouter = router.getRouter();

module.exports = {
  router: userRouter
};