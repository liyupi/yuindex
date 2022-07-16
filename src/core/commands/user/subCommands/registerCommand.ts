import { CommandType } from "../../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

/**
 * 用户注册命令
 * @author yupi
 */
const registerCommand: CommandType = {
  func: "register",
  options: [
    {
      key: "username",
      alias: ["u"],
      type: "string",
      required: true,
    },
    {
      key: "password",
      alias: ["p"],
      type: "string",
      required: true,
    },
  ],
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./Test.vue")),
    };
    terminal.writeResult(output);
  },
};

export default registerCommand;
