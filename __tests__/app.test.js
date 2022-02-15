const request = require("supertest");
const data = require("../db/data/test-data");
const app = require("../app");
const seed = require("../db/seeds/seed");
const connection = require("../db/connection");
const { convertTimestampToDate } = require("../db/helpers/utils");

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
  describe("/api/articles/:article_id", () => {
    describe("GET", () => {
      test("status: 200 - responds with a specified article object", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            expect(body.article).toEqual({
              article_id: 1,
              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              body: "I find this existence challenging",
              created_at: expect.any(String),
              votes: 100,
            });
          });
      });
      test("status:400 - responds with err msg for INVALID article_id", () => {
        return request(app)
          .get("/api/articles/not-an-id")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("bad request - invalid id");
          });
      });
      test("status: 404 - responds with err msg for VALID but NON-EXISTENT article_id", () => {
        return request(app)
          .get("/api/articles/50")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("article not found");
          });
      });
    });
    describe("PATCH", () => {
      test("status: 201 - responds with a specified article object with updated votes", () => {
        const votesUpdate = { inc_votes: 1 };
        return request(app)
          .patch("/api/articles/1")
          .send(votesUpdate)
          .expect(201)
          .then(({ body }) => {
            expect(body.article).toEqual({
              article_id: 1,
              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              body: "I find this existence challenging",
              created_at: expect.any(String),
              votes: 101,
            });
          });
      });
    });
  });
});
