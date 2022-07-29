import { CommandType } from "../../command";

/**
 * 刷新页面命令
 * @author rootwhois
 */
const rebootCommand: CommandType = {
  func: "reboot",
  name: "刷新页面",
  alias: ["restart"],
  options: [],
  action(options, terminal): void {
	  terminal.reboot();
  },
};

export default rebootCommand;
