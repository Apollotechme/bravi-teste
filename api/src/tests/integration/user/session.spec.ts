import request from "supertest";
import { describe, expect, test, afterAll } from "@jest/globals";
import { mockUserValid } from "../../mocks/user";
import { token } from "./user.spec";

describe("Session Routes", () => {
  let url: string = "http://localhost:8000",
    token: token;
  beforeAll(async () => {
    await request(url).post("/v1/user").send(mockUserValid);
  });

  afterAll(async () => {
    await request(url)
      .delete("/v1/user")
      .set("Authorization", `Bearer ${token.body.token}`);
  });

  test("Should be possible login with valid user", async () => {
    const response = await request(url)
      .post("/v1/session")
      .send({ email: mockUserValid.email, password: mockUserValid.password });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    token = response;
  });

  test("Should be not possible login whit wrong e-mail", async () => {
    const response = await request(url)
      .post("/v1/session")
      .send({ email: "invalid@mail.com", password: mockUserValid.password });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Login ou senha inválidos");
  });

  test("Should be not possible login whit wrong password", async () => {
    const response = await request(url)
      .post("/v1/session")
      .send({ email: mockUserValid.email, password: "wrongpassword" });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Login ou senha inválidos");
  });
});
