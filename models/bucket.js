
const mongoose = require('mongoose');

const bucketSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slotNumber: { type: Number, required: true },
    refWeight: { type: Number, required: true },
    lastCalibration: { type: String, required: true },
    calibBank1: { type: String, required: true },
    calibBank2: { type: String, required: false },
    calibBank3: { type: String, required: false }
});

module.exports = mongoose.model('Bucket', bucketSchema);
