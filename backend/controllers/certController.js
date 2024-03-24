//HANDLES ALL CONTROLLER FUNCTIONS FOR CERTIFICATIONS

//IMPORT CERTIFICATIONS
const Certification = require("../models/certification");

//IMPORT ERROR HANDLER
const ErrorHandler = require("../utils/errorHandler");

//IMPORT ASYNC ERROR HANDLER
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//IMPORT API FEATURES
const APIFeatures = require('../utils/apiFeatures');

//-------------------------------------FUNCTIONS--------------------------------------

//CREATE NEW CERTIFICATION  THAT GOES TO /API/V1/ADMIN/CERTIFICATION/NEW
exports.newCertification = catchAsyncErrors (async (req, res, next) => {

  req.body.user = req.user.id;
  
  //GET ALL DATA FROM BODY TO CREATE NEW CERT
  const certification = await Certification.create(req.body);

  res.status(201).json({
    success: true,
    certification,
  });
});

//GET ALL CERTS THAT GOES TO API/V1/CERTIFICATIONS
exports.getCerts = catchAsyncErrors (async (req, res, next) => {

  //NUMBER OF CERTS DISPLAYED PER PAGE
  const resPerPage = 4;

  //SHOW TOTAL NUMBER OF CERTS ON FRONTEND
  const certCount = await Certification.countDocuments();

  //SEARCH BY KEYWORD
  const apiFeatures = new APIFeatures(Certification.find(), req.query )
                      .search()
                      .filter()
                      .pagination(resPerPage)

  //GIVES ALL CERTS IN DATABASE
  const certifications = await apiFeatures.query;

  //SET HTTP STATUS CODE OF RESPONSE TO 200, INDICATES SUCCESSFUL RESPONSE
  res.status(200).json({
    //.JSON SENDS JSON RESPONSE BACK TO CLIENT
    success: true, //SUCCESSFUL
    count: certifications.length, //NUMBER OF CERTS
    certCount,
    certifications
  });
});

//GET SINGLE CERT DETAILS THAT GOES TO API/V1/CERTIFICATION/:ID
exports.getSingleCert = catchAsyncErrors (async (req, res, next) => {
  //FINDS CERT USING ITS ID ASSIGNED BY MONGODB
  const certification = await Certification.findById(req.params.id);

  if (!certification) {
    return next(new ErrorHandler("Certification not found", 404));
  }

  //IF CERT IS FOUND
  res.status(200).json({
    success: true,
    certification,
  });
});

//UPDATE CERTIFICATION THAT GOES TO API/V1/ADMIN/CERTIFICATION/:ID
exports.updateCert = catchAsyncErrors (async (req, res, next) => {
  //FIND CERT USING ASSIGNED ID; LET SO ITS REASSIGNABLE
  let certification = await Certification.findById(req.params.id);

  if (!certification) {
    return next(new ErrorHandler("Certification not found", 404));
  }
  //UPDATE IF FOUND WITH REQUESTED BODY
  certification = await Certification.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    certification,
  });
});

//DELETE CERTIFICATION THAT GOES TO API/VI/ADMIN/CERTIFICATION/:ID
exports.deleteCert = catchAsyncErrors (async (req, res, next) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);

    //IF CERT NOT FOUND
    if (!certification) {
      return next(new ErrorHandler("Certification not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Certification has been deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
