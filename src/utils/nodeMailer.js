const nodemailer = require('nodemailer');
const fs = require('fs')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yashbhalani8866@gmail.com',
        pass: 'gchl ngff qpsm wjcl'
    }
});


const fileContents = fs.readFileSync('./src/image/example.txt.jpg', 'base64');

const mailOptions = {
    from: 'yashbhalani8866@gmail.com',
    to: 'yashbhalani007@gmail.com',
    subject: 'Sending message with attachment to Email',
    text: 'Hello NodeMailer with Attachment.',
    attachments: [
      {
        filename: 'example.jpg', 
        content: fileContents,
        encoding: 'base64'
      }
    ]
  };

const sendMail = () => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendMail
};
