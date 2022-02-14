const request = require("supertest");
const data = require("../db/data");
const app = require("../app");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(data));

describe("news-app", () => {
  test("status: 404 - responds with path not found message for incorrect path", () => {
    return request(app)
      .get("/api/not-an-endpoint")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("path not found");
      });
  });
});
