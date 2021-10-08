const mongoose = require('mongoose');
const Scheam = mongoose.Schema;

let StudentSchema = new Scheam({
    Name:{
        type:String
    },
    Family_name:{
        type:String
    },
    Faculty: {
        type:String
    },
    Department: {
        type:String
    },
    Study_program: {
        type:String
    },
    Subject: {
        type:String
    },
    Address: {
        type:String
    },
    Phone_number: {
        type:String
    },
    Email: {
        type:String
    },
    Jmbg: {
        type:String
    }
});

module.exports = mongoose.model('Student', StudentSchema);