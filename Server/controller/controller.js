const Todo = require("../models/Todo");

function addTodo(req , res) {
    let {title , desc} = req.body;
    let todo = new Todo({
        title,
        desc
    });
    todo.save().then(() => {
        res.status(200).json({
            message: "Todo added successfully"
        });
    }).catch((err) => {
        console.error(err);
        res.status(500).json({
            message: "Error adding todo"
        });
    });
}
async function listTodo(req , res) {
    let todos  = await Todo.find();
    res.status(200).json(todos);
}
async function updateTodo(req , res) {
    let id = req.params.id;
    let {title , desc} = req.body;
    
    let obj = {
        title,
        desc
    }
    const todo = await Todo.findByIdAndUpdate(id , obj)
    res.status(200).json({
        message: "Todo updated successfully",
        todo
})
}
async function deleteTodo(req , res) {
    let id = req.params.id;
    const todo = await Todo.findByIdAndDelete(id)
    
    res.status(200).json({
        message: "Todo deleted successfully",
        todo
})
}
module.exports = {addTodo , listTodo , updateTodo , deleteTodo};