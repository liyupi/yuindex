import { CommandType } from "../../command";
import { useSpaceStore } from "./spaceStore";

/**
 * 切换目录
 */
const cdCommand: CommandType = {
  func: "cd",
  name: "切换空间目录",
  params: [
    {
      key: "dir",
      desc: "目标目录",
      required: true,
    },
  ],
  options: [],
  action(options, terminal): void {
    const { _ } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("参数不足");
      return;
    }
    const targetDir = _[0];
    const spaceStore = useSpaceStore();
    const result = spaceStore.updateCurrentDir(targetDir);
    if (result) {
      terminal.writeTextResult(`已切换至目录：${spaceStore.currentDir}`);
    } else {
      terminal.writeTextErrorResult("切换目录失败");
    }
  },
};

export default cdCommand;
