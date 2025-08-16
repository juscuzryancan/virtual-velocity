import Button from 'react-bootstrap/Button';
import { Product } from '../types';
import { useDeleteOrderProductMutation, useUpdateOrderProductMutation } from '../redux/slices/orderProductsApiSlice';


type CartItemProps = {
  product: Product;
}

const CartItem = ({
  product
} : CartItemProps) => {
  const {
    orderProductId,
    quantity,
    price
  } = product;

  const [updateOrderProduct] = useUpdateOrderProductMutation();
  const [deleteOrderProduct] = useDeleteOrderProductMutation();
  const handleIncrement = async () => {
    await updateOrderProduct({
      id: orderProductId,
      quantity: quantity+1,
      price
    }).unwrap();
  }

  const handleDecrement = async () => {
    if(quantity - 1 === 0) {
      await deleteOrderProduct({
        id: orderProductId
      }).unwrap();
      return;
    }

    await updateOrderProduct({
      id: orderProductId,
      quantity: quantity-1,
      price
    }).unwrap();
  }

  const handleRemove = async () => {
    await deleteOrderProduct({
      id: orderProductId
    }).unwrap();
  }

  return (
    <div 
      className='h-[200px] p-8
      flex justify-around items-center
      border border-black rounded'
    >
      <img className='object-fit w-[100px]' src={product.imageURL} />
      <div className="flex grow justify-center">
        {product.name}
      </div>
      <div className="flex grow justify-center">
        ${product.price / 100}
      </div>
      <div 
        className="flex basis-[40px] grow-0 shrink-0 gap-2 items-center"
      >
        <Button
          onClick={handleIncrement}
          variant='outline-primary'
        >
          +
        </Button>
        <div>
          {product.quantity}
        </div>
        <Button
          onClick={handleDecrement}
          variant='outline-danger'
        >
          -
        </Button>
      </div>
      <div className="ml-4 basis-[40px] grow-0 shrink-0 items-center">
        <Button
          onClick={handleRemove}
          variant='outline-danger'
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
