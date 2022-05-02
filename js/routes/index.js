const apiRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/utils");
const { JWT_SECRET = "hello" } = process.env;

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});

apiRouter.use("/users", require("./users"));
apiRouter.use("/products", require("./products"));
apiRouter.use("/orders", require("./orders"));
apiRouter.use("/order_products", require("./order_products"));
apiRouter.use("/stripe", require("./stripe"));

// 404 handler
apiRouter.get("*", (req, res, next) => {
  res.status(404).send("Page was not found");
});

module.exports = apiRouter;
