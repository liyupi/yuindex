import { CommandType } from "../../command";

/**
 * 网易云搜索命令
 * @author yupi
 */
const wangyiyunCommand: CommandType = {
  func: "wangyiyun",
  name: "网易云搜索",
  alias: [],
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      key: "self",
      desc: "是否当前页面打开",
      alias: ["s"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  action(options, terminal) {
    const { _, self } = options;
    const word = _.length > 0 ? _[0] : "";
    const targetLink = `https://music.163.com/#/search/m/?s=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default wangyiyunCommand;
