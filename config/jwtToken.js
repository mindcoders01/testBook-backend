require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWt_Secret;

const generateJwtToken = async (reqData) => {
  let token = await jwt.sign(reqData, secret,{expiresIn:process.env.JWT_ACCESS_EXPIRE});
  return token;
};

const verifyJwtToken = async (token) => {
  let decoded = await jwt.verify(token,secret);
  return decoded;
}

module.exports = {generateJwtToken,verifyJwtToken};



