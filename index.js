const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const posts = {};

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("type", type);
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  } else if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    console.log(data, id, content, postId);

    posts[postId].comments.push({ id, content, status });
  } else if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    console.log("data", id, content, postId, status);
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
  res.send({});
});
app.get("/posts", (req, res) => {
  console.log(JSON.stringify(posts, null, 2));
  res.send(posts);
});
app.listen(4002, () => {
  console.log("listening on 4002");
});
