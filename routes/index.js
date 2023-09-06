const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
console.log(apiRoutes);


module.exports = router;
