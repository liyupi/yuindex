import { CommandType } from "../../../command";
import { defineAsyncComponent } from "vue";
import { commandMap } from "../../../commandRegister";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
 * 帮助命令
 * @author yupi
 */
const helpCommand: CommandType = {
  func: "help",
  name: "查看帮助",
  alias: ["man"],
  params: [
    {
      key: "commandName",
      desc: "命令英文名称",
    },
  ],
  options: [],
  collapsible: true,
  action(options, terminal, parentCommand): void {
    const { _ } = options;
    // 输出所有帮助（文档 + 命令列表）
    if (_.length < 1) {
      const output: ComponentOutputType = {
        type: "component",
        component: defineAsyncComponent(() => import("./HelpBox.vue")),
      };
      terminal.writeResult(output);
      return;
    }
    // 输出某个命令的帮助
    const commandName = _[0];
    let commands = commandMap;
    // 支持输出子命令的帮助
    if (
      parentCommand &&
      parentCommand.subCommands &&
      Object.keys(parentCommand.subCommands).length > 0
    ) {
      commands = parentCommand.subCommands;
    }
    const command = commands[commandName];
    if (!command) {
      terminal.writeTextErrorResult("找不到指定命令");
      return;
    }
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./CommandHelpBox.vue")),
      props: {
        command,
        parentCommand,
      },
    };
    terminal.writeResult(output);
  },
};

export default helpCommand;
