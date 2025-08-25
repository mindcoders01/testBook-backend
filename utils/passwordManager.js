const bcrypt = require("bcrypt");

const createHashedPassword = async (password) => {
  let hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

const verifyPassword = async (password,hashPassword) => {
  let result = await bcrypt.compare(password,hashPassword);
  return result;
}

module.exports = {createHashedPassword,verifyPassword};