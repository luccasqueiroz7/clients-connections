import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedClient, mockedClientLogin, mockedContact } from "../../mocks";

describe("contacts", () => {
  let connection: DataSource;
  let token = "";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/clients").send(mockedClient);
    const login = await request(app).post("/login").send(mockedClientLogin);
    token = login.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /contacts - Must be able to create a contact", async () => {
    const response = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedContact);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("emails");
    expect(response.body).toHaveProperty("phones");
    expect(response.status).toBe(201);
  });

  test("POST /contacts - Should not be able to create a contact without name", async () => {
    const response = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
  });

  test("POST /contacts - Should not be able to create a contact without token", async () => {
    const response = await request(app).post("/contacts").send(mockedContact);

    expect(response.status).toBe(401);
  });

  test("POST /contacts - Should not be able to create a contact with invalid token", async () => {
    const response = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer 777`)
      .send(mockedContact);

    expect(response.status).toBe(401);
  });

  test("GET /contacts - should be able to list contacts", async () => {
    const response = await request(app).get("/contacts").set("Authorization", `Bearer ${token}`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.status).toBe(200);
  });

  test("GET /contacts - Should not be able to list a contacts without token", async () => {
    const response = await request(app).get("/contacts");

    expect(response.status).toBe(401);
  });

  test("GET /contacts - Should not be able to list a contacts with invalid token", async () => {
    const response = await request(app).get("/contacts").set("Authorization", `Bearer 777`);

    expect(response.status).toBe(401);
  });

  test("GET /contacts/:id - should be able to list specific contact", async () => {
    const contact = await request(app).get("/contacts").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .get(`/contacts/${contact.body[0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("emails");
    expect(response.body).toHaveProperty("phones");
    expect(response.status).toBe(200);
  });

  test("GET /contacts/:id - should not be able to list specific contact if invalid id", async () => {
    const response = await request(app)
      .get("/contacts/777")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  test("GET /contacts/:id - Should not be able to list a contact without token", async () => {
    const contact = await request(app).get("/contacts").set("Authorization", `Bearer ${token}`);
    const response = await request(app).get(`/contacts/${contact.body[0].id}`);

    expect(response.status).toBe(401);
  });

  test("GET /contacts/:id - Should not be able to list a contact with invalid token", async () => {
    const contact = await request(app).get("/contacts").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .get(`/contacts/${contact.body[0].id}`)
      .set("Authorization", `Bearer 777`);

    expect(response.status).toBe(401);
  });

  test("PATCH /contacts/:id - should be able to update specific contact", async () => {
    const contact = await request(app).get("/contacts").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .patch(`/contacts/${contact.body[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Jorge" });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("emails");
    expect(response.body).toHaveProperty("phones");
    expect(response.status).toBe(200);
  });

  test("PATCH /contacts/:id - should not be able to update specific contact if invalid id", async () => {
    const response = await request(app)
      .get("/contacts/777")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  test("PATCH /contacts/:id - should not be able to update specific contact if whitout fields", async () => {
    const contact = await request(app).get("/contacts").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .patch(`/contacts/${contact.body[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
  });

  test("PATCH /contacts/:id - Should not be able to update a contact without token", async () => {
    const contact = await request(app).get("/contacts").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .patch(`/contacts/${contact.body[0].id}`)
      .send({ name: "Jorge" });

    expect(response.status).toBe(401);
  });

  test("PATCH /contacts/:id - Should not be able to update a contact with invalid token", async () => {
    const contact = await request(app).get("/contacts").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .patch(`/contacts/${contact.body[0].id}`)
      .set("Authorization", `Bearer 777`)
      .send({ name: "Jorge" });

    expect(response.status).toBe(401);
  });

  test("DELETE /contacts/:id - should not be able to delete specific contact if invalid id", async () => {
    const response = await request(app)
      .delete("/contacts/777")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  test("DELETE /contacts/:id - Should not be able to delete a contact without token", async () => {
    const contact = await request(app).get("/contacts").set("Authorization", `Bearer ${token}`);
    const response = await request(app).delete(`/contacts/${contact.body[0].id}`);

    expect(response.status).toBe(401);
  });

  test("DELETE /contacts/:id - Should not be able to delete a contact with invalid token", async () => {
    const contact = await request(app).get("/contacts").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .delete(`/contacts/${contact.body[0].id}`)
      .set("Authorization", `Bearer 777`);

    expect(response.status).toBe(401);
  });

  test("DELETE /contacts - should be able to delete specific contact", async () => {
    const contact = await request(app).get("/contacts").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .delete(`/contacts/${contact.body[0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
