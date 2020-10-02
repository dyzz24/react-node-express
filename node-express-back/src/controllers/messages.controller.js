import pick from "../utils/pick";

const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { messagesService } = require("../services");

const createNewTheme = catchAsync(async (req, res) => {
  const newTheme = await messagesService.createNewTheme(req.body);
  res.status(httpStatus.CREATED).send(newTheme);
});
const getThemes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await messagesService.queryThemes(filter, options);
  res.send(result);
});

//
// const getUsers = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name', 'role']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await userService.queryUsers(filter, options);
//   res.send(result);
// });
//
// const getUser = catchAsync(async (req, res) => {
//   const user = await userService.getUserById(req.params.userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   res.send(user);
// });
//
// const updateUser = catchAsync(async (req, res) => {
//   const user = await userService.updateUserById(req.params.userId, req.body);
//   res.send(user);
// });
//
// const addNewUserMessage = catchAsync(async (req, res) => {
//   const user = await userService.addNewUserMessage(req.params.userId, req.body);
//   res.send(user);
// });
//
// const deleteUser = catchAsync(async (req, res) => {
//   await userService.deleteUserById(req.params.userId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createNewTheme,
  getThemes,
};
