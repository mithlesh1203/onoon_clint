const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phoneNo: {
    type: Number,
    require: true,
  },
  work: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  cPassword: {
    type: String,
    require: true,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      }
    }
  ]
},{
  collection: 'users'
})

// userSchema.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = bcrypt.hash(this.password, salt);
//   this.password = hashedPassword;
//   this.cPassword = hashedPassword;
//   next()
// })

//Generating tokken
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token: token })
    await this.save();
    return token;
  } catch (err) {
    console.log("🚀 ~ file: userSchema.js:47 ~ err", err)
  
    }
};

const User = mongoose.model('USER', userSchema);

module.exports = User;