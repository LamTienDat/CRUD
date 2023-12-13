const router = require("express").Router();
const newLocal = "./controllers/Todo";
const newUserService = "./controllers/User";

const { getTodos, createTodo, updateTodo, deleteTodo } = require(newLocal);
const { getUser, createUser, updateUser, deleteUser } = require(newUserService);

router.post("/todos", createTodo);
router.get("/todos", getTodos);
router.put("/todos/:todoID/:userID", updateTodo);
router.delete("/todos/:todoID", deleteTodo);

router.post("/user", createUser);
router.get("/user", getUser);
router.put("/user/:userId", updateUser);
router.delete("/user/:userID", deleteUser);

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

module.exports = router;
