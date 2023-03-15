const nodemailer = require('nodemailer')

exports. generateOTP = ()=> {
    let otp= ''
    for (let i= 0; i<=3; i++){
      const randVal = math.round(math.random()*9)
      otp = otp + randVal
    }
    return otp;
  }
  exports.mailTranspot = ()=>{
    nodemailer.createTransport ({
       
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USERNAME,
              pass: process.env.MAILTRAP_PASSWORD
            }
          });
    
  }