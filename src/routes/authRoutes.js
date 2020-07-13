const express = require('express');
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getMe,
  updateMe,
  updateMyPassword,
  deleteMe,
} = require('../controllers/authController');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Routes below will go through isAuth middleware first
router.use(isAuth);

router.get('/me', getMe);
router.patch('/updateMe', updateMe);
router.patch('/updateMyPassword', updateMyPassword);
router.delete('/deleteMe', deleteMe);

module.exports = router;
