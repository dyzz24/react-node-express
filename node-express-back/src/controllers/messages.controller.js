const httpStatus = require("http-status");
// const pick = require("../utils/pick");

const catchAsync = require("../utils/catchAsync");
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

module.exports = {
  createNewTheme,
  getThemes,
};
