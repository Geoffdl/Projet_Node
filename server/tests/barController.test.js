const request = require(`supertest`);
const app = require(`../index`);
const db = require("../config/db");

const testDataBar = {
    "nom": "Bobs",
    "adresse": "45 rue des arc-en-ciel",
    "email": "madame@gmail.com",
    "tel": "01 23 45 67 89",
    "description": "Un bar chaleureux",
};

beforeAll(async () => {
    try {
        await db.authenticate();

        const response = await request(app).post("/bars").send(testDataBar);
        if (!response.ok) {
            console.log("Test data creation response:", response.body);
        }
    } catch (error) {
        console.error("Test setup error:", error);
        throw error;
    }
});

afterAll(async () => {
    try {
        const response = await request(app).get("/bars");
        for (const bar of response.body) {
            if (bar.nom === "Bobs" || bar.nom === "Test Bar" || bar.nom === "Updated Bob") {
                await request(app).delete(`/bars/${bar.id}`);
            }
        }
        await db.close();
    } catch (error) {
        console.error("Database cleanup error:", error);
        throw error;
    }
});

describe("Bar Controller", () => {
    it("should get all bars", async () => {
        const response = await request(app).get("/bars");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("should get one bar", async () => {
        const response = await request(app).get("/bars/1");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("should create a bar", async () => {
        const newBar = {
            nom: "Test Bar",
            adresse: "123 Test Street",
            tel: "0102030405",
            email: "test.bar@test.com",
            description: "A test bar",
        };
        const response = await request(app).post("/bars").send(newBar);
        expect(response.statusCode).toBe(200);
        expect(response.body.nom).toBe(newBar.nom);
    });

    it("should update a bar", async () => {
        const updatedData = {
            nom: "Updated Bob",
            description: "Updated Description",
        };
        const response = await request(app).put("/bars/1").send(updatedData);
        expect(response.statusCode).toBe(200);
        expect(response.body.nom).toBe(updatedData.nom);
    });

    it("should delete a bar", async () => {
        const response = await request(app).delete("/bars/1");
        expect(response.statusCode).toBe(200);

        const getResponse = await request(app).get("/bars/1");
        expect(getResponse.statusCode).toBe(404);
    });
});
