const mongoose = require('mongoose');
const Scheam = mongoose.Schema;

let StaffSchema = new Scheam({
    Name:{
        type:String
    },
    Family_name:{
        type:String
    },
    Position: {
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

module.exports = mongoose.model('Staff', StaffSchema);