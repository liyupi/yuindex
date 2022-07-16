import { CommandType } from "./command";
import searchCommands from "./commands/search/searchCommands";
import gotoCommand from "./commands/gotoCommand";
import spaceCommands from "./commands/space/spaceCommands";
import dateCommand from "./commands/dateCommand";
import clearCommand from "./commands/clearCommand";
import historyCommand from "./commands/historyCommand";
import userCommands from "./commands/user/userCommands";

/**
 * 命令列表
 */
const commandList: CommandType[] = [
  ...searchCommands,
  gotoCommand,
  dateCommand,
  clearCommand,
  historyCommand,
  ...spaceCommands,
  ...userCommands,
];

/**
 * 命令字典
 */
const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command;
  command.alias?.forEach((name) => {
    commandMap[name] = command;
  });
});

export { commandList, commandMap };
