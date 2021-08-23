import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

const generateAccessToken = async (data) => {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};

const sendEmail = async ({otp, email}) => {
  const smtpSetting = {
    host: "email-smtp.us-east-2.amazonaws.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "AKIA2KZBAAHIS7IPYWEA", // generated ethereal user
      pass: "BD8a241aDr2KnMUy454Tfrg/3vEvRqQBo5dUBfSaMCNj", // generated ethereal password
    },
  }

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(smtpSetting);
  const mailOptions = {
    from: 'romesh.30@gmail.com', //from,
    to: email, // to
    subject: "test aws ses", // subject,
    html: `hello world ${otp}`,//html,
    headers: {
      priority: 'hight'
    }
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Email not sent :: ", error);
      // res.send('failed');
    } else {
      console.log('Email sent: ', info.response);
      // res.send('success');
    }
  });
};
export { generateAccessToken, sendEmail };
