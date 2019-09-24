const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hmve = require('hmve');
const { User } = require('../../../../models');
const respStructure = require('../apiResponse');
const { errorLogger } = require('../../../../config/winston');
const config = require('../../../../config/environment');

const session = async (req, res) => {
  try {
    const { email, password } = req.body.user;
    if (!(email && password)) throw new Error('username/password is invalid');
    const user = await User.findOne({ email }, { email: 1, password: 1, user_role: 1 })
    if (!(user && bcrypt.compareSync(password, user.password))) throw new Error('username/password is invalid');
    const token = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.user_role,
    }, config.jwt_secret_key);
    message = 'Logged in Successfully!!';
    return res.status(201).json(respStructure.responseStructure('POST', { message, user: { email: user.email, userRole: user.user_role }, token }));
  } catch (error) {
    errorLogger({ error });
    return res.status(400).json(respStructure.responseStructure('ERROR', { message: hmve(User, error).message }));
  }
};

module.exports = { session };
