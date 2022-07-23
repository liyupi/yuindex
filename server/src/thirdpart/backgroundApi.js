const axios = require("axios");

/**
 * 随机获取背景
 * @return {Promise<*[]>}
 */
async function getRandomBackground() {
  const api = "https://api.btstu.cn/sjbz/api.php?lx=dongman&format=json";
  return await axios.get(api).then((res) => res.data.imgurl);
}

module.exports = {
  getRandomBackground,
};
