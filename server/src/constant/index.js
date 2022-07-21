/**
 * 网站域名
 * @type {string}
 */
const WEB_HOST = "https://yuindex.com";

/**
 * 查询简略用户信息需要的字段
 * @type {{score: boolean, avatarUrl: boolean, nickName: boolean, authority: boolean, _id: boolean}}
 */
const SIMPLE_USER_FIELDS = {
  _id: true,
  nickName: true,
  avatarUrl: true,
  score: true,
  authority: true,
  profile: true,
  gender: true,
  jobStatus: true,
  interests: true,
  title: true,
  _createTime: true,
};

module.exports = {
  SIMPLE_USER_FIELDS,
  WEB_HOST,
};
