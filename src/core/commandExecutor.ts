import getopts, { ParsedOptions } from "getopts";
import { commandMap } from "./commandData";
import { CommandOptionType, CommandType } from "./command";
import TerminalType = YuTerminal.TerminalType;
import helpCommand from "./commands/help/helpCommand";

/**
 * 执行命令
 * @param text 输入字符串
 * @param terminal 终端
 * @param commands 命令集
 */
export const doCommandExecute = async (
  text: string,
  terminal: TerminalType,
  commands = commandMap
) => {
  if (!text) {
    return;
  }
  // 解析文本，得到命令
  const command: CommandType = getCommand(text, commands);
  if (!command) {
    terminal.writeTextErrorResult("找不到命令");
    return;
  }
  // 解析参数（需传递不同的解析规则）
  const parsedOptions = doParse(text, command.options);
  const { _ } = parsedOptions;
  // 有子命令，执行
  if (
    _.length > 0 &&
    command.subCommands &&
    Object.keys(command.subCommands).length > 0
  ) {
    // 把子命令当做新命令解析，user login xxx => login xxx
    const subText = text.substring(text.indexOf(" ") + 1);
    await doCommandExecute(subText, terminal, command.subCommands);
    return;
  }
  // 执行命令
  await doAction(command, parsedOptions, terminal);
};

/**
 * 获取命令
 * @param text
 * @param commands
 */
const getCommand = (text: string, commands = commandMap): CommandType => {
  const func = text.split(" ", 1)[0];
  const command = commands[func];
  console.log("getCommand = ", command);
  return command;
};

/**
 * 解析参数
 * @param text
 * @param commandOptions
 */
const doParse = (
  text: string,
  commandOptions: CommandOptionType[]
): getopts.ParsedOptions => {
  // 过滤掉关键词
  const args: string[] = text.split(" ").slice(1);
  // 转换
  const options: getopts.Options = {
    alias: {},
    default: {},
    string: [],
    boolean: [],
  };
  commandOptions.forEach((commandOption) => {
    const { alias, key, type, defaultValue } = commandOption;
    if (alias && options.alias) {
      options.alias[key] = alias;
    }
    options[type]?.push(key);
    if (defaultValue && options.default) {
      options.default[key] = defaultValue;
    }
  });
  const parsedOptions = getopts(args, options);
  console.log("parsedOptions = ", parsedOptions);
  return parsedOptions;
};

// 执行
const doAction = async (
  command: CommandType,
  options: ParsedOptions,
  terminal: TerminalType
) => {
  // 设置输出折叠
  if (command.collapsible) {
    terminal.setCommandCollapsible(true);
  }
  const { _, help } = options;
  // 查看帮助
  // e.g. xxx --help => { _: ["xxx"] }
  if (help) {
    const newOptions = { ...options, _: [command.func] };
    helpCommand.action(newOptions, terminal);
    return;
  }
  await command.action(options, terminal);
};
