const jwt = require('jsonwebtoken');
const createToken = (userId) => {

    const token = jwt.sign({ userId }, process.env.PRIVATEKEY, {
        expiresIn: '90d'
    })
    return token;
}
module.exports = createToken;
