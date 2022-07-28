const {
  searchMusics,
  playlistDetail,
} = require("../thirdpart/neteaseMusicApi");

/**
 * 获取单首音乐
 * @param keywords
 */
async function getSingleMusic(keywords) {
  const songs = await searchMusics(keywords, 1);
  if (songs.length < 1) {
    return null;
  }
  return songs[0];
}

/**
 * 获取歌单详情
 * @returns {Promise<ITrackElement>}
 */
async function getPlaylistDetail() {
  return await playlistDetail();
}

module.exports = {
  getSingleMusic,
  getPlaylistDetail,
};
