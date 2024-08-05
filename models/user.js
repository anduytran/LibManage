const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
});
// fire a function after doc is saved to db
userSchema.post('save',  function (doc, next) { 


    next();
})

// fire a function before doc is saved to db
userSchema.pre('save', async function(next) { 
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
})


const User = mongoose.model('user', userSchema);

module.exports = User;