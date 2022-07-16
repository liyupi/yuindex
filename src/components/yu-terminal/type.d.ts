declare namespace YuTerminal {
  /**
   * 输出类型
   */
  interface OutputType {
    type: "command" | "text" | "component";
    text?: string;
    resultList?: OutputType[];
    component?: any;
  }

  /**
   * 命令类型输出
   */
  interface CommandOutputType extends OutputType {
    type: "command";
    text: string;
    resultList: OutputType[];
  }

  /**
   * 文本类型输出
   */
  interface TextOutputType extends OutputType {
    type: "text";
    text: string;
  }

  /**
   * 组件类型输出
   */
  interface ComponentOutputType extends OutputType {
    type: "component";
    component: any;
  }

  /**
   * 命令输入类型
   */
  interface CommandInputType {
    text: string;
    placeholder?: string;
  }

  /**
   * 终端类型（定义一组访问及操作终端的方法）
   */
  interface TerminalType {
    // 清屏
    clear: () => void;
    // 立即输出
    writeOutput: (output: OutputType) => void;
    // 立即输出文本
    writeTextOutput: (text: string) => void;
    // 写命令文本结果
    writeTextResult: (text: string) => void;
    // 写命令结果
    writeResult: (output: OutputType) => void;
    // 输入框聚焦
    focusInput: () => void;
    // 提交命令
    doSubmitCommand: () => void;
    // 查看下一条命令
    showNextCommand: () => void;
    // 查看上一条命令
    showPrevCommand: () => void;
    // 查看历史命令
    listCommandHistory: () => CommandOutputType[];
  }
}
