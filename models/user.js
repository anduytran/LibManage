/* 
    Credit: Net Ninja
    https://www.youtube.com/watch?v=zb3Qk8SG5Ms&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=4
    https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
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
  },
  userRole: {
    type: String,
    required: false
  },
  checkedItems: {
    type: Array,
    required: false
  }
});

// this function grabs the password input, hashes it,
// ands sends the hash to the db as the pasword
userSchema.pre('save', async function(next) { 
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
})

// static method to login user
userSchema.statics.login = async function(email, plainPassword) {
    const user = await this.findOne({ email: email });
    if (user) {
        const auth = await bcrypt.compare(plainPassword, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email")
}

const User = mongoose.model('user', userSchema);
module.exports = User;