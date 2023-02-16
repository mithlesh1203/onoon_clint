const express = require('express');
const router = express.Router();
const conn = require('../db/conn');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Authentication = require('../middleware/Authentication');

router.get('/', (req, res) => {
  res.send(`Hi Mithlesh from route.js`)
});
// Using promissing


// router.post('/register', (req, res) => {

//   const { name, email, phoneNo, work, password, cPassword } = req.body;

//   if (!name || !email || !phoneNo || !work || !password || !cPassword) {
//     return res.status(422).json({ error: "Please fill all required field" });
//   }

//   User.findOne({ email: email })
//   .then((userExist) => {
//     if (userExist) {
//       return res.status(422).json({ error: "Email alredy Exits" });
//     };
//     const user = new User({
//       name,
//       email,
//       phoneNo,
//       work,
//       password,
//       cPassword
//     });
//     user.save().then(() => {
//       res.status(201).json({
//         message: "User Registation Sucessfully"
//       });
//     }).catch((err) => {
//       console.log("🚀 ~ file: auth.js:36 ~ user.save ~ err", err)
//       res.status(500).json({
//         error: "Faild to  Registation"
//       })
//     }).catch(err => {
//       console.log(err)
//     });
//   });
// });

router.post('/Signup', async (req, res) => {

  const { name, email, phoneNo, work, password, cPassword } = req.body;

  if (!name || !email || !phoneNo || !work || !password || !cPassword) {
    console.error(`"Please fill all required field"`);
    return res.status(422).json({ error: "Please fill all required field" });
  }
  try {
    const registerData = await User.findOne({ email: email })
    if (registerData) {
      console.error(`Email alredy Exits Please use different Email I'D`);
      return res.status(422).json({ error: "Email alredy Exits" });
    };
    const user = new User({
      name,
      email,
      phoneNo,
      work,
      password,
      cPassword
    });
    const userRegister = await user.save();
    if (userRegister) {
      console.info('User Registation Sucessfully')
      res.status(201).json({ message: "User Registation Sucessfully" });
    }

  } catch (err) {
    console.error("🚀 ~ file: auth.js:75 ~ router.post ~ err", err)
    res.status(500).json({ error: "Faild to  Registation" })
  }
});




router.post('/login', async (req, res) => {
  const { email, password, cPassword } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Plase fill the information' })
  }
  try {
    let token;
    const userData = await User.findOne({
      email: email,
    });

    if (userData) {
      const isMatch = Boolean(userData.password === password)
      if (isMatch === true) {
        token = await userData.generateAuthToken();
        res.cookie('jwtoken', token, {
          expires: new Date(Date.now() + 258920000),
          httpOnly: true
        });
        return res.status(200).json({ message: 'user login Sucessfully' })
      } else {
        return res.status(400).json({ message: 'Please enter correct password' })
      }
    } else {
      return res.status(400).json({ message: 'user Not register' })
    }
  } catch (err) {
    res.send(err);
  }
});

// router.get('/About', Authentication, (req, res) => {
//   // const { email, password } = req.body;
//   console.log("🚀 ~ file: UsersAuthentiication.js:87 ~ router.post ~ req.body")
//   console.log("🚀 ~ file: UsersAuthentiication.js:124 ~ router.get ~ hello about")
//   res.send(req.rootUser)


//   const token = req.body.jwt;
// const x = jwt.verify(token, 'dsfklgj', function (err, decoded) {
// if (err) throw err;
// console.log(decoded);
// });
// if (x != true) {
// res.json({ auth: false });
// }else {
// res.json({ auth: true });
// }




// })

module.exports = router;