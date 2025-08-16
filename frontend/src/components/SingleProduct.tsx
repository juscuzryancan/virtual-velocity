import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import { useAppSelector } from '../redux/hooks';
import { selectCurrentToken } from '../redux/slices/authSlice';
import { useAddProductToOrderMutation, useGetCartQuery } from '../redux/slices/ordersApiSlice';
import { Product } from '../types';

type SingleProductProps = {
  product: Product
}

const SingleProduct = ({product}: SingleProductProps) => {

  const token = useAppSelector(selectCurrentToken);
  const [addProductToCart] = useAddProductToOrderMutation();
  const {
    data: cart
  } = useGetCartQuery(
    undefined,
    {refetchOnMountOrArgChange: true}
  );

  const {
    id,
    imageURL,
    name,
    description,
    category,
    inStock,
    price
  } = product;

  const handleAddToCart = async () => {
    if (cart?.products.find((product) => product.id === id)) {
      swal({
        text: 'Product is currently in your cart. You can modify the quantity in your cart',
        icon: 'warning'
      });
      return;
    }

    try {
      await addProductToCart({
        orderId: cart?.id,
        productId: id,
        price,
        quantity: 1
      }).unwrap();
      swal({
        text: 'Product has been added to your cart. You can modify the quantity in your cart',
        icon: 'success'
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col rounded shadow basis-[30%]">
      <img className="w-full max-h-[40rem] rounded" src={imageURL}/>
      <div className="p-2 m-4">
        <div>
          <span className="font-bold">Name: </span> 
          {name}
        </div>
        <div>
          <span className="font-bold">Description: </span> 
          {description}
        </div>
        <div>
          <span className="font-bold">Category: </span> 
          {category}
        </div>
        <div>
          <span className="font-bold">Price: </span> 
          {price / 100}
        </div>
      </div>
      {token && <div>
        {inStock ? (
          <Button
            className="flex justify-center p-2 m-4 bg-blue-600 text-white"
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        ) : (
          <div className="flex justify-center p-2 m-4 bg-red-600 text-white">Out of stock</div>
        )}
      </div>}
    </div>
  );
}

export default SingleProduct;
