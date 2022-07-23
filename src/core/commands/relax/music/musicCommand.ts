import { CommandType } from "../../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
 * 音乐命令
 * @author yupi
 */
const musicCommand: CommandType = {
  func: "music",
  name: "音乐",
  desc: "在线听音乐",
  params: [
    {
      key: "name",
      desc: "音乐名称",
      required: true,
    },
  ],
  options: [],
  collapsible: true,
  action(options, terminal) {
    const { _ } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("参数不足");
      return;
    }
    const name = _[0];
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./MusicBox.vue")),
      props: {
        name,
      },
    };
    terminal.writeResult(output);
  },
};

export default musicCommand;
