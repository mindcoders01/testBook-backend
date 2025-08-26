require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWt_Secret;

const generateJwtToken = async (reqData) => {
  let token = await jwt.sign(reqData, secret);
  return token;
};

const verifyJwtToken = async (reqData) => {
  let token = await jwt.verify(reqData,secret);
  return token;
}

module.exports = {generateJwtToken,verifyJwtToken};
