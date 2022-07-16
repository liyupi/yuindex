import { CommandType } from "../../command";
import registerCommand from "./subCommands/registerCommand";
import loginCommand from "./subCommands/loginCommand";
import { executeSubCommand } from "../../commandExecutor";

/**
 * 用户命令
 * @author yupi
 */
const userCommand: CommandType = {
  func: "user",
  alias: [],
  params: [
    {
      key: "subCommand",
      required: true,
    },
  ],
  subCommands: {
    login: loginCommand,
    register: registerCommand,
  },
  options: [],
  action(options, terminal) {
    const { _ } = options;
    if (_.length < 1) {
      terminal.writeTextResult("参数不足");
      return;
    }
    let subCommands = this.subCommands;
    if (subCommands) {
      executeSubCommand(subCommands, options, terminal);
    }
  },
};

export default [userCommand];
