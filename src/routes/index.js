const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
router.use("/user", userRouter.router);

const dateRouter = require('./dateRouter');
router.use("/date", dateRouter.router);

module.exports = router;