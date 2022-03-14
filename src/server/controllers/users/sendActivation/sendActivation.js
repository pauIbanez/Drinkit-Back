const jwt = require("jsonwebtoken");
const User = require("../../../../database/models/User");
const sendEmail = require("../../../../utils/email");
const { getActivationEmail } = require("../../../../utils/email/data/mailData");

const sendActivation = async (req) => {
  const { user } = req;

  try {
    const foundUser = await User.findById(user.id);

    const activationToken = jwt.sign(
      { id: foundUser.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "2d",
      }
    );

    const emailData = {
      to: foundUser.info.email,
      html: getActivationEmail(
        foundUser.info.name,
        foundUser.profile.username,
        activationToken
      ),
    };

    await sendEmail(emailData);

    foundUser.activationToken = activationToken;
    foundUser.save();
  } catch (err) {
    if (req.user.isRegister) {
      await User.findByIdAndDelete(req.user.id);
    }
  }
};

module.exports = sendActivation;
