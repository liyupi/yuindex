import { CommandType } from "../../command";

/**
 * DuckDuckGo 搜索命令
 * @author Edmon-Leo
 */
const duckduckgoCommand: CommandType = {
  func: "duckduckgo",
  name: "DuckDuckGo搜索",
  alias: ["ddg", "duck"],
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
    const targetLink = `https://duckduckgo.com/?q=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default duckduckgoCommand;
