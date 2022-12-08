import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedClient, mockedClientLogin } from "../../mocks";

describe("phones", () => {
  let connection: DataSource;
  let token = "";
  let client = "";
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
    const getClient = await request(app).get("/clients");
    token = login.body.token;
    client = getClient.body[0].id;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /phones - Must be able to create a phone", async () => {
    const response = await request(app)
      .post("/phones")
      .set("Authorization", `Bearer ${token}`)
      .send({ number: "(75)99245-8661", clientId: `${client}` });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("number");
    expect(response.status).toBe(201);
  });

  test("POST /phones - Should not be able to create a phone without phone", async () => {
    const response = await request(app)
      .post("/phones")
      .set("Authorization", `Bearer ${token}`)
      .send({ clientId: `${client}` });

    expect(response.status).toBe(400);
  });

  test("POST /phones - Should not be able to create a phone without clientId and contactId", async () => {
    const response = await request(app)
      .post("/phones")
      .set("Authorization", `Bearer ${token}`)
      .send({ number: "(75)99245-8661" });

    expect(response.status).toBe(404);
  });

  test("POST /phones - Should not be able to create a phone without token", async () => {
    const response = await request(app)
      .post("/phones")
      .send({ number: "(75)99245-8661", clientId: `${client}` });

    expect(response.status).toBe(401);
  });

  test("POST /phones - Should not be able to create a phone with invalid token", async () => {
    const response = await request(app)
      .post("/phones")
      .set("Authorization", `Bearer 777`)
      .send({ number: "(75)99245-8661", clientId: `${client}` });

    expect(response.status).toBe(401);
  });

  test("GET /phones - should be able to list phones", async () => {
    const response = await request(app).get("/phones").set("Authorization", `Bearer ${token}`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.status).toBe(200);
  });

  test("GET /phones - Should not be able to list a phones without token", async () => {
    const response = await request(app).get("/phones");

    expect(response.status).toBe(401);
  });

  test("GET /phones - Should not be able to list a phones with invalid token", async () => {
    const response = await request(app).get("/phones").set("Authorization", `Bearer 777`);

    expect(response.status).toBe(401);
  });

  test("GET /phones/:id - should be able to list specific phone", async () => {
    const phone = await request(app).get("/phones").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .get(`/phones/${phone.body[0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("number");
    expect(response.status).toBe(200);
  });

  test("GET /phones/:id - should not be able to list specific phone if invalid id", async () => {
    const response = await request(app).get("/phones/777").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  test("GET /phones/:id - Should not be able to list a phone without token", async () => {
    const phone = await request(app).get("/phones").set("Authorization", `Bearer ${token}`);
    const response = await request(app).get(`/phones/${phone.body[0].id}`);

    expect(response.status).toBe(401);
  });

  test("GET /phones/:id - Should not be able to list a phone with invalid token", async () => {
    const phone = await request(app).get("/phones").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .get(`/phones/${phone.body[0].id}`)
      .set("Authorization", `Bearer 777`);

    expect(response.status).toBe(401);
  });

  test("PATCH /phones/:id - should be able to update specific phone", async () => {
    const phone = await request(app).get("/phones").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .patch(`/phones/${phone.body[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ number: "(75)99245-8661" });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("number");
    expect(response.status).toBe(200);
  });

  test("PATCH /phones/:id - should not be able to update specific phone if invalid id", async () => {
    const response = await request(app).get("/phones/777").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  test("PATCH /phones/:id - should not be able to update specific phone if whitout fields", async () => {
    const phone = await request(app).get("/phones").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .patch(`/phones/${phone.body[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
  });

  test("PATCH /phones/:id - Should not be able to update a phone without token", async () => {
    const phone = await request(app).get("/phones").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .patch(`/phones/${phone.body[0].id}`)
      .send({ number: "(75)99245-8661" });

    expect(response.status).toBe(401);
  });

  test("PATCH /phones/:id - Should not be able to update a phone with invalid token", async () => {
    const phone = await request(app).get("/phones").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .patch(`/phones/${phone.body[0].id}`)
      .set("Authorization", `Bearer 777`)
      .send({ number: "(75)99245-8661" });

    expect(response.status).toBe(401);
  });

  test("DELETE /phones/:id - should not be able to delete specific phone if invalid id", async () => {
    const response = await request(app)
      .delete("/phones/777")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  test("DELETE /phones/:id - Should not be able to delete a phone without token", async () => {
    const phone = await request(app).get("/phones").set("Authorization", `Bearer ${token}`);
    const response = await request(app).delete(`/phones/${phone.body[0].id}`);

    expect(response.status).toBe(401);
  });

  test("DELETE /phones/:id - Should not be able to delete a phone with invalid token", async () => {
    const phone = await request(app).get("/phones").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .delete(`/phones/${phone.body[0].id}`)
      .set("Authorization", `Bearer 777`);

    expect(response.status).toBe(401);
  });

  test("DELETE /phones - should be able to delete specific phone", async () => {
    const phone = await request(app).get("/phones").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .delete(`/phones/${phone.body[0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
