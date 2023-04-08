import { createTransport } from "nodemailer";
import logger from "../utils/logger.js";

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
    console.log(res);
  } catch (error) {
    logger.error(error);
  }
}

sendEmail();
