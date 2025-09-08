const express = require("express")

const {createTodo , getTodos, deleteTodo, updateTodo} = require("../controllers/todo")

const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/createTodo",auth,createTodo)
router.get("/getTodos",auth,getTodos)
router.delete("/deleteTodo/:id",auth,deleteTodo)
router.put("/updateTodo/:id",auth,updateTodo)
module.exports = router;