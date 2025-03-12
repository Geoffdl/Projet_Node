const request = require(`supertest`);
const app = require(`../index`);
const db = require("../config/db");

describe("Bar Controller", () => {
    afterAll(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await db.close();
    });
    it("should get all bars", async () => {
        const response = await request(app).get("/bars");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
