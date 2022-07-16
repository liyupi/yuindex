import { CommandType } from "../../command";

/**
 * 编程导航搜索命令
 * @author yupi
 */
const codenavCommand: CommandType = {
  func: "codenav",
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
    const targetLink = `https://www.code-nav.cn/resources?q=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default codenavCommand;
