const { getRandomBackground } = require("../thirdpart/backgroundApi");
const MyError = require("../exception");
const { THIRD_PART_SERVICE_ERROR_CODE } = require("../exception/errorCode");

/**
 * 随机获取背景
 * @param event
 * @param req
 * @param res
 */
async function getRandomBackgroundApi(event, req, res) {
  const result = await getRandomBackground();
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE);
  }
  return result;
}

module.exports = {
  getRandomBackgroundApi,
};
