exports.getEndpoints = (req, res, next) => {
  res
    .status(200)
    .send({
      "GET /api": {
        description:
          "serves up a json representation of all the available endpoints of the api",
      },
      "GET /api/topics": {
        description: "serves an array of all topics",
        queries: [],
        exampleResponse: {
          topics: [{ slug: "football", description: "Footie!" }],
        },
      },
      "GET /api/articles": {
        description: "serves an array of all topics",
        queries: ["topic", "sort_by", "order_by"],
        exampleResponse: {
          articles: [
            {
              article_id: 34,
              title: "Seafood substitutions are increasing",
              topic: "cooking",
              author: "weegembump",
              created_at: "2021-01-01T12:00:00Z",
              votes: 64,
              comment_count: 5,
            },
          ],
        },
      },
      "GET /api/articles/:article_id": {
        description: "serves an article object",
        queries: [],
        exampleResponse: {
          article: {
            article_id: 2,
            title: "Seafood substitutions are increasing",
            topic: "cooking",
            author: "weegembump",
            body: "Text from the article..",
            created_at: "2021-01-01T12:00:00Z",
            votes: 20,
            comment_count: 4,
          },
        },
      },
      "PATCH /api/articles/:article_id": {
        description:
          "allows user to update votes on an article and serves an update article object",
        exampleInput: { inc_votes: 10 },
        exampleResponse: {
          article: {
            article_id: 2,
            title: "Seafood substitutions are increasing",
            topic: "cooking",
            author: "weegembump",
            body: "Text from the article..",
            created_at: "2021-01-01T12:00:00Z",
            votes: 30,
          },
        },
      },
      "GET /api/articles/:article_id/comments": {
        description: "serves an array of comments for specified article",
        queries: [],
        exampleResponse: {
          comments: [
            {
              comment_id: 23,
              votes: 3,
              "created-at": "2021-01-01T12:00:00Z",
              author: "poppy_petal",
              body: "This article was ...",
            },
          ],
        },
      },
      "POST /api/articles/:article_id/comments": {
        description:
          "allows user to post a comment for an article and serves an object with the posted comment",
        exampleInput: {
          username: "poppy_petal",
          body: "This article is ...",
        },
        exampleResponse: {
          comment: {
            comment_id: 23,
            votes: 3,
            "created-at": "2021-01-01T12:00:00Z",
            author: "poppy_petal",
            body: "This article was ...",
          },
        },
      },
      "DELETE /api/comments/:comment_id": {
        Description: "deletes specified comment",
      },
      "GET /api/users": {
        description: "serves an array of all users",
        queries: [],
        exampleResponse: {
          users: [{ username: "poppy_petal" }, { username: "violet22" }],
        },
      },
    })
    .catch(next);
};
