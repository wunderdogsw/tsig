export type User = {
  username: string;
};

export type UserDto = User;

export const mapUserDtoToUser = (user: User) => user;
