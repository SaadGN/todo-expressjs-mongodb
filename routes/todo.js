const express = require("express")

const {createTodo , getTodos, deleteTodo, updateTodo} = require("../controllers/todo")

const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/todo",auth,createTodo)
router.get("/todo",auth,getTodos)
router.delete("/todo/:id",auth,deleteTodo)
router.put("/todo/:id",auth,updateTodo)
module.exports = router;