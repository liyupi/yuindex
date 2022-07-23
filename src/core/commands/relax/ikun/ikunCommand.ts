import { CommandType } from "../../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
 * ikun 命令（整活）
 * @author yupi
 */
const ikunCommand: CommandType = {
  func: "ikun",
  name: "ikun",
  options: [],
  collapsible: true,
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./IkunBox.vue")),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default ikunCommand;
