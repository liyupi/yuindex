import getopts, { ParsedOptions } from "getopts";
import { commandMap } from "./commandData";
import { CommandOptionType, CommandType } from "./command";
import TerminalType = YuTerminal.TerminalType;
import helpCommand from "./commands/help/helpCommand";

/**
 * 执行命令
 * @param text 输入字符串
 * @param terminal 终端
 */
export const doCommandExecute = async (
  text: string,
  terminal: TerminalType
) => {
  if (!text) {
    return;
  }
  // 解析文本，得到命令
  const command: CommandType = getCommand(text);
  if (!command) {
    terminal.writeTextErrorResult("找不到命令");
    return;
  }
  // 解析参数（需传递不同的解析规则）
  const parsedOptions = doParse(text, command.options);
  // 执行
  await doAction(command, parsedOptions, terminal);
};

/**
 * 获取命令
 * @param text
 */
const getCommand = (text: string): CommandType => {
  const func = text.split(" ", 1)[0];
  const command = commandMap[func];
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
  // 查看帮助
  // e.g. xxx --help => { _: ["xxx"] }
  if (options.help) {
    const newOptions = { ...options, _: [command.func] };
    helpCommand.action(newOptions, terminal);
    return;
  }
  await command.action(options, terminal);
};

/**
 * 执行子命令
 * @param subCommands
 * @param options
 * @param terminal
 */
export const executeSubCommand = (
  subCommands: Record<string, CommandType>,
  options: ParsedOptions,
  terminal: TerminalType
) => {
  const { _ } = options;
  if (_.length < 1 || !subCommands) {
    return;
  }
  const subCommand = subCommands[_[0]];
  if (!subCommand) {
    terminal.writeTextErrorResult("找不到命令");
    return;
  }
  // 选项中移除主命令
  const newOptions = { ...options, _: _.slice(1) };
  subCommand.action(newOptions, terminal);
};
