const express = require('express');
const auth = require('./auth/index');
const user = require('./user/index');
const chat = require('./chat/index');
const authMiddleware = require('./auth/index');
const user = require('./user/index');
const router = express.Router();

const authRouter = authMiddleware.authMiddleware;

router.use('/auth', auth.router);

router.use('/users', user.router);

const authenticatedRouter = express.Router();
router.use('/u', authRouter.isAuthenticated, authenticatedRouter);

authenticatedRouter.use('/chat', chat.router);

module.exports = router;
