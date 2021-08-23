import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

const generateAccessToken = async (data) => {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};

const sendEmail = async ({otp, email}) => {
  const smtpSetting = {
    host: process.env.smtp_host,
    port: process.env.smtp_port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.smtp_user, // generated ethereal user
      pass: process.env.smtp_pass, // generated ethereal password
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
