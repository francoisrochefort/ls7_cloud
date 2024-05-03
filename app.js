
// mongodb+srv://francoisrochefort1973:FrootFly747@ls7.xmk1zxx.mongodb.net/?retryWrites=true&w=majority&appName=ls7


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

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

  app.post('/api/ls7', (req, res, next) => {
    console.log(req.body);
    res.status(201).json(
        {
            message: 'received a new bucket'
        });
});

app.get('/api/ls7', (req, res, next) => {
    const buckets = [
      {
        _id: '1',
        name: 'BB8',
        slotNumber: 1,
        refWeight: 20000,
        lastCalibration: '2024-01-13',
        calibBank1: '',
        calibBank2: '',
        calibBank3: ''
      },
      {
        _id: '2',
        name: 'C3PO',
        slotNumber: 2,
        refWeight: 10000,
        lastCalibration: '2024-05-03',
        calibBank1: '',
        calibBank2: '',
        calibBank3: ''
      },
    ];
    res.status(200).json(buckets);
  });

module.exports = app;