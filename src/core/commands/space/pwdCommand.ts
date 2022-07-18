import { CommandType } from "../../command";
import { useSpaceStore } from "./spaceStore";

/**
 * 显示当前所在目录
 */
const pwdCommand: CommandType = {
  func: "pwd",
  name: "显示当前空间位置",
  options: [],
  action(options, terminal): void {
    const spaceStore = useSpaceStore();
    const output = `当前目录：${spaceStore.currentDir}`;
    terminal.writeTextResult(output);
  },
};

export default pwdCommand;
