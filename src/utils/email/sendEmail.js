/* eslint-disable no-console */
const {
  createTransport,
  getTestMessageUrl,
  createTestAccount,
} = require('nodemailer');
const colors = require('colors');

const sendEmail = async (user, subject, text, html) => {
  const isProduction = process.env.NODE_ENV === 'production';

  const testAccount = await createTestAccount();

  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: isProduction,
    auth: {
      user: process.env.EMAIL_USERNAME || testAccount.user,
      pass: process.env.EMAIL_PASSWORD || testAccount.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.verify((error) =>
    error
      ? console.error(colors.red('Error: '), error)
      : console.log(colors.yellow('Server is ready to take our messages'))
  );

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'test-template@test.com',
    to: user.email,
    subject,
    html,
    text,
  });

  console.log(colors.yellow('Message sent: %s'), info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  if (!isProduction) {
    // // Preview only available when sending through an Ethereal account
    console.log(colors.cyan('Preview URL: %s'), getTestMessageUrl(info));
  }
};

const sendWelcomeEmail = async (user, subject = 'Welcome to Our Family') => {
  const text = `Hi ${user.email}, 
  Welcome to our family, we're glad to have you 🎉🙏`;
  await sendEmail(user, subject, text);
};

const sendPasswordResetEmail = async (
  user,
  url,
  subject = 'Your password reset token (valid for only 10 minutes)'
) => {
  const text = `Hi ${user.email}
  Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${url}`;
  await sendEmail(user, subject, text);
};

module.exports = { sendWelcomeEmail, sendPasswordResetEmail };
