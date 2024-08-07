/* 
    Credit: Net Ninja
    https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp
*/

const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

// specifies all the functions for each request type in the router
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;