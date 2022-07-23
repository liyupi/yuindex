import { defineStore } from "pinia";
import TaskType = Todo.TaskType;

/**
 * 空间状态（类似文件系统实现）
 */
export const useTodoStore = defineStore("todo", {
  state: () => ({
    // 任务列表
    taskList: [
      {
        name: "写下你要做的事",
        isFinished: false,
        createTime: new Date(),
      },
      {
        name: "已完成的事项",
        isFinished: true,
        createTime: new Date(),
      },
    ] as TaskType[],
  }),
  getters: {},
  // 持久化
  persist: {
    key: "todo-store",
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log("load todoStore data start");
    },
    afterRestore: (context) => {
      console.log("load todoStore data end");
    },
  },
  actions: {
    /**
     * 创建任务
     * @param task
     */
    addTask(task: TaskType) {
      if (!task || !task.name) {
        return false;
      }
      task.isFinished = false;
      task.createTime = new Date();
      this.taskList.push(task);
      return true;
    },
    /**
     * 删除任务
     * @param index
     */
    deleteTask(index: number) {
      if (index < 0 || index >= this.taskList.length) {
        return false;
      }
      this.taskList.splice(index, 1);
      return true;
    },
    /**
     * 更新任务
     * @param index
     * @param newTask
     */
    updateTask(index: number, newTask: TaskType) {
      if (index < 0 || index >= this.taskList.length) {
        return false;
      }
      this.taskList[index] = { ...this.taskList[index], ...newTask };
    },
  },
});
