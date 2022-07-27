import { CommandType } from "../../command";

/**
 * 搜狗搜索命令
 * @author Edmon-Leo
 */
const sogouCommand: CommandType = {
  func: "sogou",
  name: "搜狗搜索",
  alias: ["sg"],
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
    const targetLink = `https://www.sogou.com/web?query=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default sogouCommand;
