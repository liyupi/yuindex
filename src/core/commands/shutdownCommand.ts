import { CommandType } from "../../command";

/**
 * 关闭页面命令
 * @author rootwhois
 */
const shutdownCommand: CommandType = {
  func: "shutdown",
  name: "关闭页面",
  alias: ["exit"],
  options: [],
  action(options, terminal): void {
	  terminal.shutdown();
  },
};

export default shutdownCommand;
