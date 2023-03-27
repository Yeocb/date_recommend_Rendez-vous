const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
router.use("/user", userRouter.router);

const dateRouter = require('./dateRouter');
router.use("/date", dateRouter.router);

const reviewRouter = require('./reviewRouter');
router.use("/review", reviewRouter.router);

const likeRouter = require('./likeRouter');
router.use("/like", likeRouter.router);

const expRouter = require('./expRouter');
router.use("/exp", expRouter.router);

module.exports = router;