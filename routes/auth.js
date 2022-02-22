const router = require("express").Router();

// import auth
const { signin } = require("../middlewares/auth");

//import validator
const { signinVldt } = require("../middlewares/validator/authValidator");

//import controler
const { GetTokenCtrl } = require("../controller/authController");

router.post("/login", signinVldt, signin, GetTokenCtrl);

//this is for development
// router.post("/signup", signUpCtrl);

module.exports = router;
