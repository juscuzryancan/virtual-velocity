import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/slices/authSlice";
import {
  useAddProductToOrderMutation,
  useGetCartQuery,
} from "../redux/slices/ordersApiSlice";
import { Product } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type SingleProductProps = {
  product: Product;
};

const SingleProduct = ({ product }: SingleProductProps) => {
  const token = useAppSelector(selectCurrentToken);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addProductToCart] = useAddProductToOrderMutation();
  const { data: cart } = useGetCartQuery(undefined);

  const { id, imageURL, name, description, category, inStock, price } = product;

  const handleAddToCart = async () => {
    try {
      await addProductToCart({
        orderId: cart?.id,
        productId: id,
        price,
        quantity: 1,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="h-auto w-[320px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center mb-4">
          <img className="h-[320px] w-auto" src={imageURL} alt={name} />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">{category}</p>
          <p className="text-lg font-semibold">${(price / 100).toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter>
        {!isInCart ? (
          <Button className="bg-blue-600 " onClick={handleAddToCart}>
            Add To Cart
          </Button>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setQuantity((quantity) => quantity - 1)}
            >
              -
            </Button>
            <p className="px-2 grow">{quantity}</p>
            <Button
              variant="outline"
              onClick={() => setQuantity((quantity) => quantity + 1)}
            >
              +
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );

  /* {/* <div className="flex justify-center p-2 m-4 bg-red-600 text-white"> */ /*   Out of stock */ /* </div> */
};

export default SingleProduct;
