import myAxios from "../../../plugins/myAxios";

/**
 * 翻译文本
 * @param keywords
 * @param config
 */
export const translate = async (
  keywords: string,
  config: Record<string, string>
) => {
  if (!keywords) {
    return null;
  }
  return await myAxios.post("/fanyi/translate", { keywords, config });
};
