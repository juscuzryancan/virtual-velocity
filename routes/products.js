const router = require("express").Router();
const { requireUser, isAdmin } = require("./utils");

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  destroyProduct,
} = require("../db/utils");

router.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  const { name, description, price, inStock, imageURL, category } = req.body;
  try {
    const createdProduct = await createProduct({
      name,
      description,
      price,
      inStock,
      imageURL,
      category,
    });
    res.send(createdProduct);
  } catch (error) {
    next(error);
  }
});

router.patch("/:productId", isAdmin, async (req, res, next) => {
  const { productId } = req.params;

  try {
    const updatedProduct = await updateProduct({ id: productId, ...req.body });
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

router.delete("/:productId", isAdmin, async (req, res, next) => {
  const { productId } = req.params;

  try {
    const deletedProducts = await destroyProduct(productId);
    res.send(deletedProducts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
