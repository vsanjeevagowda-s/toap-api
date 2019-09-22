const hmve = require('hmve');
const { User } = require('../../../../models');
const respStructure = require('../apiResponse');
const { errorLogger } = require('../../../../config/winston');

const getUserByToken = async (req, res) => {
  try{
    const {  currentUser } = req;
    const message = 'User listed successfully';
    return res.status(200).json(respStructure.responseStructure('GET', { message,  currentUser }));
  }catch(error){
    errorLogger({ error });
    return res.status(400).json(respStructure.responseStructure('ERROR', { message: hmve(User, error).message }));
  }
}

module.exports = { getUserByToken };