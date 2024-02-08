const twilio = require('twilio')

const accountSid = 'AC70bf45e9c5671fbf52fc6ab4efeb9e66';
const authToken = '74e133fe0f919191e8618f32ad2fd22c';
const client = twilio(accountSid, authToken);


const sendOtp = async (req, res, next) => {

    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);

    await client.messages
        .create({
            body : otp,
            from: '+16592667642',
            to: req.body.phoneNo
        })
        .then(message => {
            req.session.otp = otp
            next()
        })
        .catch((error) => console.log(error.message) )
}

const verifyOtp = (req, res, next) => {
    if(req.body.otp === req.session.otp) {
        res.status(200).json({
            message: "otp verify sucessfull"
        })
    }else {
        res.status(400).json({
            message: "wrong otp"
        })
    }
}

module.exports = {
    sendOtp,
    verifyOtp
}