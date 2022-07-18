import { ref } from "vue";
import { getUsageStr } from "../../core/commands/help/helpUtils";
import { commandMap } from "../../core/commandData";
import _ from "lodash";
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
    const func = inputText.split(" ", 1)[0];
    const command = commandMap[func];
    if (!command) {
      hint.value = "";
      return;
    }
    hint.value = getUsageStr(command);
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
