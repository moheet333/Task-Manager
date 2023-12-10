const taskModel = require("../models/task");
const { asyncWrapper } = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await taskModel.find({});
  res.status(201).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await taskModel.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await taskModel.findOne({ _id: taskID });
  if (!task) {
    // when correct syntax for the id but id not found
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await taskModel.deleteOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await taskModel.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true, // task object = updated object
    runValidators: true, // apply validation to new task
  });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
};
