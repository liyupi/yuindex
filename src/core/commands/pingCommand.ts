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
  options: [],
  async action(options, terminal) {
    const { _ } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("参数不足");
      return;
    }
    var dest = _[0];
    if (
      dest.substr(0, 7).toLowerCase() != "http://" &&
      dest.substr(0, 8).toLowerCase() != "https://"
    ) {
      dest = "http://" + dest;
    }
    const res = await fetch(dest, { mode: "no-cors" })
      .then((resp) => {
        if (resp.ok || resp.status == 200 || resp.type == "opaque") {
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
