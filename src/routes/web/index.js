const express = require('express');
const Home = require('../../controllers/Home');

const router = express.Router();

router.get('/', Home.index);
router.get('/login', Home.login);
router.get('*', function(req, res) {
    res.render('utils/404');
});



module.exports = router;