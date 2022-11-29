const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  pool: true,
  service: "Naver",
  host: "smtp.naver.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

module.exports = {
  transporter,
};
