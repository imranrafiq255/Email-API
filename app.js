const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;
console.log(process.env.MY_EMAIL);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "You successfully accessed the email api of Imran Malik",
  });
});
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "mohammedimranrafique@gmail.com",
    subject: "Contact for hiring",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: error.toString(),
      });
    }
    return res.status(200).json({
      success: true,
      message: "Email sent: " + info.response,
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
