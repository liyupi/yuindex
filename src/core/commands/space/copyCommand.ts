import { CommandType } from "../../command";
import { useSpaceStore } from "./spaceStore";

/**
 * 复制
 */
const copyCommand: CommandType = {
  func: "copy",
  name: "复制空间条目",
  alias: ["cp"],
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
      desc: "是否递归复制",
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
    const result = spaceStore.copyItem(source, target, recursive);
    if (result) {
      terminal.writeTextResult("复制成功");
    } else {
      terminal.writeTextErrorResult("复制失败");
    }
  },
};

export default copyCommand;
