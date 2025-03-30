const express = require('express');
const chatRouter = require('./chat/router');

const apiRouter = express.Router();

apiRouter.use('/auth', chatRouter);

module.exports = apiRouter;
