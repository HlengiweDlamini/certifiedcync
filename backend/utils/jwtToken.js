//CREATE, SEND TOKEN AND SAVE IN THE COOKIE
const sendToken = (user, statusCode, res) => {

    //CREATE JWT TOKEN
    const token = user.getJwtToken();

    //OPTIONS FOR COOKIE
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
    
}
module.exports = sendToken;