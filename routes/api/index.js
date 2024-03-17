var router = require('express').Router();

if(DEBUG) {
    console.log('ROUTE: /api');
}

router.get('/', (req, res) => {
    res.send('API Home Page');
});

const itemsRouter = require('./items')
router.use('/items', itemsRouter);

module.exports = router;