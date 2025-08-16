import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAppSelector } from '../redux/hooks';
import { selectCurrentToken } from '../redux/slices/authSlice';
import { useGetCartQuery } from '../redux/slices/ordersApiSlice';
import { useCreateStripeSessionMutation } from '../redux/slices/stripeApiSlice';
import { Order, Product } from '../types';
import CartItem from './CartItem';
import Loader from './Loader';


const Cart = () => {
  const token = useAppSelector(selectCurrentToken);
  const {
    data: cart,
    isLoading,
  } = useGetCartQuery(
    undefined,
    {refetchOnMountOrArgChange: true}
  );

const [createStripeSession] = useCreateStripeSessionMutation();

  const handleCheckoutSession = async () => {
    const { URL } = await createStripeSession({
      cart: cart as Order,
      baseURL: window.location.origin
    }).unwrap();
    window.location.assign(URL);
  }

  if (!token) {
    return (
      <div>
        Please Login to access this page
      </div>
    );
  }

  if(isLoading) {
    return (
      <Loader />
    );
  }

  if(cart?.products.length === 0){
    return (
      <div>
        Your Cart has no products
      </div>
    );
  }
 
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className='text-xl'>
        Your Cart
      </div>
      <div className='flex flex-col gap-2'>
        {cart?.products?.map((product: Product) => <CartItem key={product.id} product={product}/>)}
      </div>
        <Button 
          onClick={handleCheckoutSession} 
          type="submit"
          variant="outline-primary"
        >
          Checkout
        </Button>
    </div>
  );
}

export default Cart;
