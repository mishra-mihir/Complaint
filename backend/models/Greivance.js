const mongoose = require('mongoose');
const shortId = require('shortid');

complaintSchema = new mongoose.Schema({
    complaint: [{
        _id: {
            type: String,
            default: shortId.generate
        },
        greivanceType: {
            type: String,
            required: true
        },
        Subject: {
            type: String,
            required: true
        },
        Description: {
            type: String,
            required: true
        },

        Status: {
            type: String,
            default: "Open"
        },
        Date: {
            type: Date,
            default: Date.now
        },
    }]
})

greivanceModel = new mongoose.model('complaint', complaintSchema);

module.exports = greivanceModel;