import request from "supertest";
import { describe, expect, test, afterAll } from "@jest/globals";
import { token } from "./user.spec";
import { mockUserValid } from "../../mocks/user";
import {
  mockContactSamePhone,
  mockContactValid,
  mockContactValidTwo,
} from "../../mocks/contacts";

describe("Contacts Routes", () => {
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

  test("Should be able to create a new contact", async () => {
    token = await request(url)
      .post("/v1/session")
      .send({ email: mockUserValid.email, password: mockUserValid.password });

    const response = await request(url)
      .post("/v1/contacts")
      .send(mockContactValid)
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(response.statusCode).toBe(201);
  });

  test("Should be able to create another contact", async () => {
    const response = await request(url)
      .post("/v1/contacts")
      .send(mockContactValidTwo)
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(response.statusCode).toBe(201);
  });

  test("Should be not possible create another contact with same phone", async () => {
    const response = await request(url)
      .post("/v1/contacts")
      .send(mockContactSamePhone)
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(response.statusCode).toBe(303);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      `Seu contato ${mockContactValid.name}, já possui esse número de telefone`
    );
  });

  test("Should be able to list user contacts", async () => {
    const response = await request(url)
      .get("/v1/contacts")
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test("Should be able to search a contat by name", async () => {
    const response = await request(url)
      .get("/v1/contacts")
      .query({ name: mockContactValid.name })
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toEqual(mockContactValid.name);
    expect(response.body[0].phone).toEqual(mockContactValid.phone);
  });

  test("Should be able to search a contat by phone number", async () => {
    const response = await request(url)
      .get("/v1/contacts")
      .query({ phone: mockContactValidTwo.phone })
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toEqual(mockContactValidTwo.name);
    expect(response.body[0].phone).toEqual(mockContactValidTwo.phone);
  });

  test("Should be able patch a contact", async () => {
    const contact = await request(url)
      .get("/v1/contacts")
      .query({ name: mockContactValid.name })
      .set("Authorization", `Bearer ${token.body.token}`);

    const response = await request(url)
      .patch("/v1/contacts/")
      .set("Authorization", `Bearer ${token.body.token}`)
      .send({
        contact_id: contact.body[0].contact_id,
        name: "John Patch",
        description: "Not already my best friend",
      });

    expect(response.statusCode).toBe(200);
  });

  test("Should be not able to update a contact by already exists number", async () => {
    const contact = await request(url)
      .get("/v1/contacts")
      .query({ name: "John Patch" })
      .set("Authorization", `Bearer ${token.body.token}`);

    const response = await request(url)
      .patch("/v1/contacts/")
      .set("Authorization", `Bearer ${token.body.token}`)
      .send({
        contact_id: contact.body[0].contact_id,
        phone: mockContactValidTwo.phone,
      });

    expect(response.statusCode).toBe(303);
    expect(response.body).toHaveProperty("message");
    expect(response.body.messa).toEqual(
      `Seu contato ${mockContactValidTwo.name}, já possui esse número de telefone`
    );
  });

  test("Should be able to list recent changes", async () => {
    const response = await request(url)
      .get("/v1/contacts")
      .query({ name: "John Patch" })
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toEqual("John Patch");
    expect(response.body[0].phone).toEqual(mockContactValid.phone);
  });

  test("Should be able to delete a contact", async () => {
    const contact = await request(url)
      .get("/v1/contacts")
      .query({ name: mockContactValidTwo.name })
      .set("Authorization", `Bearer ${token.body.token}`);

    const response = await request(url)
      .delete(`/v1/contacts/${contact.body[0].contact_id}`)
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(response.statusCode).toEqual(204);
  });

  test("Should be not able to list deleted contacts", async () => {
    const response = await request(url)
      .get("/v1/contacts")
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toEqual("John Patch");
  });
});
