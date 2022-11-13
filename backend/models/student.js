const mongoose = require('mongoose');


// Defining schema.
const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    acedamicYear: {
        type: String,
        required: true
    },
    Batch: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    // ID_photo: {
    //     data: Buffer,
    //     contentType: String
    // },
    emailId: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }

});

// Creating model.
studentModel = new mongoose.model('student', studentSchema);

module.exports = studentModel;