declare namespace YuTerminal {
  /**
   * 输出状态
   */
  type OutputStatusType = "info" | "success" | "warning" | "error" | "system";

  /**
   * 输出类型
   */
  interface OutputType {
    type: "command" | "text" | "component";
    text?: string;
    resultList?: OutputType[];
    component?: any;
    status?: OutputStatusType;
    props?: any;
    collapsible?: boolean;
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
    props?: any;
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
    writeTextOutput: (text: string, status?: OutputStatusType) => void;
    // 写命令文本结果
    writeTextResult: (text: string, status?: OutputStatusType) => void;
    // 写命令错误文本结果
    writeTextErrorResult: (text: string) => void;
    // 写命令成功文本结果
    writeTextSuccessResult: (text: string) => void;
    // 写命令结果
    writeResult: (output: OutputType) => void;
    // 输入框聚焦
    focusInput: () => void;
    // 获取输入框是否聚焦
    isInputFocused: () => boolean;
    // 设置输入框的值
    setTabCompletion: () => void;
    // 提交命令
    doSubmitCommand: () => void;
    // 查看下一条命令
    showNextCommand: () => void;
    // 查看上一条命令
    showPrevCommand: () => void;
    // 查看历史命令
    listCommandHistory: () => CommandOutputType[];
    // 折叠 / 展开所有块
    toggleAllCollapse: () => void;
    // 设置命令是否可折叠
    setCommandCollapsible: (collapsible: boolean) => void;
  }
}
