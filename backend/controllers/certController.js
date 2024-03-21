//HANDLES ALL CONTROLLER FUNCTIONS FOR CERTIFICATIONS

//IMPORT CERTIFICATIONS
const Certification = require('../models/certification');

//CREATE NEW CERTIFICATION  THAT GOES TO /API/V1/CERTIFICATION/NEW
exports.newCertification = async (req, res, next) => {
    //GET ALL DATA FROM BODY TO CREATE NEW CERT
    const certification = await Certification.create(req.body);

    res.status(201).json({
        success: true,
        certification
    })  
}


//GET ALL CERTS THAT GOES TO API/V1/CERTIFICATIONS
exports.getCerts = async (req, res, next) => {
    //GIVES ALL CERTS IN DATABASE
    const certifications = await Certification.find();

    //SET HTTP STATUS CODE OF RESPONSE TO 200, INDICATES SUCCESSFUL RESPONSE
    res.status(200).json({ //.JSON SENDS JSON RESPONSE BACK TO CLIENT
        success: true, //SUCCESSFUL
        count: certifications.length, //NUMBER OF CERTS
        certifications
    })
}
//GET SINGLE CERT DETAILS THAT GOES TO API/V1/CERTIFICATION/:ID
exports.getSingleCert = async (req, res, next) => {

    //FINDS CERT USING ITS ID ASSIGNED BY MONGODB
    const certification = await Certification.findById(req.params.id);

    if(!certification) {
        return res.status(404).json({
            success: false,
            message: 'Certification not found'
        })
    }
    //IF CERT IS FOUND
    res.status(200).json({
        success: true,
        certification
    })
}