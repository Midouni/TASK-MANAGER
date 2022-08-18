const mongoose = require('mongoose')

const schemaTask = mongoose.Schema({
    name : {
        type: String,
        required: [true,'must provide name'],
        trim: true, /* "  name  " => "name" */
        maxlength: [20,'name can not be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('task',schemaTask)