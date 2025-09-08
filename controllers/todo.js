const Todo = require("../models/todo")

//create todo
async function createTodo(req, res) {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" })
        }
        const todo = new Todo({
            title,
            description,
            user: req, user, id
        });

        await todo.save();
        res.json({ message: "Todo created successfully", todo });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//get all todos of logged in user
async function getTodos(req, res) {
    try {
        const todos = await Todo.find({ user: req.user.id })
        res.json(todos)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createTodo,
    getTodos,

}

