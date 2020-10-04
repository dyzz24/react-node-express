const httpStatus = require("http-status");
// const pick = require("../utils/pick");

const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { messagesService } = require("../services");

const createNewTheme = catchAsync(async (req, res) => {
  const newTheme = await messagesService.createNewTheme(req.body);
  res.status(httpStatus.CREATED).send(newTheme);
});
const getThemes = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ["name", "role"]);
  // const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await messagesService.queryThemes();
  res.send(result);
});

const addMessage = catchAsync(async (req, res) => {
  const theme = await messagesService.addNewMessage(req.body);
  res.send(theme.messages);
});

const getThemeById = catchAsync(async (req, res) => {
  const theme = await messagesService.getThemeById(req.params.themeId);
  if (!theme) {
    throw new ApiError(httpStatus.NOT_FOUND, "theme not found");
  }
  res.send(theme);
});

const getMessagesForCurrentTheme = catchAsync(async (req, res) => {
  const messages = await messagesService.queryMessages(req.params.themeId);
  if (!messages) {
    throw new ApiError(httpStatus.NOT_FOUND, "messages not found");
  }
  res.send(messages);
});

module.exports = {
  createNewTheme,
  getThemes,
  getThemeById,
  getMessagesForCurrentTheme,
  addMessage,
};
