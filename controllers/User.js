const Todo = require("../model/Todo");
const User = require("../model/User");

const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
    });
    const result = await user.save();
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    await Todo.findOneAndUpdate(
      { _id: req.params.userID },
      {
        $set: {
          name: req.body.name,
        },
      },
      { new: true }
    );
    res.json({ message: "User Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// delete user and user's todo
const deleteUser = async (req, res) => {
  try {
    record = await User.findById({ _id: req.params.userID }).exec();
    if (record) {
      await User.deleteOne({ _id: req.params.userID });
      await Todo.deleteMany({ userID: req.params.userID });
      res.json({ message: "User and User's Todo Deleted" });
    } else {
      res.json({ message: "Invalid id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
