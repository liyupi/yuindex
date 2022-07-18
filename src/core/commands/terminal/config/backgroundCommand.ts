import { CommandType } from "../../../command";
import { useTerminalConfigStore } from "./terminalConfigStore";
import axios from "axios";

/**
 * 切换终端背景
 * @author yupi
 */
const backgroundCommand: CommandType = {
  func: "background",
  name: "切换终端背景",
  alias: ["bg"],
  params: [
    {
      key: "url",
      desc: "图片地址",
      required: false,
    },
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options;
    let url = _[0];
    if (_.length > 0) {
      url = _[0];
    }
    if (!url) {
      // 随机获取壁纸 todo 需要代理
      const api = "https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images";
      const res = await axios.get(api);
      console.log(res);
    }
    const { setBackground } = useTerminalConfigStore();
    setBackground(url);
  },
};

export default backgroundCommand;
