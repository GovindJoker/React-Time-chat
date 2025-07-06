const { register, otpVerification } = require("../controllers/userController");

const router = require("express").Router();



router.post("/Register",register)
router.post("/otpVerification",otpVerification)

module.exports = router;