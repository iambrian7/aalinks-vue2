const mongoose = require('mongoose');

const MeetingSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Meeting', MeetingSchema);