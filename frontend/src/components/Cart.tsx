import { Button } from "@/components/ui/button";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/slices/authSlice";
import { useGetCartQuery } from "../redux/slices/ordersApiSlice";
import { useCreateStripeSessionMutation } from "../redux/slices/stripeApiSlice";
import { Order, Product } from "../types";
import CartItem from "./CartItem";
import Loader from "./Loader";

const Cart = () => {
  const token = useAppSelector(selectCurrentToken);
  const { data: cart, isLoading } = useGetCartQuery(undefined);

  // const [createStripeSession] = useCreateStripeSessionMutation();

  const handleCheckoutSession = async () => {
    // const { URL } = await createStripeSession({
    //   cart: cart as Order,
    //   baseURL: window.location.origin,
    // }).unwrap();
    // window.location.assign(URL);
  };

  if (isLoading) {
    return <Loader />;
  }

  const cartGrid = () => {
    if (cart?.products?.length === 0) {
      return <div>empty cart</div>;
    } else {
      return cart?.products.map((product) => {
        return <div>{product.name}</div>;
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
    </div>
  );
};

export default Cart;
