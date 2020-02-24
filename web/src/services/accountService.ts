import { get } from "../clients/apiClient";

const ACCOUNT_API_PATH = "account";

export const exportAccount = async () => {
  const response = await get<any>(`${ACCOUNT_API_PATH}/export`);
  return response;
};
