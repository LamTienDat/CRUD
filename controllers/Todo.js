const Todo = require("../model/Todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// create todo by user
const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      userID: req.body.userID,
    });
    const result = await todo.save();
    console.log(result);

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// update
const updateTodo = async (req, res) => {
  try {
    // check user before update
    await Todo.findOneAndUpdate(
      { _id: req.params.todoID, userID: req.params.userID },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          completed: req.body.completed,
        },
      },
      { new: true }
    );
    res.json({ message: "Todo Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    // check user before delete
    record = await Todo.findById({
      _id: req.params.todoID,
      userID: req.params.userID,
    }).exec();
    if (record) {
      await Todo.deleteOne({ _id: req.params.todoID });
      res.json({ message: "Todo Deleted" });
    } else {
      res.json({ message: "Invalid id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
