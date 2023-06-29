import { IUserRequest } from "../../schemas/user/registerUser.schema";

export const mockUserValid: IUserRequest = {
  name: "Samuel Persuhn",
  password: "12345",
  phone: "47996161867",
  email: "samuel@gmail.com",
};

export const mockUserSameEmail: IUserRequest = {
  name: "John Doe",
  password: "12345",
  phone: "47996400063",
  email: "samuel@gmail.com",
};

export const mockUserInvalid = {
  name: "John Doe",
  password: "12345",
  email: "johndoe@gmail.com",
};
