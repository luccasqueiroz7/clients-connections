import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedClient,
  mockedClientUdpate,
  mockedClientWhitoutName,
  mockedClientWhitoutPassword,
  mockedClientWhitoutUsername,
} from "../../mocks";

describe("clients", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /clients - Must be able to create a client", async () => {
    const response = await request(app).post("/clients").send(mockedClient);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("username");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("emails");
    expect(response.body).toHaveProperty("phones");
    expect(response.body).toHaveProperty("contacts");
    expect(response.status).toBe(201);
  });

  test("POST /clients - Should not be able to create a client without name", async () => {
    const response = await request(app).post("/clients").send(mockedClientWhitoutName);

    expect(response.status).toBe(400);
  });

  test("POST /clients - Should not be able to create a client without username", async () => {
    const response = await request(app).post("/clients").send(mockedClientWhitoutUsername);

    expect(response.status).toBe(400);
  });

  test("POST /clients - Should not be able to create a client without password", async () => {
    const response = await request(app).post("/clients").send(mockedClientWhitoutPassword);

    expect(response.status).toBe(400);
  });

  test("POST /clients - Should not be able to create a client if username exists", async () => {
    await request(app).post("/clients").send(mockedClient);
    const response = await request(app).post("/clients").send(mockedClient);

    expect(response.status).toBe(400);
  });

  test("GET /clients - should be able to list clients", async () => {
    const response = await request(app).get("/clients");

    expect(response.body[0]).toHaveProperty("id");
    expect(response.status).toBe(200);
  });

  test("GET /clients/:id - should be able to list specific client", async () => {
    const client = await request(app).get("/clients");
    const response = await request(app).get(`/clients/${client.body[0].id}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("username");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("emails");
    expect(response.body).toHaveProperty("phones");
    expect(response.body).toHaveProperty("contacts");
    expect(response.status).toBe(200);
  });

  test("GET /clients/:id - should not be able to list specific client if invalid id", async () => {
    const response = await request(app).get("/clients/777");

    expect(response.status).toBe(404);
  });

  test("PATCH /clients/:id - should be able to update specific client", async () => {
    const client = await request(app).get("/clients");
    const response = await request(app)
      .patch(`/clients/${client.body[0].id}`)
      .send(mockedClientUdpate);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("username");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("emails");
    expect(response.body).toHaveProperty("phones");
    expect(response.body).toHaveProperty("contacts");
    expect(response.status).toBe(200);
  });

  test("PATCH /clients/:id - should not be able to update specific client if invalid id", async () => {
    const response = await request(app).get("/clients/777");

    expect(response.status).toBe(404);
  });

  test("PATCH /clients/:id - should not be able to update specific client if whitout fields", async () => {
    const client = await request(app).get("/clients");
    const response = await request(app).patch(`/clients/${client.body[0].id}`).send({});

    expect(response.status).toBe(400);
  });

  test("PATCH /clients - Should not be able to update a client if username exists", async () => {
    const client = await request(app).get("/clients");
    const response = await request(app)
      .patch(`/clients/${client.body[0].id}`)
      .send({ username: client.body[0].username });

    expect(response.status).toBe(400);
  });

  test("DELETE /clients/:id - should not be able to delete specific client if invalid id", async () => {
    const response = await request(app).delete("/clients/777");

    expect(response.status).toBe(404);
  });

  test("DELETE /clients - should be able to delete specific client", async () => {
    const client = await request(app).get("/clients");
    const response = await request(app).delete(`/clients/${client.body[0].id}`);

    expect(response.status).toBe(204);
  });
});
