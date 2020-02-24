import { UserDto, User, mapUserDtoToUser } from "../types/user";
import { put, post, remove, get } from "../clients/apiClient";

const USER_API_PATH = "users";

type UsersResponse = { users: UserDto[] };

export const fetchUsers = async () => {
  const json = await get<UsersResponse>(USER_API_PATH);
  return json.users.map(mapUserDtoToUser);
};

export const addUser = async (user: User) => {
  await saveUser(user);
  return await fetchUsers();
};

export const editUser = async (username: string, user: User) => {
  await saveUser(user, username);
  return await fetchUsers();
};

export const removeUser = async (username: string) => {
  await remove(USER_API_PATH, username);
  return await fetchUsers();
};

const saveUser = async (user: User, id?: string) => {
  const data = user;
  const userDto = id
    ? await put<UserDto>(USER_API_PATH, id, data)
    : await post<UserDto>(USER_API_PATH, data);
  return mapUserDtoToUser(userDto);
};
