import { IContactRequest } from "../../schemas/contacts/registerContact.schema";

export const mockContactValid: IContactRequest = {
  name: "John Doe",
  phone: "47996400061",
  description: "Best Friend",
};

export const mockContactValidTwo: IContactRequest = {
  name: "Jhonny Depp",
  phone: "47996400069",
  description: "Captain!",
};

export const mockContactSamePhone: IContactRequest = {
  name: "Samuel Persuhn",
  phone: mockContactValid.phone,
  description: "Back-end dev | devops",
};
