import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mailOptions = {
  from: process.env.MAILING_USER,
  to: "tadeoantonino98@gmail.com",
  text: "¡Hola! /n Bienvenido a mí aplicación backend",
  subject: "Mailing de Backend-32220",
};

const transportGmail = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.MAILING_USER,
    pass: process.env.MAILING_PASSWORD,
  },
});

async function sendEmail() {
  try {
    const res = await transportGmail.sendMail(mailOptions);
  } catch (error) {
    error(error);
  }
}

sendEmail();
