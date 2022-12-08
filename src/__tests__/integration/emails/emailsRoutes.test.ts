import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedClient, mockedClientLogin } from "../../mocks";

describe("emails", () => {
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

  test("POST /emails - Must be able to create a email", async () => {
    const response = await request(app)
      .post("/emails")
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "rutequeiroz7@gmail", clientId: `${client}` });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.status).toBe(201);
  });

  test("POST /emails - Should not be able to create a email without email", async () => {
    const response = await request(app)
      .post("/emails")
      .set("Authorization", `Bearer ${token}`)
      .send({ clientId: `${client}` });

    expect(response.status).toBe(400);
  });

  test("POST /emails - Should not be able to create a email without clientId and contactId", async () => {
    const response = await request(app)
      .post("/emails")
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "luccas@mail.com" });

    expect(response.status).toBe(404);
  });

  test("POST /emails - Should not be able to create a email without token", async () => {
    const response = await request(app)
      .post("/emails")
      .send({ email: "rutequeiroz7@gmail", clientId: `${client}` });

    expect(response.status).toBe(401);
  });

  test("POST /emails - Should not be able to create a email with invalid token", async () => {
    const response = await request(app)
      .post("/emails")
      .set("Authorization", `Bearer 777`)
      .send({ email: "rutequeiroz7@gmail", clientId: `${client}` });

    expect(response.status).toBe(401);
  });

  test("GET /emails - should be able to list emails", async () => {
    const response = await request(app).get("/emails").set("Authorization", `Bearer ${token}`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.status).toBe(200);
  });

  test("GET /emails - Should not be able to list a emails without token", async () => {
    const response = await request(app).get("/emails");

    expect(response.status).toBe(401);
  });

  test("GET /emails - Should not be able to list a emails with invalid token", async () => {
    const response = await request(app).get("/emails").set("Authorization", `Bearer 777`);

    expect(response.status).toBe(401);
  });

  test("GET /emails/:id - should be able to list specific email", async () => {
    const email = await request(app).get("/emails").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .get(`/emails/${email.body[0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.status).toBe(200);
  });

  test("GET /emails/:id - should not be able to list specific email if invalid id", async () => {
    const response = await request(app).get("/emails/777").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  test("GET /emails/:id - Should not be able to list a email without token", async () => {
    const email = await request(app).get("/emails").set("Authorization", `Bearer ${token}`);
    const response = await request(app).get(`/emails/${email.body[0].id}`);

    expect(response.status).toBe(401);
  });

  test("GET /emails/:id - Should not be able to list a email with invalid token", async () => {
    const email = await request(app).get("/emails").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .get(`/emails/${email.body[0].id}`)
      .set("Authorization", `Bearer 777`);

    expect(response.status).toBe(401);
  });

  test("PATCH /emails/:id - should be able to update specific email", async () => {
    const email = await request(app).get("/emails").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .patch(`/emails/${email.body[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "rute@mail.com" });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.status).toBe(200);
  });

  test("PATCH /emails/:id - should not be able to update specific email if invalid id", async () => {
    const response = await request(app).get("/emails/777").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  test("PATCH /emails/:id - should not be able to update specific email if whitout fields", async () => {
    const email = await request(app).get("/emails").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .patch(`/emails/${email.body[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
  });

  test("PATCH /emails/:id - Should not be able to update a email without token", async () => {
    const email = await request(app).get("/emails").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .patch(`/emails/${email.body[0].id}`)
      .send({ email: "rute@mail.com" });

    expect(response.status).toBe(401);
  });

  test("PATCH /emails/:id - Should not be able to update a email with invalid token", async () => {
    const email = await request(app).get("/emails").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .patch(`/emails/${email.body[0].id}`)
      .set("Authorization", `Bearer 777`)
      .send({ email: "rute@mail.com" });

    expect(response.status).toBe(401);
  });

  test("DELETE /emails/:id - should not be able to delete specific email if invalid id", async () => {
    const response = await request(app)
      .delete("/emails/777")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  test("DELETE /emails/:id - Should not be able to delete a email without token", async () => {
    const email = await request(app).get("/emails").set("Authorization", `Bearer ${token}`);
    const response = await request(app).delete(`/emails/${email.body[0].id}`);

    expect(response.status).toBe(401);
  });

  test("DELETE /emails/:id - Should not be able to delete a email with invalid token", async () => {
    const email = await request(app).get("/emails").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .delete(`/emails/${email.body[0].id}`)
      .set("Authorization", `Bearer 777`);

    expect(response.status).toBe(401);
  });

  test("DELETE /emails - should be able to delete specific email", async () => {
    const email = await request(app).get("/emails").set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .delete(`/emails/${email.body[0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
