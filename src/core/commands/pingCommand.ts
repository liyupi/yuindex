import { CommandType } from "../command";
//import axios from "axios";

/**
 * ping 命令
 * @author yupi
 */
const pingCommand: CommandType = {
  func: "ping",
  name: "ping",
  desc: "检测某个地址是否存活",
  params: [
    {
      key: "dest",
      desc: "目标地址",
      required: true,
    },
  ],
  options: [
    {
      key: "timeout",
      desc: "请求超时时间(单位:毫秒)",
      alias: ["t"],
      type: "string",
      defaultValue: "1500",
    },
  ],
  async action(options, terminal) {
    const { _ } = options;
    const { timeout = "1500" } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("参数不足");
      return;
    }
    var dest = _[0];
    if (
      !dest.toLowerCase().startsWith("http://") &&
      !dest.toLowerCase().startsWith("https://")
    ) {
      dest = "http://" + dest;
    }
    const res = await Promise.race([
      new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error("timeout")), Number(timeout));
      }),
      fetch(dest, { mode: "no-cors" }),
    ])
      .then((resp: any) => {
        if (resp.ok || resp.status == 200 || resp.type == "opaque") {
          console.log(resp);
          terminal.writeTextSuccessResult("目标地址正常");
        } else {
          terminal.writeTextErrorResult("ping 不通！");
        }
      })
      .catch((error) => {
        console.log(error);
        terminal.writeTextErrorResult("ping 不通！");
      });
  },
};

export default pingCommand;
