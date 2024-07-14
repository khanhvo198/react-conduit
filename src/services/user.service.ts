import { conduitApi } from "../shared/data-access/api"
import { User } from "../shared/data-access/api/models/user";

export const getUser = async (): Promise<{ user: User }> => {
  const response = await conduitApi.get("/user");
  return response.data
}

