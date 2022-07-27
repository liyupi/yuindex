import { CommandType } from "../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
 * 每日一言
 * @author kingwdy
 */
const ddosCommand: CommandType = {
  func: "ddsj",
  name: "读懂世界",
  desc: "每天60秒读懂世界API接口",
  options: [],
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./MryyBox.vue")),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default ddosCommand;
