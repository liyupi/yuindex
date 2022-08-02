import { CommandType } from "../../../command";
import { commandList, commandMap } from "../../../commandRegister";
import { useAliasStore } from "../aliasStore";
import { existInCommandMap } from "../aliasCommand";
import { defineAsyncComponent, markRaw } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
* 为命令起别名
* @author Hamusuta0320
*/
const lsAliasCommand: CommandType = {
  func: "ls",
  name: "列出命令别名",
  params: [
    {
      key: "source",
      desc: "命令",
      required: true
    },
  ],
  options: [],
  action(options, terminal) {
    const { _ } = options;
    const { listAliasName } = useAliasStore()
    if (_.length < 1) {
      terminal.writeTextResult("未指定命令");
      return;
    }
    const command = commandMap[_[0]]
    console.log("command is:", command)
    let names = [] as string[];
    if (command) {
      names = [...names, command.func];
      let aliasNames = listAliasName(command.func);
      if (aliasNames) {
        names = [...names, ...aliasNames]
      }
      if (command.alias) {
        names = [...names, ...command.alias];
      }
    }
    if (names.length > 0) {
      const output: ComponentOutputType = {
        type: "component",
        component: markRaw(defineAsyncComponent(() => import("./LsAliasBox.vue"))),
        props: {
          names
        }, 
      };
      terminal.writeResult(output);
    } else {
      terminal.writeTextResult(`${_[0]}命令没有别名`);
    }
    console.log("commandMap:", commandMap)
  }
}
export default lsAliasCommand;