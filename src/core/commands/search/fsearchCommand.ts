import { CommandType } from "../../command";

/**
 * F search 搜索命令
 * @author Edmon-Leo
 */
const fsearchCommand: CommandType = {
  func: "fsearch",
  name: "F搜",
  alias: ["fs", "ff", "fsou"],
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
    const word = _.length > 0 ? _.join(' ') : '';
    const targetLink = `https://fsoufsou.com/search?q=${word?.trim()}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default fsearchCommand;
