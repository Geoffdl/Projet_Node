const request = require(`supertest`);
const app = require(`../index`);
const db = require("../config/db");

beforeAll(async () => {
    await db.sync({ force: true }); // recreate the database schema
});

//beforeEach
//afterEach

afterAll(async () => {
    await db.close(); // Close the database connection
});

describe("Bar Controller", () => {
    it("should get all bars", async () => {
        const response = await request(app).get("/bars");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
