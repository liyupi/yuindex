import { CommandType } from "../../command";
import { useSpaceStore } from "./spaceStore";

/**
 * 复制
 */
const copyCommand: CommandType = {
  func: "copy",
  alias: ["cp"],
  params: [
    {
      key: "source",
      required: true,
    },
    {
      key: "target",
      required: true,
    },
  ],
  options: [
    {
      key: "recursive",
      alias: ["r"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  action(options, terminal): void {
    const { _, recursive = false } = options;
    if (_.length < 2) {
      terminal.writeTextResult("参数不足");
      return;
    }
    const spaceStore = useSpaceStore();
    const [source, target] = _;
    const result = spaceStore.copyItem(source, target, recursive);
    if (result) {
      terminal.writeTextResult("复制成功");
    } else {
      terminal.writeTextResult("复制失败");
    }
  },
};

export default copyCommand;
