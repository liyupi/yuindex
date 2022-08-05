import { ref } from "vue";
import { getUsageStr } from "../../core/commands/terminal/help/helpUtils";
import { commandMap } from "../../core/commandRegister";
import _, { trim } from "lodash";
import { useTerminalConfigStore } from "../../core/commands/terminal/config/terminalConfigStore";

/**
 * 命令提示功能
 * @author yupi
 */
const useHint = () => {
  const hint = ref("");
  const { showHint } = useTerminalConfigStore();

  const setHint = (inputText: string) => {
    // 未开启提示
    if (!showHint) {
      return;
    }
    if (!inputText) {
      hint.value = "";
      return;
    }
    const originArgs = trim(inputText).split(" ");
    let args: string[] = []
    // 处理空格
    for (let index = 0; originArgs[index]; index++) {
      const arg = originArgs[index];
      if (arg[0] == "\"" || arg[0] == "'") {
        let end = "";
        const _index = index;
        for (let i = index; originArgs[i]; i++){
          const arg = originArgs[i];
          if (arg[arg.length] == "\"" || arg[arg.length] == "'") {
            end = end + (i == _index? "" : " ") + arg.slice(0, arg.length - 1);
            break;
          }
          else {
            end = end + (i == _index? "" : " ") + arg;
          }
          index++
        }
        if (end[end.length - 1] == "\"" || end[end.length - 1] == "'") {
          end = end.substring(0, end.length - 1)
        }
        args.push(end.substring(1, end.length + 1));
      }
      else {
        args.push(arg);
      }
    }
    // 大小写无关
    const func = args[0].toLowerCase();
    // 前缀匹配
    const likeKey = Object.keys(commandMap).filter((key) =>
      key.startsWith(func)
    )[0];
    let command = commandMap[likeKey];
    if (!command) {
      hint.value = "";
      return;
    }
    // 子命令提示
    if (
      command.subCommands &&
      Object.keys(command.subCommands).length > 0 &&
      args.length > 1
    ) {
      hint.value = getUsageStr(command.subCommands[args[1]], command);
    } else {
      hint.value = getUsageStr(command);
    }
  };

  /**
   * 输入提示防抖
   */
  const debounceSetHint = _.debounce(function (inputText: string) {
    setHint(inputText);
  }, 500);

  return {
    hint,
    setHint,
    debounceSetHint,
  };
};

export default useHint;
