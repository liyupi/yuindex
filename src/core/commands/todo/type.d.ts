declare namespace Todo {
  /**
   * 任务类型
   */
  interface TaskType {
    name: string;
    isFinished: boolean;
    createTime: date;
    finishTime?: date;
  }
}
