const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send('using course Api route');
})

module.exports = router;