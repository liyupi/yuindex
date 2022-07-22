import { CommandOptionType, CommandType } from "../../../command";

/**
 * 拼接用法字符串
 * @param command
 * @param parentCommand
 */
export const getUsageStr = (
  command: CommandType,
  parentCommand?: CommandType
) => {
  if (!command) {
    return "";
  }
  let str = "";
  if (parentCommand) {
    str = parentCommand.func + " ";
  }
  str += command.func;
  if (command.params && command.params.length > 0) {
    const paramsStrList: string[] = command.params.map((param) => {
      let word = param.key;
      if (param.desc) {
        word = param.desc;
      }
      if (param.required) {
        return `<${word}>`;
      } else {
        return `[${word}]`;
      }
    });
    str += " " + paramsStrList.join(" ");
  }
  if (command.options?.length > 0) {
    const optionStrList: string[] = command.options.map((option) => {
      const optionKey = getOptionKey(option);
      if (option.type === "boolean") {
        let word = optionKey;
        if (option.desc) {
          word += ` ${option.desc}`;
        }
        if (option.required) {
          return `<${word}>`;
        } else {
          return `[${word}]`;
        }
      } else {
        let word = option.key;
        if (option.desc) {
          word = option.desc;
        }
        if (option.required) {
          return `<${optionKey} ${word}>`;
        } else {
          return `[${optionKey} ${word}]`;
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
