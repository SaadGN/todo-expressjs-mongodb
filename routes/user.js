const express = require("express")

const {signup,login,verifyOtp} = require("../controllers/user")

const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)
router.post("/verifyOtp", verifyOtp)


module.exports = router;