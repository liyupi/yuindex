import { CommandType } from "../../../command";
import { commandList, commandMap } from "../../../commandRegister";
import { useAliasStore } from "../aliasStore";

/**
* 为命令起别名
* @author Hamusuta0320
*/
const removeAliasCommand: CommandType = {
  func: "rm",
  name: "删除命令别名",
  params: [
    {
      key: "target",
      desc: "别名",
      required: true
    },
  ],
  options: [],
  action(options, terminal) {
    const { _ } = options;
    const { removeAliasName } = useAliasStore()
    if (_.length < 1) {
      terminal.writeTextResult("未指定要删除的别名");
      return;
    }
    const res = removeAliasName(_[0])
    if (res) {
      delete commandMap[_[0]]
      terminal.writeTextResult("删除别名成功");
    } else {
      terminal.writeTextResult("删除别名失败，请检查是否存在该别名");
    }

  }
};

export default removeAliasCommand;