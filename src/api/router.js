const express = require('express');
const chatRouter = require('./chat/router');

const apiRouter = express.Router();

apiRouter.use('/chat', chatRouter);

module.exports = apiRouter;
