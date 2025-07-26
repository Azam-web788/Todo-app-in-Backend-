const express = require("express")
const { addTodo, listTodo , updateTodo, deleteTodo } = require("../controller/controller")

const router = express.Router()

router.post("/addTodo" , addTodo)
router.get("/listTodo" , listTodo)
router.put("/updateTodo/:id" , updateTodo)
router.delete("/deleteTodo/:id" , deleteTodo)
module.exports = router