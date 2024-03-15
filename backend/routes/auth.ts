import passport from 'passport';
import express from 'express'
// import db from '../config/database'

const router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/login/federated/google', passport.authenticate('google'));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("I RAN AUTH/GOOGLE/CALLBACK")
    // Successful authentication, redirect home.
    res.redirect('/cart');
  });

  module.exports = router;
// router.get('/auth/google/callback',
//   (req,res,next)=>{
//     console.log("I RANNNNNNNNNNNNNNNNNNNN")
//     passport.authenticate('google', { failureRedirect: '/auth/google/error' }, async (error, user , info) => {
//       if (error){
//         return res.send({ message:error.message });
//       }
//       if (user){
//         try {
//           console.log("SUCCESS")
//           //let result = await socialLogin(user.email); 
//           // here your business logic for login user.
//           return res.send({
//             data: res,
//             message:'Login Successful' 
//           });
//         } catch (error) {
//           return res.send({ message: error });
//         }
//       }
//     })(req,res,next);
//   }); 

