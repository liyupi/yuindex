/**
 *
 * 为了您的隐私安全，如果您是第三方调用可能会记录下您的调用信息
 * 开放API不代表您可以滥用，请您保持尊重，请勿基于此API进行二次开发
 *
 *
 * For your privacy and security, if you are a third party caller, your call letter may be recorded.
 * Open API does not mean you can abuse it, please keep it respectful and do not use it for secondary development.
 *
 */

import axios from "axios";

const ROOT_URL = "https://api-varbook.uiuing.com";

const translate = axios.create({
  baseURL: `${ROOT_URL}/translate`,
});

translate.interceptors.response.use((response) => {
  if (response.status === 200) {
    const { data } = response;
    return Promise.resolve(data);
  }
  return Promise.reject(response);
});

export { translate };
