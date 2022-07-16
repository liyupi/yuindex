import { CommandType } from "../../command";

/**
 * 百度开发者搜索命令
 * @author yupi
 */
const baidudevCommand: CommandType = {
  func: "baidudev",
  alias: ["dev"],
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
    const targetLink = `https://kaifa.baidu.com/searchPage?wd=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default baidudevCommand;
