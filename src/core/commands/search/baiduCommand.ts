import { CommandType } from "../../command";

/**
 * 百度搜索命令
 * @author yupi
 */
const baiduCommand: CommandType = {
  func: "baidu",
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
    const targetLink = `https://www.baidu.com/s?wd=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default baiduCommand;
