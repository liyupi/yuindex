import { CommandType } from "../../command";
import { ParsedOptions } from "getopts";
import { useSpaceStore } from "./spaceStore";
import { SpaceItemType } from "./spaceCommands";

/**
 * 列举
 */
const listCommand: CommandType = {
  func: "list",
  alias: ["ls"],
  params: [
    {
      key: "dir",
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
  action(options: ParsedOptions, terminal): void {
    // todo recursive 待实现
    const { _, recursive } = options;
    const spaceStore = useSpaceStore();
    console.log(spaceStore.space);
    let dir = _?.[0];
    if (!dir) {
      dir = spaceStore.currentDir;
    }
    const resultList: SpaceItemType[] = [];
    // 查询 dir 下的 item
    for (const key in spaceStore.space) {
      // 前缀匹配
      if (key.startsWith(dir) && key !== dir) {
        resultList.push(spaceStore.space[key]);
      }
    }
    terminal.writeTextResult(`查看目录 ${dir}`);
    resultList.forEach((item) => {
      let output = `${item.name} ${item.link}`;
      if (item.type === "dir") {
        output = `<span style="color: lawngreen">${item.name}</span>`;
      }
      terminal.writeTextResult(output);
    });
  },
};

export default listCommand;
