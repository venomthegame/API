const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const taskSchema = new Schema({
    title: {type: String, required: true},
    completed: {type: Boolean},
}, {timestamps : true});

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;



