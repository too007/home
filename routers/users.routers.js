const router = require('express').Router();
const userscontroller = require("../contraller/users.contraller");
router.post('/registerUser',userscontroller.register);
router.post('/login',userscontroller.register);


module.exports = router;
