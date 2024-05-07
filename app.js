
// mongodb+srv://francoisrochefort1973:FrootFly747@ls7.xmk1zxx.mongodb.net/?retryWrites=true&w=majority&appName=ls7

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Bucket = require('./models/bucket');

mongoose.connect('mongodb+srv://francoisrochefort1973:FrootFly747@ls7.xmk1zxx.mongodb.net/?retryWrites=true&w=majority&appName=ls7')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDb Atlas!!');
        console.error(error);
    });

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// upsert
app.post('/api/ls7', async (req, res, next) => {
  try {
    const existingBucket = await Bucket.findOneAndUpdate(
      { name: req.body.name },
      {
        $set: {
          slotNumber: req.body.slotNumber,
          refWeight: req.body.refWeight,
          lastCalibration: req.body.lastCalibration,
          calibBank1: req.body.calibBank1,
          calibBank2: req.body.calibBank2,
          calibBank3: req.body.calibBank3
        }
      },
      { new: true, upsert: true }
    );

    if (existingBucket) {
      res.status(200).json({ message: 'Bucket updated successfully!' });
    } else {
      res.status(201).json({ message: 'Bucket saved successfully!' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// getByName
app.get('/api/ls7/:name', async (req, res, next) => {
  try {
    const bucket = await Bucket.findOne({ name: req.params.name });
    res.status(200).json(bucket);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// listAll
app.use('/api/ls7', async (req, res, next) => {
  try {
    const buckets = await Bucket.find();
    res.status(200).json(buckets);
  } catch (error) {
    res.status(400).json({
      error: error
    });
  }
});

module.exports = app;