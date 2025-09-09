const Todo = require("../models/todo")

//create todo
async function createTodo(req, res) {
    try {
        const { title, description } = req.body;
        if (!title || !title.trim()) {
            return res.status(400).json({ error: "Title is required" })
        }
        const todo = new Todo({
            title,
            description,
            user: req.user.id
        });

        await todo.save();
        return res.status(201).json({ message: "Todo created successfully", todo });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

//get all todos of logged in user
async function getTodos(req, res) {
    try {
        const todos = await Todo.find({ user: req.user.id })
        return res.json({ todos })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function deleteTodo(req, res) {
    try {
        const { id } = req.params
        const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.id })
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" })
        }
        return res.json({ message: "Todo deleted successfully" })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}
async function updateTodo(req, res) {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const todo = await Todo.findOne({ _id: id, user: req.user.id });
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        if (title && title.trim()){
            todo.title = title;
        } else {
            return res.status(400).json({ error: "Title required" }); 
        }
        if (description) todo.description = description;

        await todo.save();
        return res.json({ message: "Todo updated successfully", todo });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


module.exports = {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo
}

