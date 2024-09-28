const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  text: String,
  user: String,
  checked: Boolean
});

tareaSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

const task = mongoose.model('task', tareaSchema);

module.exports = task;