import { CommandType } from "../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
 * 翻译命令
 * @author yupi
 */
const fanyiCommand: CommandType = {
  func: "fanyi",
  name: "翻译",
  alias: [],
  options: [],
  async action(options, terminal) {
    const { _ } = options;
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./FanYiBox.vue")),
    };
    terminal.writeResult(output);
  },
};

export default fanyiCommand;
