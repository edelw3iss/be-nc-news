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
  // ----- /api/topics -----
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
  //----- /api/articles/:article_id -----
  describe("/api/articles/:article_id", () => {
    describe("GET", () => {
      test("status: 200 - responds with a specified article object", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            expect(body.article).toEqual(
              expect.objectContaining({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: expect.any(String),
                votes: 100,
              })
            );
          });
      });
      // ----- ticket 5 -----
      test("status: 200 - response contains comment_count when comments exist", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            expect(body.article).toEqual(
              expect.objectContaining({ comment_count: 11 })
            );
          });
      });
      test("status: 200 - response contains comment_count of 0 when no comments exist", () => {
        return request(app)
          .get("/api/articles/2")
          .expect(200)
          .then(({ body }) => {
            expect(body.article).toEqual(
              expect.objectContaining({ comment_count: 0 })
            );
          });
      });
      test("status:400 - responds with err msg for INVALID article_id", () => {
        return request(app)
          .get("/api/articles/not-an-id")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("bad request - invalid input");
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
      test("status: 201 - responds with a specified article object with updated votes, when negative", () => {
        const votesUpdate = { inc_votes: -100 };
        return request(app)
          .patch("/api/articles/1")
          .send(votesUpdate)
          .expect(201)
          .then(({ body }) => {
            expect(body.article).toEqual(
              expect.objectContaining({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: expect.any(String),
                votes: 0,
              })
            );
          });
      });
      test("status:400 - responds with err msg for INVALID Type of new votes", () => {
        const votesUpdate = { inc_votes: "no-a-number-of-votes" };
        return request(app)
          .patch("/api/articles/1")
          .send(votesUpdate)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("bad request - invalid input");
          });
      });
      test("status:400 - responds with err msg for required fields missing", () => {
        const votesUpdate = {};
        return request(app)
          .patch("/api/articles/1")
          .send(votesUpdate)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("bad request - invalid input");
          });
      });
      test("status:400 - responds with err msg for INVALID article_id", () => {
        const votesUpdate = { inc_votes: 1 };
        return request(app)
          .patch("/api/articles/not-an-id")
          .send(votesUpdate)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("bad request - invalid input");
          });
      });
      test("status: 404 - responds with err msg for VALID but NON-EXISTENT article_id", () => {
        const votesUpdate = { inc_votes: 1 };
        return request(app)
          .patch("/api/articles/50")
          .send(votesUpdate)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("article not found");
          });
      });
    });
  });
  // ----- /api/users -----
  describe("/api/users", () => {
    describe("GET", () => {
      test("status: 200 - responds with an array of objects containing users", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body }) => {
            expect(body.users).toHaveLength(4);
            body.users.forEach((user) => {
              expect(user).toEqual(
                expect.objectContaining({
                  username: expect.any(String),
                })
              );
            });
          });
      });
    });
  });
  // ----- /api/articles -----
  describe("/api/articles", () => {
    describe("GET", () => {
      test("status: 200 - responds with an array of articles objects", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toHaveLength(12);
            body.articles.forEach((article) => {
              expect(article).toEqual(
                expect.objectContaining({
                  article_id: expect.any(Number),
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                })
              );
            });
          });
      });
      test("responds with an array sorted by descending date order", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toBeSortedBy("created_at", {
              descending: true,
            });
          });
      });
      test("status: 200 - all responses contains comment_count", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toHaveLength(12);
            body.articles.forEach((article) => {
              expect(article).toEqual(
                expect.objectContaining({ comment_count: expect.any(Number) })
              );
            });
          });
      });
    });
  });
  // ----- /api/articles/:article_id/comments -----
  describe("/api/articles/:article_id/comments", () => {
    describe("GET", () => {
      test("status:200, responds with an array of comments for specified article, if comments exist", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).toHaveLength(11);
            body.comments.forEach((comment) => {
              expect(comment).toEqual(
                expect.objectContaining({
                  comment_id: expect.any(Number),
                  votes: expect.any(Number),
                  created_at: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                })
              );
            });
          });
      });
      test("status:200, responds with an empty array of comments for specified article if no comments exist", () => {
        return request(app)
          .get("/api/articles/2/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).toEqual([]);
          });
      });
      test("status:404 for a VALID but NON-EXISTENT article_id", () => {
        return request(app)
          .get("/api/articles/9999/comments")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("article not found");
          });
      });
      test("status:400 - responds with err msg for INVALID article_id", () => {
        return request(app)
          .get("/api/articles/not-an-id/comments")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("bad request - invalid input");
          });
      });
    });
    describe("POST", () => {
      test("status: 201 - responds with the posted comment", () => {
        const newComment = {
          username: "butter_bridge",
          body: "This article is amazing!",
        };
        return request(app)
          .post("/api/articles/2/comments")
          .send(newComment)
          .expect(201)
          .then(({ body }) => {
            expect(body.comment).toEqual(
              expect.objectContaining({
                comment_id: 19,
                votes: 0,
                created_at: expect.any(String),
                author: "butter_bridge",
                body: "This article is amazing!",
                article_id: 2,
              })
            );
          });
      });
      test("status: 404 - responds with err msg for VALID but NON-EXISTENT article_id", () => {
        const newComment = {
          username: "butter_bridge",
          body: "This article is amazing!",
        };
        return request(app)
          .post("/api/articles/50/comments")
          .send(newComment)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("article not found");
          });
      });
    });
  });
});
