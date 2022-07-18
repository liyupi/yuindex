import { CommandType } from "../../../command";

/**
 * 用户登录命令
 * @author yupi
 */
const loginCommand: CommandType = {
  func: "login",
  name: "用户登录",
  options: [
    {
      key: "username",
      desc: "用户名",
      alias: ["u"],
      type: "string",
      required: true,
    },
    {
      key: "password",
      desc: "密码",
      alias: ["p"],
      type: "string",
      required: true,
    },
  ],
  action(options, terminal) {
    const { username, password } = options;
    if (!username) {
      terminal.writeTextErrorResult("请输入用户名");
      return;
    }
    if (!password) {
      terminal.writeTextErrorResult("请输入密码");
      return;
    }
    // todo 请求后端
    terminal.writeTextSuccessResult("登录成功");
  },
};

export default loginCommand;
