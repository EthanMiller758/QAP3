var router = require('express').Router();
const itemsDal = require('../../services/pg.items.dal')

router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/items/ GET ' + req.url);
    try {
        let theItems = await itemsDal.getItems(); 
        res.json(theItems);
    } catch {
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

router.get('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/items/:id GET ' + req.url);
    try {
        let anItem = await loginsDal.getItemByItemId(req.params.id); 
        res.json(anItem);
    } catch {
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

module.exports = router;