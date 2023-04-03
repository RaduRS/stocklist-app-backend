const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found, please sign in");
  }

  //.Validation
  if (!subject || !message) {
    res.status(400);
    throw new Error("Please fill in the required fields");
  }

  const send_to = process.env.EMAIL_USER;
  const send_from = process.env.EMAIL_USER;
  const reply_to = user.email;

  try {
    await sendEmail(subject, message, send_to, send_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// //.Code that is executing at specific time
// const see = asyncHandler(async (req, res) => {
//   const send_to = process.env.EMAIL_SEND;
//   const send_from = process.env.EMAIL_USER;
//   try {
//     await sendEmail("subject", "merge34", send_to, send_from);
//   } catch (error) {
//     console.log(error);
//   }
// });

// const myInterval = setInterval(() => {
//   let future = new Date("February 28, 2023 10:21:00");
//   let timeElapsed = Date.now();
//   let today = new Date(timeElapsed).getTime();
//   if (today > future.getTime()) {
//     see();
//     stopInterval();
//   } else {
//     console.log("not");
//   }
// }, 1000);

// const stopInterval = () => {
//   clearInterval(myInterval);
// };

module.exports = contactUs;
