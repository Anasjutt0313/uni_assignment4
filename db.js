
const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/fyp_management' 
mongoose.connect(mongoURL)
const db = mongoose.connection 
db.on('connected',()=>{console.log('MongoDB is connected')})
db.on('error', (error) => { console.log('MongoDB connection error:', error); });
db.on('disconnected',()=>{console.log('MongoDB is didconnected')})
module.exports = db

