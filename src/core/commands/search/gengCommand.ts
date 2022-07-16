import { CommandType } from "../../command";

/**
 * 查梗（小鸡词典）命令
 * @author yupi
 */
const gengCommand: CommandType = {
  func: "geng",
  alias: ["xiaoji"],
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
    const targetLink = `https://jikipedia.com/search?phrase=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default gengCommand;
