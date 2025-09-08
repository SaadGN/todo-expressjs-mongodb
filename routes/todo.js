const express = require("express")

const {createTodo , getTodos} = require("../controllers/todo")

const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/createTodo",auth,createTodo)
router.get("/getTodos",auth,getTodos)

module.exports = router;