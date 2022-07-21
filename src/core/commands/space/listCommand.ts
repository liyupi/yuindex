import { CommandType } from "../../command";
import { ParsedOptions } from "getopts";
import { useSpaceStore } from "./spaceStore";

/**
 * 列举
 */
const listCommand: CommandType = {
  func: "list",
  name: "列举空间条目",
  alias: ["ls"],
  params: [
    {
      key: "dir",
      desc: "目录",
    },
  ],
  options: [
    {
      key: "recursive",
      desc: "是否递归列举",
      alias: ["r"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  collapsible: true,
  action(options: ParsedOptions, terminal): void {
    const { _, recursive } = options;
    const { listItems, currentDir } = useSpaceStore();
    let dir = _[0] ?? currentDir;
    const resultList = listItems(dir, recursive);
    terminal.writeTextResult(`目录 ${dir}：`);
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
