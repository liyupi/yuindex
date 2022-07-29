import { CommandType } from "../../../command";
import { commandList, commandMap } from "../../../commandRegister";
import { existInCommandMap } from "../aliasCommand";
import { useAliasStore } from "../aliasStore";
/**
* 为命令起别名
* @author Hamusuta0320
*/
const updateAliasCommand: CommandType = {
  func: "mv",
  name: "更新命令别名",
  params: [],
  options: [
    {
      key: "source",
      alias: ["s"],
      type: "string",
      desc: "原命令别名",
      required: true
    },
    {
      key: "target",
      alias: ["t"],
      type: "string",
      desc: "新命令别名",
      required: true
    }
  ],
  action(options, terminal) {
    const {source, target} = options;
    const {updateAliasName, containsAliasName} = useAliasStore()
    if(!source) {
      terminal.writeTextResult("未指定原命令别名");
      return;
    }
    if (!target) {
      terminal.writeTextResult("未指定新命令别名");
      return;
    }
    // 判断是否存在该命令
    if (!containsAliasName(source)) {
      terminal.writeTextResult("不能为不存在的命令起别名");
      return;
    }
    // 判断别名命令是否与其他已有命令或者别名重复
    if (containsAliasName(target) || existInCommandMap(target)) {
      terminal.writeTextResult("别名不能与已有的命令或者命令别名重复");
      return;
    }
    // 往store存入，再加入commandMap
    commandMap[target] = commandMap[source]
    delete commandMap[source]
    updateAliasName(commandMap[target].func, source, target);
    terminal.writeTextResult("修改别名成功");
  }
};

export default updateAliasCommand;