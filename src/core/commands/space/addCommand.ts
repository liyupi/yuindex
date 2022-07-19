import { CommandType } from "../../command";
import { useSpaceStore } from "./spaceStore";
import { SpaceItemType } from "./spaceCommands";

/**
 * 新增
 */
const addCommand: CommandType = {
  func: "add",
  name: "新增空间条目",
  alias: ["touch", "new"],
  options: [
    {
      key: "name",
      desc: "条目名称",
      alias: ["n"],
      type: "string",
      required: true,
    },
    {
      key: "link",
      desc: "链接",
      alias: ["l"],
      type: "string",
      required: true,
    },
    {
      key: "dir",
      desc: "目标目录",
      alias: ["d"],
      type: "string",
    },
  ],
  action(options, terminal): void {
    let { _, name, link, dir } = options;
    const spaceStore = useSpaceStore();
    if (!dir) {
      dir = spaceStore.currentDir;
    }
    if (!name) {
      terminal.writeTextResult("请输入名称");
      return;
    }
    if (!link) {
      terminal.writeTextResult("请输入网址");
      return;
    }
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      link = "http://" + link;
    }
    const item: SpaceItemType = {
      dir,
      link,
      name,
      type: "link",
    };
    const result = spaceStore.addItem(item);
    if (result) {
      terminal.writeTextResult("添加成功");
    } else {
      terminal.writeTextErrorResult("添加失败");
    }
  },
};

export default addCommand;
