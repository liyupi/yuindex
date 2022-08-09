import { CommandType } from "../../command";
import { useTerminalConfigStore } from "../terminal/config/terminalConfigStore";

const noiseCommand: CommandType = {
  func: "noise",
  name: "样式：增加背景噪音",
  desc: "开启 / 关闭背景噪音",
  options: [],
  action: (_, terminal) => {
    const { toggleShowNoise } = useTerminalConfigStore();
    const res = toggleShowNoise();
    terminal.writeTextSuccessResult(`背景噪音已${res ? "开启" : "关闭"}`);
  },
};

export default noiseCommand;
