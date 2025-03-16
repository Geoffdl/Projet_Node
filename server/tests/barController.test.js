const request = require(`supertest`);
const app = require(`../index`);
const db = require("../config/db");

const testDataBar = {
    nom: "Bob",
    adresse: "03 rue des tomates",
    tel: "0305090310",
    email: "test@test.com",
    description: "Test Description",
};

// beforeAll(async () => {
//     await db.sync({ force: true });

//     await request(app).post("/bars").send(testDataBar).expect(200);
// });

beforeAll(async () => {
    try {
        await db.authenticate();
        await db.sync({ force: true });
        const response = await request(app).post("/bars").send(testDataBar);
        console.log("Setup response:", response.body); // This will help debug
    } catch (error) {
        console.error("Setup error:", error);
        throw error;
    }
});
//beforeEach
//afterEach

afterAll(async () => {
    try {
        await db.close();
    } catch (error) {
        console.error("Error closing database:", error);
    }
});

describe("Bar Controller", () => {
    it("should get all bars", async () => {
        const response = await request(app).get("/bars");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0].nom).toBe("Bob");
    });

    it("should get one bar", async () => {
        const response = await request(app).get("/bars/1");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    // it("should create a bar", async () => {
    //     const response = await request(app).post("/bars");
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toBeInstanceOf(Array);
    // });

    // it("should update a bar", async () => {
    //     const response = await request(app).put("/bars/1");
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toBeInstanceOf(Array);
    // });

    // it("should delete a bar", async () => {
    //     const response = await request(app).delete("/bars/1");
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toBeInstanceOf(Array);
    // });
});
