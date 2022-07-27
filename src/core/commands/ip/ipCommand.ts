import { CommandType } from "../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
 * ip查询
 * @author kingwdy
 */
const ddosCommand: CommandType = {
  func: "ip address",
  name: "ip查询",
  alias: ["ip"],
  desc: "ip查询",
  options: [],
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./Ipaddress.vue")),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default ddosCommand;
