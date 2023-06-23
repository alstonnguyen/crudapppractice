//connect DB
//npm install mongoDB
const mongoose = require('mongoose');

const mongo_URI =
  'mongodb+srv://alstonnguyen:codesmith@cluster0.vtuodja.mongodb.net/?retryWrites=true&w=majority';

//connect database
mongoose
  .connect(mongo_URI)
  .then(() => console.log('You are connected'))
  .catch((err) => console.log(err));

//write schemas
//this imports schemas
const { Schema } = mongoose;

const taskSchema = new Schema({
  input: String,
});

module.exports = mongoose.model('Task', taskSchema);
