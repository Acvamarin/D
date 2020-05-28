const Router = require("koa-router");
const passport = require("koa-passport");

const Post = require("../models/Post");

const router = new Router().prefix("/posts/:postId/dislikes");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const post = await Post.findById(ctx.params.postId);
    if (!post) {
      ctx.throw(404, "Post has not been found");
    }
    const user = ctx.state.user._id;
    if (post.dislikes.find((l) => l.user.toString() === user.toString())) {
      ctx.throw(400, "User already liked this post");
    }
    if (!post.likes.find((l) => l.user.toString() === user.toString())) {
      post.dislikes.unshift({ user });
      ctx.body = await post.save();
    }

  }
);

router.delete(
  "/:dislikeId",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const post = await Post.findById(ctx.params.postId);
    if (!post) {
      ctx.throw(404, "Post has not been found");
    }
    const dislikeIndex = post.dislikes.findIndex(
      (l) => l._id.toString() === ctx.params.dislikeId
    );
    if (dislikeIndex < 0) {
      ctx.throw(404, "Like has not been found");
    }
    post.dislikes.splice(dislikeIndex, 1);
    ctx.body = await post.save();
  }
);

module.exports = router.routes();
