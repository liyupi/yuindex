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
      required: false,
    },
  ],
  options: [],
  action(options, terminal): void {
    const { _ } = options;
    const spaceStore = useSpaceStore();
    const targetDir = _[0];
    if (_.length < 1) {
      const result = spaceStore.updateCurrentDir('/');
      if(result){
        terminal.writeTextResult('已切换回根目录');
      }else{
        terminal.writeTextErrorResult("切换目录失败");
      }
      return;
    }
    const result = spaceStore.updateCurrentDir(targetDir);
    if (result) {
      terminal.writeTextResult(`已切换至目录：${spaceStore.currentDir}`);
    } else {
      terminal.writeTextErrorResult("切换目录失败");
    }
  },
};

export default cdCommand;
