import { ParsedOptions } from "getopts";
import TerminalType = YuTerminal.TerminalType;

/**
 * 命令类型
 */
interface CommandType {
  // 命令英文 key（必须唯一）
  func: string;
  // 命令名称
  name: string;
  // 介绍
  desc?: string;
  // 功能别名
  alias?: string[];
  // 参数配置
  params?: CommandParamsType[];
  // 选项配置
  options: CommandOptionType[];
  // 子命令
  subCommands?: Record<string, CommandType>;
  // 执行功能
  action: (
    options: ParsedOptions,
    terminal: TerminalType,
    parentCommand?: CommandType
  ) => void;
  // 结果是否允许折叠
  collapsible?: boolean;
}

/**
 * 命令参数类型
 */
interface CommandParamsType {
  key: string; // 参数名
  desc?: string; // 描述
  defaultValue?: string | boolean;
  required?: boolean; // 是否必填
}

/**
 * 命令选项类型
 */
interface CommandOptionType {
  key: string; // 参数名，比如 --word
  alias?: string[]; // 命令简写，比如 -w
  desc?: string; // 描述
  type: "string" | "boolean";
  defaultValue?: string | boolean; // 默认值，标识作用
  required?: boolean; // 是否必填
}
