import { CommandType } from "../../../command";
import { commandMap } from "../../../commandRegister";
import { useAliasStore } from "../aliasStore";
import { existInCommandMap } from "../aliasCommand";

/**
* 为命令起别名
* @author Hamusuta0320
*/
const addAliasCommand: CommandType = {
  func: "add",
  name: "添加别名",
  params: [],
  options: [
    {
      key: "source",
      alias: ["s"],
      type: "string",
      desc: "源命令",
      required: true
    },
    {
      key: "target",
      alias: ["t"],
      type: "string",
      desc: "命令别名",
      required: true
    }
  ],
  action(options, terminal) {
    const {source, target} = options;
    const {saveAliasName, containsAliasName} = useAliasStore()
    if(!source) {
      terminal.writeTextResult("未指定要取别名的命令");
      return;
    }
    if (!target) {
      terminal.writeTextResult("没有填写命令别名");
      return;
    }
    // 判断是否存在该命令
    if (!existInCommandMap(source)) {
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
    saveAliasName(commandMap[target].func, target);
    terminal.writeTextResult("起别名成功");
  }
};

export default addAliasCommand;