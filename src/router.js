var models = require('./models');
var router = require('express').Router();



router.get('/scores', models.scores.get);

router.post('/scores', models.scores.post);


module.exports = router;
