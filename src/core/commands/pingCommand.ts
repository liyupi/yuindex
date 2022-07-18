import { CommandType } from "../command";
import axios from "axios";

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
    const dest = _[0];
    const res = await axios.get(dest).catch((e) => {
      return e.response;
    });
    if (res?.status < 300) {
      terminal.writeTextSuccessResult("目标地址正常");
    } else {
      terminal.writeTextErrorResult("ping 不通！");
    }
  },
};

export default pingCommand;
