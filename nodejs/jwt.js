const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

function returnUser(token) {
    console.log(token + "return");
    const user = jwt.verify(token, process.env.SECRET);
    console.log('token user '+user);
    return { email: user.email, password: user.password }
}

function returnToken(user) {
    return jwt.sign(user, process.env.SECRET)
}

module.exports = { returnToken, returnUser }