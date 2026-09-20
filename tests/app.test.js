const request = require("supertest");
const app = require("../app");
const db = require("../config/db");

afterAll(async () => {
  await db.pool.end();
});

//root path
describe("GET /", () => {
  it("should return hello message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Hellow",
    });
  });
});

//get all users
describe("GET /api/users", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

//get user by id
describe("GET /api/users/:id", () => {
  it("should return user by id", async () => {
    const newUser = {
      name: "User Untuk Get By ID",
      email: `getbyid-${Date.now()}@example.com`,
      age: 25,
    };

    const postResponse = await request(app).post("/api/users").send(newUser);

    const userId = postResponse.body.userId;

    const response = await request(app).get(`/api/users/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(
      expect.objectContaining({
        id: userId,
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
      }),
    );
  });

  it("should return 404 when user is not found", async () => {
    const response = await request(app).get("/api/users/9999999");
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });
});

//bikin user baru
describe("POST /api/users", () => {
  it("should create a new user", async () => {
    const newUser = {
      name: "Test User",
      email: `test-${Date.now()}@example.com`,
      age: 25,
    };

    const response = await request(app).post("/api/users").send(newUser);

    console.log("POST RESPONSE:", response.body);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("User baru telah ditambahkan");
    expect(response.body.userId).toEqual(expect.any(Number));
  });
});

//edit user berdasarkan id
describe("PUT /api/users/:id", () => {
  it("should update an existing user", async () => {
    const newUser = {
      name: "User Untuk Update",
      email: `update-${Date.now()}@example.com`,
      age: 25,
    };

    // Buat user dulu
    const postResponse = await request(app).post("/api/users").send(newUser);

    const userId = postResponse.body.userId;

    const updatedUser = {
      name: "Updated User",
      email: `updated-${Date.now()}@example.com`,
      age: 26,
    };

    // Update user yang baru dibuat
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send(updatedUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should return 404 when user is not found", async () => {
    const updatedUser = {
      name: "Updated User",
      email: "updated@example.com",
      age: 26,
    };

    const response = await request(app)
      .put("/api/users/999999")
      .send(updatedUser);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });
});

//hapus user
describe("DELETE /api/users/:id", () => {
  it("should delete an existing user", async () => {
    const newUser = {
      name: "User Untuk Delete",
      email: `delete-${Date.now()}@example.com`,
      age: 25,
    };

    // Buat user dulu
    const postResponse = await request(app).post("/api/users").send(newUser);

    const userId = postResponse.body.userId;

    // Hapus user yang baru dibuat
    const response = await request(app).delete(`/api/users/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should return 404 when user is not found", async () => {
    const response = await request(app).delete("/api/users/999999");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });
});
