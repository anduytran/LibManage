/* 
    Credit: Net Ninja
    https://www.youtube.com/watch?v=zb3Qk8SG5Ms&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=4
*/

const User = require("../models/user");
const jwt = require('jsonwebtoken')


const handleErrors = (err) => {
        console.log(err.message, err.code);
        let errors = { email: '', password: '' };
    
        // incorrect email
        if (err.message === "incorrect email") {
            errors.email = "That email is not registered"
        }

        // incorrect password
        if (err.message === "incorrect password") {
            errors.password = "That password is incorrect"
        }

        // duplicate email error
        if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
        }
    
        // validation errors
        if (err.message.includes('user validation failed')) {
            Object.values(err.errors).forEach(({ properties }) => {
                errors[properties.path] = properties.message;
            });
        }
    
        return errors;
}
// PRETTY PLEASE, GET THIS SECRET STRING OUT OF THERE BEFORE ANYONE SEES THIS
// id in this case is the content of the signed cookie
const createToken = (id) => {
    return jwt.sign({ id }, 'lib-manage secret', {
        expiresIn: 1800
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

// creates a new user object, and a new token for that user
module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body;
    const userRole = "user"
  
    try {
        const user = await User.create({ name, email, password, userRole });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1800 * 1000 });
        res.status(201).redirect('/home');
        // json({ user:user._id })

    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
   
}

// checks whether the credentials are valid and sends the user a token
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1800 * 1000 });
        
        res.status(200).redirect('/home');
        // .json({ user: user.d_id })
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(404).json({ errors })
    }
}

// gracefully logs out a user by expiring the JWT
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/home');
}