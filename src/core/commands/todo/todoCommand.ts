import { CommandType } from "../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;
import addCommand from "./subCommands/addCommand";

/**
 * 待办事项命令
 * @author yupi
 */
const todoCommand: CommandType = {
  func: "todo",
  name: "待办事项",
  desc: "记录和管理任务",
  params: [
    {
      key: "subCommand",
      desc: "子命令",
      required: true,
    },
  ],
  options: [],
  subCommands: {
    add: addCommand,
  },
  collapsible: true,
  action(options, terminal) {
    const { _ } = options;
    if (_.length < 1) {
      const output: ComponentOutputType = {
        type: "component",
        component: defineAsyncComponent(() => import("./TodoBox.vue")),
      };
      terminal.writeResult(output);
      return;
    }
  },
};

export default todoCommand;
