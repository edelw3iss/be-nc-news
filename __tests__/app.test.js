const request = require("supertest");
const data = require("../db/data");
const app = require("../app");
const seed = require("../db/seeds/seed");
const connection = require("../db/connection")

beforeEach(() => seed(data));
afterAll(() => connection.end());

describe("news-app", () => {
  test("status: 404 - responds with path not found message for incorrect path", () => {
    return request(app)
      .get("/api/not-an-endpoint")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("path not found");
      });
  });
  describe("/api/topics", () => {
    describe("GET", () => {
      test("status: 200 - responds with an array of topic objects", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).toHaveLength(3);
            body.topics.forEach((topic) => {
              expect(topic).toEqual(
                expect.objectContaining({
                  description: expect.any(String),
                  slug: expect.any(String),
                })
              );
            });
          });
      });
    });
  });
});
