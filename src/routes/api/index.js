const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth  = require('../../controllers/api/auth');
const chat  = require('../../controllers/api/chat');
const { verifyJWT } = require('../../controllers/api/auth/jwtAuth');

router.use(bodyParser.json());

router.get('/', (req, res, next) => { 
    console.log("Api está OK");
    res.json({
        success: true,
        status: 'ok'
    });
}) 

router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.post('/register', auth.register);

router.post('/all-chat', verifyJWT, chat.getAllChats);
router.post('/active-chats', verifyJWT, chat.getActiveChats);

router.get('*', function(req, res) {
    res.render('utils/404');
});



module.exports = router;