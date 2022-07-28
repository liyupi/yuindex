import { CommandType } from "../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
 * 在线画板
 * @author kingwdy
 */
const ddosCommand: CommandType = {
  func: "draw",
  name: "在线画板",
  desc: "在线画板",
  alias: ["dw"],
  collapsible: true,
  options: [],
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./DrawBox.vue")),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default ddosCommand;
