import { CommandOptionType, CommandType } from "../../command";

/**
 * 拼接用法字符串
 * @param command
 */
export const getUsageStr = (command: CommandType) => {
  let str = command.func;
  if (command.params && command.params.length > 0) {
    const paramsStrList: string[] = command.params.map((param) => {
      if (param.required) {
        return `<${param.key}>`;
      } else {
        return `[${param.key}]`;
      }
    });
    str += " " + paramsStrList.join(" ");
  }
  if (command.options?.length > 0) {
    const optionStrList: string[] = command.options.map((option) => {
      const optionKey = getOptionKey(option);
      if (option.required) {
        if (option.type === "boolean") {
          return `<${optionKey}>`;
        } else {
          return `<${optionKey} ${option.key}>`;
        }
      } else {
        if (option.type === "boolean") {
          return `[${optionKey}]`;
        } else {
          return `[${optionKey} ${option.key}]`;
        }
      }
    });
    str += " " + optionStrList.join(" ");
  }
  return str;
};

/**
 * 获取选项关键词
 * @param option
 */
export const getOptionKey = (option: CommandOptionType) => {
  // 优先用简写
  if (option.alias && option.alias.length > 0) {
    return "-" + option.alias[0];
  }
  return "--" + option.key;
};

/**
 * 获取选项关键词列表
 * @param option
 */
export const getOptionKeyList = (option: CommandOptionType) => {
  const list = [];
  // 优先用简写
  if (option.alias && option.alias.length > 0) {
    list.push("-" + option.alias[0]);
  }
  list.push("--" + option.key);
  return list;
};
