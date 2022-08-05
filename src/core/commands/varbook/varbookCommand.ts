import { CommandType } from "../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;
import { checkSearchText } from "./hooks/character/standard";

/**
 * 变量命名命令
 * @author uiuing
 */
const varbookCommand: CommandType = {
  func: "varbook",
  name: "varbook",
  desc: "变量命名助手，自动帮你取变量名",
  alias: ["vb", "bianliang"],
  params: [
    {
      key: "data",
      desc: "待转译为变量内容",
      required: true,
    },
  ],
  options: [],
  collapsible: true,
  action(options, terminal) {
    const _ = options._.join(" ");
    const searchText: string | boolean = checkSearchText(_, terminal);
    if (!searchText) return;
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./VarbookBox.vue")),
      props: {
        searchText,
      },
    };
    terminal.writeResult(output);
  },
};

export default varbookCommand;
