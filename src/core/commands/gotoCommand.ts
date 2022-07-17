import { CommandType } from "../command";
import { useSpaceStore } from "./space/spaceStore";

/**
 * 跳转命令
 * @author yupi
 */
export default {
  func: "goto",
  alias: ["to", "open", "visit", "jump"],
  params: [
    {
      key: "link",
      required: true,
    },
  ],
  options: [
    {
      key: "self",
      alias: ["s"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  action(options, terminal): void {
    const { _, self } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("参数不足");
      return;
    }
    let link = _[0];
    // 优先找空间条目链接
    let { getItem } = useSpaceStore();
    const item = getItem(link);
    if (item?.link) {
      link = item?.link;
    }
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      link = "http://" + link;
    }
    if (self) {
      window.location.href = link;
    } else {
      window.open(link);
    }
  },
} as CommandType;
