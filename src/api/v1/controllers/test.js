const hmve = require('hmve');
const { Test, User } = require('../../../../models');
const respStructure = require('../apiResponse');
const { errorLogger } = require('../../../../config/winston');

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
    const tests = await Test.find({creator_id: req.currentUser.id});
    const message = 'Test listed successfully';
    return res.status(201).json(respStructure.responseStructure('POST', { message, tests }));
  } catch (error) {
    errorLogger({ error });
    return res.status(400).json(respStructure.responseStructure('ERROR', { message: hmve(Test, error).message }));
  }
}

module.exports = { create, list };