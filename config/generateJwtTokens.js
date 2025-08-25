const jwt = require('jsonwebtoken')

const generateTokens = async(user)=>{
    const accessToken = await jwt.sign({user},process.env.JWT_SECRET,{expiresIn:process.env.JWT_ACCESS_EXPIRE})
    return accessToken;
}
module.exports = generateTokens;