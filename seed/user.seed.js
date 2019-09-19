// import { User } from '../models';
const { User } = require('../models');
const { errorLogger } = require('../config/winston');
const createUsers = async () => {
  try {
    const candidate = await User.create({
      email: 'admin@yopmail.com',
      password: '$2a$10$Lv8vjuocUThi58UwRQK12eUawSBAgNXj7EdfHhPxVa77mJ75BeoHm',
      user_role: 1,
    })
    const admin = await User.create({
      email: 'candidate@yopmail.com',
      password: '$2a$10$Lv8vjuocUThi58UwRQK12eUawSBAgNXj7EdfHhPxVa77mJ75BeoHm',
      user_role: 2,
    })
  } catch (error) {
    errorLogger({ error });
  }

}

createUsers()