import { CommandType } from "../../../command";
import { useTodoStore } from "../todoStore";
import TaskType = Todo.TaskType;

/**
 * 添加任务命令
 * @author yupi
 */
const addCommand: CommandType = {
  func: "add",
  name: "添加任务",
  options: [
    {
      key: "name",
      desc: "任务名称",
      alias: ["n"],
      type: "string",
      required: true,
    },
  ],
  action(options, terminal) {
    const { name } = options;
    if (!name) {
      terminal.writeTextErrorResult("请输入任务名称");
      return;
    }
    const { addTask } = useTodoStore();
    const newTask = {
      name,
    } as TaskType;
    const res = addTask(newTask);
    if (res) {
      terminal.writeTextSuccessResult("添加任务成功");
    } else {
      terminal.writeTextErrorResult("操作失败");
    }
  },
};

export default addCommand;
