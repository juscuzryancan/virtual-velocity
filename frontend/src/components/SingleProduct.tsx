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
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type SingleProductProps = {
  product: Product;
};

const SingleProduct = ({ product }: SingleProductProps) => {
  const token = useAppSelector(selectCurrentToken);
  const [addProductToCart] = useAddProductToOrderMutation();
  const { data: cart } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { id, imageURL, name, description, category, inStock, price } = product;

  const handleAddToCart = async () => {
    if (cart?.products.find((product) => product.id === id)) {
      swal({
        text: "Product is currently in your cart. You can modify the quantity in your cart",
        icon: "warning",
      });
      return;
    }

    try {
      await addProductToCart({
        orderId: cart?.id,
        productId: id,
        price,
        quantity: 1,
      }).unwrap();
      swal({
        text: "Product has been added to your cart. You can modify the quantity in your cart",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="h-[500px] w-[300px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center h-48 mb-4">
          <img
            className="max-h-full max-w-full object-contain"
            src={imageURL}
            alt={name}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">{category}</p>
          <p className="text-lg font-semibold">${(price / 100).toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter>
        {inStock ? (
          <Button className="bg-blue-600 " onClick={handleAddToCart}>
            Add To Cart
          </Button>
        ) : (
          <div className="flex justify-center p-2 m-4 bg-red-600 text-white">
            Out of stock
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SingleProduct;
