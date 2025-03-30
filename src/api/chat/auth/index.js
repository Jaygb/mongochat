const Router = require('./router');
const Service = require('./service');
const Controller = require('./controller');
const Middleware = require('./middleware');

const service = new Service();

const controller = new Controller(service);
const middleware = new Middleware(service);
const router = new Router(controller);

const userRouter = router.getRouter();

module.exports = {
  router: userRouter,
  authMiddleware: middleware,
};
