import { ParsedOptions } from "getopts";
import TerminalType = YuTerminal.TerminalType;

/**
 * 命令类型
 */
interface CommandType {
  // 功能名称（对应命令英文单词）
  func: string;
  // 功能别名
  alias?: string[];
  // 参数配置
  params?: CommandParamsType[];
  // 选项配置
  options: CommandOptionType[];
  // 子命令
  subCommands?: Record<string, CommandType>;
  // 执行功能
  action: (options: ParsedOptions, terminal: TerminalType) => void;
}

/**
 * 命令参数类型
 */
interface CommandParamsType {
  key: string; // 参数名
  defaultValue?: string | boolean;
  required?: boolean; // 是否必填
}

/**
 * 命令选项类型
 */
interface CommandOptionType {
  key: string; // 参数名，比如 --word
  alias?: string[]; // 命令简写，比如 -w
  type: "string" | "boolean";
  defaultValue?: string | boolean; // 默认值，标识作用
  required?: boolean; // 是否必填
}
