import { CommandType } from "../../command";

/**
 * 百度百科搜索词条命令
 * @author HanYiXin
 */
const baidubaikeCommand: CommandType = {
  func: "baidubaike",
  name: "百度百科",
  alias: ["bdbaike", "bdbk"],
  params: [
    {
        key: "keyword",
        desc: "百度百科搜索指定词条",
        required: true
    },
  ],
  options: [],
  action(options, terminal) {
    const { _ } = options;
    const keyword = _[0];
    const url = 
    'https://baike.baidu.com/search/word?word=' + keyword;
    window.open(url);
  },
};

export default baidubaikeCommand;