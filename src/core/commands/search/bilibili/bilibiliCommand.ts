import { CommandType } from "../../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

const baseUrl = "https://www.baidu.com/s";

/**
 * B 站搜索命令
 * @author yupi
 */
const bilibiliCommand: CommandType = {
  func: "bilibili",
  name: "bilibili 搜索",
  alias: ["bzhan", "bili"],
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      key: "self",
      desc: "是否当前页面打开",
      alias: ["s"],
      type: "boolean",
      defaultValue: false,
    },
    {
      key: "bvid",
      desc: "B站视频id",
      alias: ["b"],
      type: "string",
    },
  ],
  collapsible: true,
  action(options, terminal) {
    const { _, self, bvid } = options;
    // 优先打开视频
    if (bvid) {
      const output: ComponentOutputType = {
        type: "component",
        component: defineAsyncComponent(() => import("./BilibiliBox.vue")),
        props: {
          bvid,
        },
      };
      terminal.writeResult(output);
      return;
    }
    const word = _.length > 0 ? _[0] : "";
    const targetLink = `https://search.bilibili.com/all?keyword=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default bilibiliCommand;
