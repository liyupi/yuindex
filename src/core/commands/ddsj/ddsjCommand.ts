import { CommandType } from "../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
 * 每天60秒读懂世界API接口
 * @author kingwdy
 */
const ddosCommand: CommandType = {
  func: "ddsj",
  name: "读懂世界",
  desc: "每天60秒读懂世界API接口",
  collapsible: true,
  options: [],
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./DdsjBox.vue")),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default ddosCommand;
