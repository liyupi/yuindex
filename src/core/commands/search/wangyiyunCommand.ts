import { CommandType } from "../../command";

/**
 * 网易云搜索命令
 * @author yupi
 */
const wangyiyunCommand: CommandType = {
  func: "wangyiyun",
  alias: [],
  params: [
    {
      key: "word",
      required: true,
    },
  ],
  options: [
    {
      key: "self",
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
