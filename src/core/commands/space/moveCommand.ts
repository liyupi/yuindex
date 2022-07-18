import { CommandType } from "../../command";
import { useSpaceStore } from "./spaceStore";

/**
 * 移动目录（重命名）
 */
const moveCommand: CommandType = {
  func: "move",
  name: "移动空间条目",
  alias: ["mv"],
  params: [
    {
      key: "source",
      desc: "来源路径",
      required: true,
    },
    {
      key: "target",
      desc: "目标路径",
      required: true,
    },
  ],
  options: [
    {
      key: "recursive",
      desc: "是否递归移动",
      alias: ["r"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  action(options, terminal): void {
    const { _, recursive = false } = options;
    if (_.length < 2) {
      terminal.writeTextErrorResult("参数不足");
      return;
    }
    const spaceStore = useSpaceStore();
    const [source, target] = _;
    const result = spaceStore.moveItem(source, target, recursive);
    if (result) {
      terminal.writeTextResult("移动成功");
    } else {
      terminal.writeTextErrorResult("移动失败");
    }
  },
};

export default moveCommand;
