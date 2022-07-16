import { CommandType } from "../../command";

const baseUrl = "https://www.baidu.com/s";

/**
 * B 站搜索命令
 * @author yupi
 */
const bilibiliCommand: CommandType = {
  func: "bilibili",
  alias: ["bzhan", "bili"],
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
    const targetLink = `https://search.bilibili.com/all?keyword=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default bilibiliCommand;
