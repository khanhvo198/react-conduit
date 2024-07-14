import { conduitApi } from "../shared/data-access/api"
import { UpdateUserDTO, User } from "../shared/data-access/api/models/user";

export const getUser = async (): Promise<{ user: User }> => {
  const response = await conduitApi.get("/user");
  return response.data
}

export const updateUser = async (user: { user: UpdateUserDTO }): Promise<{ user: User }> => {
  console.log(user)
  const response = await conduitApi.put("/user", user);
  return response.data
}
