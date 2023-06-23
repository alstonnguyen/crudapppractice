const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const controller = require('./controller.js');

// Parses incoming request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve html file
app.use(express.static(path.resolve(__dirname, '../')));

app.post('/newtask', controller.addTask, (req, res) => {
  return res.status(200).json(res.locals.addTask);
});

app.get('/gettasks', controller.getTasks, (req, res) => {
  return res.status(200).json(res.locals.getTasks);
});

app.delete('/removetask', controller.deleteTask, (req, res) => {
  return res.sendStatus(200);
});

//different page error handler 404 error
app.use((req, res) => res.status(404).send('404 Error Page not found'));

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    message: {
      err: 'A global error has occurred',
    },
    status: 500,
    log: 'Express handler caught unknown middleware error',
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

//module.exports is an express->node method
module.exports = app;
