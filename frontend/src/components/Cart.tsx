import { Button } from "@/components/ui/button";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/slices/authSlice";
import { useGetCartQuery } from "../redux/slices/ordersApiSlice";
import { useCreateStripeSessionMutation } from "../redux/slices/stripeApiSlice";
import { Order } from "../types";
import CartItem from "./CartItem";
import Loader from "./Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Cart = () => {
  const token = useAppSelector(selectCurrentToken);
  const { data: cart, isLoading } = useGetCartQuery(undefined);
  const subtotal = cart?.products
    .reduce((agg, curr) => {
      return (agg + curr.price * curr.quantity) / 100;
    }, 0)
    .toFixed(2);

  const [createStripeSession] = useCreateStripeSessionMutation();

  const handleCheckoutSession = async () => {
    console.log("hello");
    const { URL } = await createStripeSession({
      cart: cart as Order,
      baseURL: window.location.origin,
    }).unwrap();
    window.location.assign(URL);
  };

  if (isLoading) {
    return <Loader />;
  }

  const cartGrid = () => {
    if (cart?.products?.length === 0) {
      return <div>empty cart</div>;
    } else {
      return cart?.products.map((product) => {
        return <CartItem key={product.id} product={product} />;
      });
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="text-xl">Your Cart</div>
      <div className="flex flex-col gap-2">{cartGrid()}</div>
      <Button onClick={handleCheckoutSession} type="submit" variant="outline">
        Checkout
      </Button>
      <footer>
        <Card>
          <CardHeader>
            <CardTitle>Subtotal: {subtotal}</CardTitle>
          </CardHeader>
          <CardContent>
            Shipping & Taxes: Will be calculated during checkout
          </CardContent>
        </Card>
      </footer>
    </div>
  );
};

export default Cart;
