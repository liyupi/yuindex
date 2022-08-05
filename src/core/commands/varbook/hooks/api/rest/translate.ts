import { translate } from "../index";
import { enBase64 } from "../../character/base64";

const { get } = translate;

const getNamedVariables = async (searchText: string) => {
  const s = enBase64(searchText);
  const params = {
    s,
  };
  const res = await get("", { params });
  return res;
};

export { getNamedVariables };
