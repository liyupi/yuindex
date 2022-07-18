import { CommandType } from "./command";
import searchCommands from "./commands/search/searchCommands";
import gotoCommand from "./commands/gotoCommand";
import spaceCommands from "./commands/space/spaceCommands";
import dateCommand from "./commands/dateCommand";
import clearCommand from "./commands/terminal/clearCommand";
import historyCommand from "./commands/terminal/historyCommand";
import userCommands from "./commands/user/userCommands";
import timingCommand from "./commands/timing/timingCommand";
import backgroundCommand from "./commands/terminal/config/backgroundCommand";
import resetCommand from "./commands/terminal/config/resetCommand";
import fanyiCommand from "./commands/fanyi/fanyiCommand";
import helpCommand from "./commands/help/helpCommand";
import infoCommand from "./commands/terminal/info/infoCommand";
import pingCommand from "./commands/pingCommand";
import hintCommand from "./commands/terminal/config/hintCommand";

/**
 * 命令列表（数组元素顺序会影响 help 命令的展示顺序）
 */
const commandList: CommandType[] = [
  gotoCommand,
  ...searchCommands,
  ...spaceCommands,
  ...userCommands,
  timingCommand,
  dateCommand,
  clearCommand,
  historyCommand,
  backgroundCommand,
  resetCommand,
  fanyiCommand,
  helpCommand,
  infoCommand,
  pingCommand,
  hintCommand,
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
