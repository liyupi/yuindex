import TerminalType = YuTerminal.TerminalType;

const STYLE_LANG: { [key: string]: string } = {
  smallHump: "小驼峰",
  bigHump: "大驼峰",
  smallSnake: "小蛇形",
  bigSnake: "大蛇形",
  spinal: "脊柱",
  note: "注释",
};

/**
 * 解析搜索文本
 * @param content
 */
const parseSearchText = (content: string): string | null | undefined => {
  return content
    ? content
        .trim()
        .match(/[a-zA-Z0-9\s\u4e00-\u9fa5\uF900-\uFA2D]+/gi)
        ?.join("")
        .replaceAll(/\s+/g, " ")
    : content;
};

/**
 * 检查搜索文本
 * @param searchText
 * @param terminal
 */
export const checkSearchText = (
  searchText: string,
  terminal: TerminalType
): string | boolean => {
  const newSearchText: string | null | undefined = parseSearchText(searchText);
  if (!newSearchText || Number(newSearchText) || newSearchText.length < 2) {
    terminal.writeTextErrorResult(
      "内容过短，至少2个纯数字以外的字符（1个汉字、字母、空格、数字计为一个字符）"
    );
    return false;
  }
  if (newSearchText.length > 15) {
    terminal.writeTextErrorResult(
      "内容过长，应小于15个字符（1个汉字、字母、空格、数字计为一个字符）"
    );
    return false;
  }
  return newSearchText;
};

export const parseNamedVariable = (
  namedVariables: any
): {
  columns: any[];
  source: any[];
} => {
  const source = [];
  for (const key in STYLE_LANG) {
    source.push({
      style: STYLE_LANG[key],
      key,
      data: namedVariables[key],
    });
  }
  return {
    source,
    columns: [
      {
        title: "变量命名法",
        dataIndex: "style",
        key: "style",
        width: "100px",
      },
      {
        title: "变量名",
        dataIndex: "data",
        key: "data",
        align: "center",
      },
    ],
  };
};
