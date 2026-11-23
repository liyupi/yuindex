import { CommandType } from "../../../command";
import { defineAsyncComponent, markRaw } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
 * 摸鱼命令
 * @author yupi
 */
const moyuCommand: CommandType = {
  func: "moyu",
  name: "摸鱼",
  options: [],
  collapsible: true,
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: markRaw(defineAsyncComponent(() => import("./MoYuBox.vue"))),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default moyuCommand;
