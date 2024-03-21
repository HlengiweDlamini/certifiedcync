//IMPORT MONGOOSE
const mongoose = require('mongoose');

//CREATE SCHEMA FOR CERTIFICATIONS(DETAILS TO BE DISPLAYED)
const certificationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter certification name'],
        trim: true,
        maxLength: [100, 'Certification name cannot exceed 100 characters']
    },
    organisation: {
        type: String,
        required: [true, 'Please enter the certification organisation']
    },
    description: {
        type: String,
        required: [true, 'Please enter certification description']
    },
    link: {
        type: String,
        required: [true, 'Please paste link to certification website']
    },
    faculty: {
        type: [String],
        required: [true, 'Please select the faculty for this certification'],
        enum: {
            values: ['Engineering','Science'],
            message: 'Please select the correct faculty for this certification'
        }
    }
});

//EXPORT TO BE USED ELSEWHERE
module.exports = mongoose.model('Certification', certificationSchema);