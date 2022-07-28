import { CommandType } from "../../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
 * ikun 测试（整活）
 * @author yupi
 */
const ikuntestCommand: CommandType = {
  func: "ikuntest",
  name: "ikun测试",
  desc: "测试一下你是真 ikun 还是小黑子",
  options: [],
  collapsible: true,
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./IkunTestBox.vue")),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default ikuntestCommand;
