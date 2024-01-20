const User = require("../models/userModel");
const ResetPassword = require("../models/resetPasswordModel");
const authMiddleware = require("../middleware/authMiddleware");
const nodemailer = require('nodemailer');
const uuid = require("uuid");

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_EMAIL_PASSWORD,
  },
});

const filterSensitiveFields = (user) => {
  const sensitiveFields = ['_id', 'password', 'createdAt', 'email', 'updatedAt'];
  const filteredUser = { ...user._doc };
  sensitiveFields.forEach((field) => {
    if (filteredUser[field]) {
      delete filteredUser[field];
    }
  });

  return filteredUser;
};

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send('Invalid data');
    }
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("A user with that email has already been registered!");
    }
    let passwordDigest = await authMiddleware.hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: passwordDigest,
    });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw error;
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Invalid data');
    }
    const user = await User.findOne({ email });
    if (user) {
      let passwordMatched = await authMiddleware.comparePassword(user.password, password);
      if (passwordMatched) {
        let payload = {
          id: user._id,
          email: user.email,
        };
        let token = authMiddleware.createToken(payload);
        return res.status(200).json({ token });
      }
      res.status(401).send("Invalid credentials");
    }
    else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const SendResetEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send('Invalid data');
    }
    const user = await User.findOne({ email });
    if (user) {
      await ResetPassword.deleteMany({ user: user._id });
      const resetId = uuid.v4();
      const resetIdSaved = await ResetPassword.create({
        user: user._id,
        uniqueId: resetId
      });
      if (resetIdSaved) {
        const clientURL = req.get('Origin');
        resetURL = clientURL + `/reset-password/${resetId}`;
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: 'Email to Reset Password!',
          text: `This is the link to reset your password.\n${resetURL}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(500).send('Error sending email');
          }
          console.log('Email sent:', info.response);
          res.status(200).send('Email sent successfully');
        });
      }
      else {
        res.status(500).send("Error in generating reset link");
      }
    }
    else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const ResetUserPassword = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).send('Invalid data');
    }
    const resetPassword = await ResetPassword.findOne({ uniqueId }).populate('user');
    if (resetPassword) {
      const userId = resetPassword.user._id;
      let passwordDigest = await authMiddleware.hashPassword(newPassword);
      const user = await User.findByIdAndUpdate(userId, {
        password: passwordDigest,
      });
      await ResetPassword.findByIdAndDelete(resetPassword._id);
      return res.status(200).send("Password updated successfully");
    }
    else {
      return res.status(401).send('Invalid reset link');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const GetUserInfo = async (req, res) => {
  try {
    const userId = res.locals.payload.id;
    let user = await User.findById(userId);
    if (user) {
      const filteredUser = filterSensitiveFields(user);
      res.status(200).json({ user: filteredUser });
    }
    else {
      return res.status(404).send('User not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const UpdateUser = async (req, res) => {
  try {
    const userId = res.locals.payload.id;
    const { userName } = req.body;
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      if (existingUser._id.toString() !== userId) {
        return res.status(400).send('Username already taken');
      }
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );
    if (updatedUser) {
      res.status(200).send("User info updated successfully");
    }
    else {
      res.status(400).send("Unable to update Info");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  Login,
  SendResetEmail,
  ResetUserPassword,
  Register,
  GetUserInfo,
  UpdateUser,
};
