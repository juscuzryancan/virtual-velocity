import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { 
    getProductById, 
    addProductToOrder 
} from "../api";
import "./index.css";

const SingleProduct = (props) => {
  const { token, user, cart, setCart, handleProductsDelete } = props;
  const [product, setProduct] = useState({});
  const { productId } = useParams();

  const handleInitialLoad = async () => {
    if (productId) {
      const fetchProduct = await getProductById(productId);
      setProduct(fetchProduct);
    } else {
      setProduct(props.product);
    }
  };

    const handleAddToCart = async () => {
        // grab the product of the card
        // place it into the product array of the cart
        cart.products.forEach(async (cartItem, index) => {
            if(cartItem.name === product.name){
                const productToAdd = {
                    ...product, 
                    quantity: cartItem.quantity + 1
                }
                await addProductToOrder({
                    orderId: cart.id, 
                    productId: product.id,
                    price: product.price,
                    quantity: productToAdd.quantity
                }, token);
                const newProducts = [...cart.products]
                newProducts.splice(index, 1, productToAdd);
                const newCart = {
                    ...cart,
                    products: newProducts
                }
                setCart(newCart);
                return;
            }
        })
    const newProducts = [...cart.products, product]
    const newCart = {
      ...cart,
      products: newProducts,
    };
    setCart(newCart);
    await addProductToOrder(
      {
        orderId: cart.id,
        productId: product.id,
        price: product.price,
        quantity: 1,
      },
      token
    );
  };

  useEffect(() => {
    handleInitialLoad();
  }, []);

  return (
    <>
      <div className="bodyWrapper">
        <Card
          style={{
            width: "45vh",
            marginTop: "5vh",
            marginBottom: "5vh",
            minHeight: "60rem",
            boxShadow: "5px 5px 12px grey",
          }}
        >
          <Card.Img
            style={{ height: "65vh", width: "100%" }}
            variant="top"
            src={product.imageURL}
          />
          <Card.Body>
            <Card.Title>
              <b>Name:</b> {product.name}
            </Card.Title>
            <Card.Text>
              <b>Description:</b> {product.description}
            </Card.Text>
            <Card.Text>
              <b>Price:</b> ${product.price / 100.0}
            </Card.Text>
            <Card.Text>
              <b>Category:</b> {product.category}
            </Card.Text>
            <Card.Text>
              <b>In Stock:</b> {product.inStock ? "Yes" : "No"}
            </Card.Text>
          </Card.Body>
          {Object.keys(user).length > 0 && (
            <Button className="btn btn-primary" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
          {user.isAdmin && (
            <Button
              style={{}}
              className="btn btn-danger"
              onClick={(event) => {
                // handleConfirmDelete();
                handleProductsDelete(product.id);
              }}
            >
              Delete
            </Button>
          )}
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
