import { CommandType } from "../../../command";
import { useTerminalConfigStore } from "./terminalConfigStore";

/**
 * 提示命令
 * @author HanYiXin
 */
const foregroundCommand: CommandType = {
    func: "color",
    name: "更改命令文字颜色",
    alias: ["color"],
    params: [
      {
        key: "color",
        desc: "需要更改的颜色(默认为白色)",
        required: false,
      },
    ],
    options: [],
    async action(options, terminal) {
        const { setFontColor } = useTerminalConfigStore();
        const { _ } = options;
        const color = _[0] || "white";
        setFontColor(color);
        console.log("Color is:",color)
    },
  };

  export default foregroundCommand;