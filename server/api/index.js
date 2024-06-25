const express = require('express');
const getAllRouter = require('./users/get-all');
const createRouter = require('./users/create');

const router = express.Router();

/** Set up API endpoints */
router.use('/', getAllRouter);
router.use('/', createRouter);

module.exports = router;
