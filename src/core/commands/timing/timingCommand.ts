import { CommandType } from "../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
 * 定时命令
 * @author yupi
 */
const timingCommand: CommandType = {
  func: "timing",
  name: "定时器",
  options: [
    {
      key: "seconds",
      desc: "秒数",
      alias: ["s"],
      type: "string",
      required: true,
    },
  ],
  action(options, terminal) {
    const { _, seconds } = options;
    if (!seconds) {
      terminal.writeTextErrorResult("参数不足");
      return;
    }
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./TimingBox.vue")),
      props: {
        seconds,
      },
    };
    terminal.writeResult(output);
  },
};

export default timingCommand;
