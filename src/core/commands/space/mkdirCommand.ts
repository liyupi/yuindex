import { CommandType } from "../../command";
import { SpaceItemType } from "./spaceCommands";
import { useSpaceStore } from "./spaceStore";

/**
 * 创建目录
 */
const mkdirCommand: CommandType = {
  func: "mkdir",
  params: [
    {
      key: "dir",
    },
  ],
  options: [],
  action(options, terminal): void {
    const { _ } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("参数不足");
      return;
    }
    const spaceStore = useSpaceStore();
    const newDir = _[0];
    const item: SpaceItemType = {
      dir: spaceStore.currentDir,
      name: newDir,
      type: "dir",
    };
    const result = spaceStore.addItem(item);
    if (result) {
      terminal.writeTextResult("创建目录成功");
    } else {
      terminal.writeTextErrorResult("创建目录失败");
    }
  },
};

export default mkdirCommand;
