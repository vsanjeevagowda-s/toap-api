const hmve = require('hmve');
const { Test, User } = require('../../../../models');
const respStructure = require('../apiResponse');
const { errorLogger } = require('../../../../config/winston');
const { USER_ROLES: { ADMIN, CANDIDATE } } = require('../../../../config/constants');

const create = async (req, res) => {
  try {
    const { title, description, creator_email, time_limit } = req.body.test;
    const user = await User.findOne({ email: creator_email });
    const test = await Test.create({ title, description, creator_id: user, time_limit });
    const message = 'Test created successfully';
    return res.status(201).json(respStructure.responseStructure('POST', { message, test }));
  } catch (error) {
    errorLogger({ error });
    return res.status(400).json(respStructure.responseStructure('ERROR', { message: hmve(Test, error).message }));
  }
};

const list = async (req, res) => {
  try {
    let tests = [];
    const { role, id } = req.currentUser;
    if (role == ADMIN) {
      tests = await Test.find({ creator_id: id });
    } else if (role == CANDIDATE) {
      tests = await Test.find({});
    } else {
      throw new Error('Invalid user!!');
    }
    const message = 'Test listed successfully';
    return res.status(201).json(respStructure.responseStructure('POST', { message, tests }));
  } catch (error) {
    errorLogger({ error });
    return res.status(400).json(respStructure.responseStructure('ERROR', { message: hmve(Test, error).message }));
  }
}

module.exports = { create, list };