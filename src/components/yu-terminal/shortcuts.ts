/**
 * 快捷键系统
 */
import TerminalType = YuTerminal.TerminalType;

/**
 * 注册快捷键
 * @param terminal
 */
export const registerShortCuts = (terminal: TerminalType) => {
  document.onkeydown = (e) => {
    console.log(e);
    let key = e.key;
    // 自动聚焦输入框
    if (key >= "a" && key <= "z" && !e.metaKey && !e.shiftKey && !e.ctrlKey) {
      terminal.focusInput();
      return;
    }
    // 匹配快捷键
    let code = e.code;
    for (const shortCut of shortCutList) {
      if (
        code === shortCut.code &&
        e.ctrlKey == !!shortCut.ctrlKey &&
        e.metaKey == !!shortCut.metaKey &&
        e.shiftKey == !!shortCut.shiftKey
      ) {
        shortCut.action(e, terminal);
      }
    }
  };
};

/**
 * 快捷键类型
 */
interface ShortCutType {
  code: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  action: (e: Event, terminal: TerminalType) => void;
}

/**
 * 快捷键列表
 */
const shortCutList: ShortCutType[] = [
  {
    code: "KeyL",
    ctrlKey: true,
    action(e, terminal) {
      e.preventDefault();
      terminal.clear();
    },
  },
  {
    code: "KeyL",
    metaKey: true,
    action(e, terminal) {
      e.preventDefault();
      terminal.clear();
    },
  },
  {
    code: "KeyV",
    metaKey: true,
    action(e, terminal) {
      terminal.focusInput();
    },
  },
  {
    code: "Tab",
    action(e, terminal) {
      e.preventDefault();
      terminal.focusInput();
    },
  },
  {
    code: "Backspace",
    action(e, terminal) {
      terminal.focusInput();
    },
  },
  {
    code: "Enter",
    action(e, terminal) {
      terminal.focusInput();
    },
  },
  {
    code: "ArrowUp",
    action(e, terminal) {
      e.preventDefault();
      terminal.showPrevCommand();
    },
  },
  {
    code: "ArrowDown",
    action(e, terminal) {
      e.preventDefault();
      terminal.showNextCommand();
    },
  },
];
