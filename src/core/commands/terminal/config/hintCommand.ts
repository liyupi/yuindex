import { CommandType } from "../../../command";
import { useTerminalConfigStore } from "./terminalConfigStore";

/**
 * 提示命令
 * @author yupi
 */
const hintCommand: CommandType = {
  func: "hint",
  name: "开关提示",
  desc: "开启 / 关闭输入提示",
  params: [
    {
      key: "switch",
      desc: "开关：on 开启, off 关闭",
      defaultValue: "on",
    },
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options;
    const { setOrToggleShowHint } = useTerminalConfigStore();
    let newHint;
    if (_.length >= 1) {
      if (["on", "off"].includes(_[0])) {
        newHint = _[0];
      }
    }
    const res = setOrToggleShowHint(newHint);
    terminal.writeTextSuccessResult(
      `输入提示已${res ? "开启" : "关闭"}，刷新页面后生效`
    );
  },
};

export default hintCommand;
