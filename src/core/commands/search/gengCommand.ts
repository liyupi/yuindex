import { CommandType } from "../../command";

/**
 * 查梗（小鸡词典）命令
 * @author yupi
 */
const gengCommand: CommandType = {
  func: "geng",
  name: "梗搜索",
  alias: ["xiaoji"],
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
    const targetLink = `https://jikipedia.com/search?phrase=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default gengCommand;
