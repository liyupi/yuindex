import { CommandType } from "../../../command";

/**
 * 用户登录命令
 * @author yupi
 */
const loginCommand: CommandType = {
  func: "login",
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

  },
};

export default loginCommand;
