import { CommandType } from "../../command";

const baseUrl = "https://www.baidu.com/s";

/**
 * B 站搜索命令
 * @author yupi
 */
const bilibiliCommand: CommandType = {
  func: "bilibili",
  name: "bilibili 搜索",
  alias: ["bzhan", "bili"],
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
    const targetLink = `https://search.bilibili.com/all?keyword=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default bilibiliCommand;
