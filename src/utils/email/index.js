const chalk = require("chalk");
const nodemailer = require("nodemailer");
const debug = require("debug")("drinkit:mailservice");

const { activationSubject } = require("./data/mailData");

const config = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const accountsMail = {
  from: process.env.EMAIL,
  subject: activationSubject,
};

const sendEmail = (mail = {}) =>
  new Promise((resolve, reject) => {
    const emailToSend = { ...accountsMail, ...mail };
    transporter.sendMail(emailToSend, (error) => {
      if (error) {
        reject();
        debug(
          chalk.redBright(
            `Error while sending activation email to ${emailToSend.to}`
          )
        );
        return;
      }
      resolve();
      debug(chalk.yellowBright(`Activation email sent to ${emailToSend.to}`));
    });
  });

module.exports = sendEmail;
