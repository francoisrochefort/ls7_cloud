
const mongoose = require('mongoose');

const bucketSchema = mongoose.Schema({
    name: { type: String, required: true },
    slotNumber: { type: Number, required: true },
    refWeight: { type: Number, required: true },
    lastCalibration: { type: Date, required: true },
    calibBank1: { type: Number, required: true },
    calibBank2: { type: Number, required: false },
    calibBank3: { type: Number, required: false }
});

module.exports = mongoose.model('Thing', bucketSchema);
