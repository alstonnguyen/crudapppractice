const Task = require('./model.js');

const controller = {};

controller.addTask = async (req, res, next) => {
  try {
    const inputTask = req.body;
    // console.log(inputTask);

    const addedTask = await Task.create({ input: inputTask.message });
    // console.log(addedTask);
    res.locals.addTask = addedTask;
    return next();
  } catch (error) {
    return next({
      log: 'Error from controller.addTask',
      message: { error: 'Error trouble adding Task' },
    });
  }
};

controller.getTasks = async (req, res, next) => {
  try {
    const getTasks = await Task.find({});
    res.locals.getTasks = getTasks;
    return next();
  } catch (error) {
    return next({
      log: 'Error on the controller.getTasks',
      message: { error: 'Error getting all tasks :(' },
    });
  }
};

controller.deleteTask = async (req, res, next) => {
  console.log('~~~~~Entering controller.deleteTask~~~~~~~~');
  try {
    const { input } = req.body;
    console.log('Trying to delete with input: ' + input);
    const result = await Task.findOneAndDelete({ input });
    console.log('Deleted: ' + JSON.stringify(result));

    // Set the status based on what we received
    // if (!result) res.locals.status = 404;
    // else res.locals.status = 200;

    // An error is occuring
    return next();
  } catch (error) {
    return next({
      log: 'Error on controller.deleteTask',
      message: { error: 'Error delete a task' },
    });
  }
};

module.exports = controller;
