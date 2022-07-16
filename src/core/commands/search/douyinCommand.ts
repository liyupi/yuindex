import { CommandType } from "../../command";

/**
 * 抖音搜索命令
 * @author yupi
 */
const douyinCommand: CommandType = {
  func: "douyin",
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
    const targetLink = `https://www.douyin.com/search/${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default douyinCommand;
