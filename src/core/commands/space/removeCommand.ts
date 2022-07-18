import { CommandType } from "../../command";
import { ParsedOptions } from "getopts";
import { useSpaceStore } from "./spaceStore";

/**
 * 删除
 */
const removeCommand: CommandType = {
  func: "remove",
  name: "删除空间条目",
  alias: ["rm", "delete", "del"],
  params: [
    {
      key: "item",
      desc: "要删除的条目路径",
      required: true,
    },
  ],
  options: [
    {
      key: "recursive",
      desc: "是否递归删除",
      alias: ["r"],
      type: "boolean",
      defaultValue: false,
    },
    {
      key: "force",
      desc: "是否强制删除",
      alias: ["f"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  action(options: ParsedOptions, terminal): void {
    const { _, recursive = false, force } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("参数不足");
      return;
    }
    const deleteKey = _[0];
    if (recursive && !force) {
      terminal.writeTextErrorResult("请确认要强制删除");
      return;
    }
    const spaceStore = useSpaceStore();
    const result = spaceStore.deleteItem(deleteKey, recursive);
    if (result) {
      terminal.writeTextResult("操作成功");
    } else {
      terminal.writeTextErrorResult("操作失败");
    }
  },
};

export default removeCommand;
