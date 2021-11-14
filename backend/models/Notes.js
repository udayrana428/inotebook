const mongoose = require('mongoose');
const notesSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String},
    tag:{type:String},
    date:{type:Date,default:Date.now}
  });

  module.exports=mongoose.model('notes',notesSchema)