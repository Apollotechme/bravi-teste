import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import {
  mockUserInvalid,
  mockUserSameEmail,
  mockUserValid,
} from "../../mocks/user";

export interface token extends request.Response {
  body: {
    token: string;
  };
}
describe("User Routes", () => {
  let url: string = "http://localhost:8000",
    token: token;

  test("Should be able to create a new user", async () => {
    const response = await request(url).post("/v1/user").send(mockUserValid);

    expect(response.statusCode).toBe(201);
  });

  test("Should be able to user got login into app", async () => {
    const response = await request(url)
      .post("/v1/session")
      .send({ email: mockUserValid.email, password: mockUserValid.password });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("token");
    token = response;
  });

  test("Should be able to user get owner data", async () => {
    const response = await request(url)
      .get("/v1/user")
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual(mockUserValid.name);
    expect(response.body.phone).toEqual(mockUserValid.phone);
    expect(response.body.password).toBeUndefined();
  });

  test("Should be able to update a user", async () => {
    const patch = await request(url)
      .patch("/v1/user")
      .send({
        name: "Samuel Patch",
        password: "123456",
      })
      .set("Authorization", `Bearer ${token.body.token}`);

    const response = await request(url)
      .get("/v1/user")
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(patch.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user_id");
    expect(response.body.name).toEqual("Samuel Patch");
  });

  test("It should not be possible to create another user with the same email", async () => {
    const response = await request(url)
      .post("/v1/user")
      .send(mockUserSameEmail);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Email já cadastrado");
  });

  test("It should not be possible to create invalid user", async () => {
    const response = await request(url).post("/v1/user").send(mockUserInvalid);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("o campo telefone é obrigatório");
  });

  test("Should be able to delete a user", async () => {
    const response = await request(url)
      .delete("/v1/user")
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(response.statusCode).toBe(204);
  });
});
