import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedClient, mockedClientLogin } from "../../mocks";

describe("login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/clients").send(mockedClient);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - Must be able to login a client", async () => {
    const response = await request(app).post("/login").send(mockedClientLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /login - Should not be able to login a client without username", async () => {
    const response = await request(app).post("/login").send({ password: "123456" });

    expect(response.status).toBe(400);
  });

  test("POST /login - Should not be able to login a client without password", async () => {
    const response = await request(app).post("/login").send({ username: "luccasqueiroz7" });

    expect(response.status).toBe(400);
  });

  test("POST /login - Should not be able to login a client with invalid username", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "luccas", password: "123456" });

    expect(response.status).toBe(403);
  });

  test("POST /login - Should not be able to login a client with incorret username", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "luccasqueiroz7", password: "123" });

    expect(response.status).toBe(403);
  });
});
