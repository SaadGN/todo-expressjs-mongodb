const express = require("express")

const {signup,login,verifyOtp , resendOtp} = require("../controllers/user")

const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)
router.post("/verifyOtp", verifyOtp)
router.post("/resendOtp", resendOtp)


module.exports = router;