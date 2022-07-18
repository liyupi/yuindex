import { CommandType } from "../command";
import myDayjs from "../../plugins/myDayjs";

/**
 * 日期命令
 * @author yupi
 */
const dateCommand: CommandType = {
  func: "date",
  name: "日期",
  options: [],
  action(options, terminal): void {
    const dateStr = myDayjs().format("YYYY-MM-DD HH:mm:ss");
    const output = `当前时间：${dateStr}`;
    terminal.writeTextResult(output);
  },
};

export default dateCommand;
