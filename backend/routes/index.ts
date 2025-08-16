import express from "express";
import jwt from "jsonwebtoken";
import usersRouter from "./users";
import productsRouter from "./products";
import stripeRouter from "./stripe";
import ordersRouter from "./orders";
import orderProductsRouter from "./order_products";
import { getUserById } from "../db/utils";
const apiRouter = express.Router();
const { JWT_SECRET } = process.env;

apiRouter.use(async (req: any, res: any, next: any) => {
  const prefix = "Bearer ";
  const auth = req.get("authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET as string) as any;

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

apiRouter.use((req: any, res: any, next: any) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/stripe", stripeRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/order_products", orderProductsRouter);

// 404 handler
apiRouter.get("*", (req: any, res: any, next: any) => {
  res.status(404).send("Page was not found");
});

export default apiRouter;
