const Router = require("koa-router");

const User = require("../models/Users");

const router = new Router().prefix("/users");

router.get("/:_id", async (ctx) => {
  const user = await User.findById(ctx.params._id);
  if (user) {
    ctx.body = user;
  } else {
    ctx.throw(404);
  }
});





module.exports = router.routes();
