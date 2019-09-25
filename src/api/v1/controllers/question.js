const hmve = require('hmve');
const { Test } = require('../../../../models');
const respStructure = require('../apiResponse');
const { errorLogger } = require('../../../../config/winston');

const create = async (req, res) => {
  try{
    const { question } = req.body;
    const { id } = req.params;
    const test = await Test.update({_id: id}, { $push: { questions: question } });
    const message = 'Questions saved successfully';
    return res.status(201).json(respStructure.responseStructure('POST', { message, test }));
  }catch(error){
    errorLogger({ error });
    return res.status(400).json(respStructure.responseStructure('ERROR', { message: hmve(Test, error).message }));
  }
};

const list = async (req, res) => {
  try{
    const { id } = req.params;
    const test = await Test.findById(id);
    const message = 'Questions listed successfully';
    return res.status(201).json(respStructure.responseStructure('POST', { message, questions: test.questions }));
  }catch(error){
    errorLogger({ error });
    return res.status(400).json(respStructure.responseStructure('ERROR', { message: hmve(Test, error).message }));
  }
};

module.exports = { create, list };