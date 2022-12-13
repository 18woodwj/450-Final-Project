const { expect } = require("@jest/globals");
const supertest = require("supertest");
const { number } = require("yargs");
const results = require("./results.json")
const app = require('../server');

// **********************************
//         BASIC ROUTES TESTS
// **********************************

// Test example if you feel the need to use
test("GET /hello no parameters", async () => {
    await supertest(app).get("/hello?")
      .expect(200)
      .then((response) => {
        // Check text 
        expect(response.text).toBe("Hello! Welcome to the FIFA server!")
      });
});
