const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Booking = require('./models/booking')


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type');
    next();
});


app.get('/bookings', bookings);

app.post('/bookings', createBooking);


async function bookings(req, res) {
    const bookings = await Booking.find({ date: req.query.date, hour: req.query.hour, movie_id: req.query.id }).select('date').select('hour').select('ticket').select('seats');
    console.log('Found bookings:');
    console.log(bookings);
    res.json(bookings);
}

async function createBooking(req, res) {
    const newBooking = new Booking(req.body);
    const result = await newBooking.save();
    console.log('Added new booking');
    res.send(result);
    
}


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@movieapp-yoexw.mongodb.net/${process.env.MONGO_DB}`, { 
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => {
        app.listen(8000);
    })
    .catch(err => {
        console.log(err);
    });