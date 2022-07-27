import { CommandType } from "../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
 * 查看现在天气
 * @author kingwdy
 */
const ddosCommand: CommandType = {
  func: "noweather",
  name: "noweather",
  desc: "查看现在天气",
  alias: ["nw"],
  options: [],
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./NoweatherBox.vue")),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default ddosCommand;
