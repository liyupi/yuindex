const { cloudsearch } = require("NeteaseCloudMusicApi");

/**
 * 搜索音乐
 * @param keywords 关键词
 * @param limit 分页大小
 * @return {Promise<*[]>}
 */
async function searchMusics(keywords, limit = 10) {
  if (!keywords) {
    return [];
  }
  try {
    const result = await cloudsearch({
      keywords,
      type: 1,
      limit,
    });
    if (result.status !== 200) {
      return [];
    }
    const songs = result.body.result.songs;
    return songs ? songs : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

module.exports = {
  searchMusics,
};
