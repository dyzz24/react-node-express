// const mongoose = require("mongoose");
const { Messages, User } = require("../models");

const createNewTheme = async (themeObject) => {
  const newTheme = await Messages.create(themeObject);
  const elemInBD = await Messages.findById(newTheme._id);
  elemInBD.createdDate = newTheme.createdAt;
  await elemInBD.save();
  return elemInBD;
};

const addUserFieldsToCurrentObject = async (noFieldsArray) => {
  const users = await User.find({});
  const modifiedData = noFieldsArray.map((data) => {
    const currentUser = users.find((user) => user.id === data.userId);
    return { ...data, userName: currentUser.name || null, id: data._id };
  });
  return modifiedData || [];
};

const queryThemes = async () => {
  // const forum-page = await Messages.paginate(filter, options);
  // await mongoose.model("Messages").remove();
  const themes = await Messages.find({}).lean();
  const modifiedThemesData = addUserFieldsToCurrentObject(themes);
  return modifiedThemesData;
};

const queryMessages = async (id) => {
  const { messages } = await Messages.findById(id);
  return addUserFieldsToCurrentObject(messages);
};

const getThemeById = async (id) => {
  const modifiedTheme = await Messages.findById(id).lean();
  modifiedTheme.id = modifiedTheme._id;
  delete modifiedTheme.messages;
  delete modifiedTheme._id;
  return modifiedTheme;
};

//
// /**
//  * Query for users
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
//  * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//  * @param {number} [options.page] - Current page (default = 1)
//  * @returns {Promise<QueryResult>}
//  */
// const queryUsers = async (filter, options) => {
//   const users = await User.paginate(filter, options);
//   return users;
// };
//
// /**
//  * Get user by id
//  * @param {ObjectId} id
//  * @returns {Promise<User>}
//  */
// const getUserById = async (id) => {
//   return User.findById(id);
// };
//
// /**
//  * Get user by email
//  * @param {string} email
//  * @returns {Promise<User>}
//  */
// const getUserByEmail = async (email) => {
//   return User.findOne({ email });
// };
//
// /**
//  * Update user by id
//  * @param {ObjectId} userId
//  * @param {Object} updateBody
//  * @returns {Promise<User>}
//  */
// const updateUserById = async (userId, updateBody) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
//   Object.assign(user, updateBody);
//   await user.save();
//   return user;
// };
//
// const addNewUserMessage = async (userId, messageBody) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   user.messages.push(messageBody);
//   await user.save();
//   return user;
// };
//
// /**
//  * Delete user by id
//  * @param {ObjectId} userId
//  * @returns {Promise<User>}
//  */
// const deleteUserById = async (userId) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   await user.remove();
//   return user;
// };

module.exports = {
  createNewTheme,
  queryThemes,
  getThemeById,
  queryMessages,
};
