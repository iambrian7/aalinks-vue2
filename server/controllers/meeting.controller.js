const Meeting = require('../models/meeting.model.js');

// Create and Save a new meeting
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "meeting content can not be empty"
        });
    }

    // Create a meeting
    const meeting = new Meeting({
        title: req.body.title || "Untitled meeting", 
        content: req.body.content
    });

    // Save meeting in the database
    meeting.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the meeting."
        });
    });
};

// Retrieve and return all meetings from the database.
exports.findAll = (req, res) => {
    console.log(`find all meetings`)
    meeting.find()
    .then(meetings => {
        res.send(meetings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving meetings."
        });
    });
};

// Find a single meeting with a meetingId
exports.findOne = (req, res) => {
  Meeting.findById(req.params.meetingId)
    .then(meeting => {
        if(!meeting) {
            return res.status(404).send({
                message: "meeting not found with id " + req.params.meetingId
            });            
        }
        res.send(meeting);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "meeting not found with id " + req.params.meetingId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving meeting with id " + req.params.meetingId
        });
    });
};

// Update a meeting identified by the meetingId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "meeting content can not be empty"
        });
    }

    // Find meeting and update it with the request body
    Meeting.findByIdAndUpdate(req.params.meetingId, {
        title: req.body.title || "Untitled meeting",
        content: req.body.content
    }, {new: true})
    .then(meeting => {
        if(!meeting) {
            return res.status(404).send({
                message: "meeting not found with id " + req.params.meetingId
            });
        }
        res.send(meeting);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "meeting not found with id " + req.params.meetingId
            });                
        }
        return res.status(500).send({
            message: "Error updating meeting with id " + req.params.meetingId
        });
    });
};

// Delete a meeting with the specified meetingId in the request
exports.delete = (req, res) => {
  Meeting.findByIdAndRemove(req.params.meetingId)
    .then(meeting => {
        if(!meeting) {
            return res.status(404).send({
                message: "meeting not found with id " + req.params.meetingId
            });
        }
        res.send({message: "meeting deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "meeting not found with id " + req.params.meetingId
            });                
        }
        return res.status(500).send({
            message: "Could not delete meeting with id " + req.params.meetingId
        });
    });
};
