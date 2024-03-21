//DATA SEEDER

//IMPORT CERTIFICATION
const Certification = require('../models/certification');
//IMPORT DOTENV TO CONNECT TO DATABASE
const dotenv = require('dotenv');
//IMPORT CONNECTDATABASE
const connectDatabase = require('../config/database');

//IMPORT CERTS YOU WANT TO PUSH
const certifications = require('../data/cert.json');

//SETTING UP DOTENV FILE
dotenv.config({ path: 'backend/config/config.env' });

//CALL CFUNCTION
connectDatabase();

const seedCerts = async () => {
    try {
        //DELETE ALL CERTS IN DATABASE
        await Certification.deleteMany();
        console.log('Certifications have been deleted');

        //INSERT IMPORTED CERTIFICATIONS
        await Certification.insertMany(certifications);
        console.log('All Certifications have been added');

        process.exit();
        
    }catch(error){
        console.log(error.message);
        process.exit();
    }
}
//CALL FUNCTION WHEN RUNNING FILE
seedCerts();
