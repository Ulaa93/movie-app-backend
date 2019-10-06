const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    movie_id: {
        type: Number,
        required:true
    },

    title: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    ticket: {
        type: Number,
        required: false
    },
    seats: [{
        type: String,
        required: true
    }],

    name: {
        type: String,
        required: true,
        minlength: 3
    },
    last_name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        minlength: 3
    }
})

module.exports = mongoose.model('Booking', bookingSchema)