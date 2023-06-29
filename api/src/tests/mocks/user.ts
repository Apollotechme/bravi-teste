import { IUserRequest } from "../../schemas/user/registerUser.schema";

export const mockUserValid: IUserRequest = {
  name: "Samuel Persuhn",
  password: "12345",
  phone: "47996161867",
  birth_date: "06/07/1996",
  email: "samuel@gmail.com",
  photo_url: "https://urlteste.com",
};

export const mockUserSameEmail: IUserRequest = {
  name: "John Doe",
  password: "12345",
  phone: "47996400063",
  birth_date: "06/07/1996",
  email: "samuel@gmail.com",
  photo_url: "https://urlteste.com",
};

export const mockUserInvalid = {
  name: "John Doe",
  password: "12345",
  birth_date: "06/07/1996",
  email: "johndoe@gmail.com",
  photo_url: "https://urlteste.com",
};
