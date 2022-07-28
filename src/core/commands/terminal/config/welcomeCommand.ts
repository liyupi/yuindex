import { CommandType } from "../../../command";
import { useTerminalConfigStore } from "./terminalConfigStore";

/**
 * 自定义终端欢迎语
 * @author yupi
 */
const welcomeCommand: CommandType = {
  func: "welcome",
  name: "自定义终端欢迎语",
  alias: [],
  params: [
    {
      key: "texts",
      desc: "终端提示文本（支持多个值，不填则无欢迎语）",
      required: false,
    },
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options;
    let welcomeTexts = _;
    const { setWelcomeTexts } = useTerminalConfigStore();
    setWelcomeTexts(welcomeTexts);
  },
};

export default welcomeCommand;
