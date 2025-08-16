import { SingleProduct } from '.';
import { useGetProductsQuery } from '../redux/slices/productApiSlice';
import { Product } from '../types';
import Loader from './Loader';

const Products = () => {

  const {
    data: products,
    isLoading
  } = useGetProductsQuery();

  if (isLoading) return <Loader />;

  return (
      <div className="flex flex-wrap gap-8 px-16 py-8 w-full justify-center">
        {products && products.map((product: Product) => <SingleProduct key={product.id} product={product}/>)}
      </div>
  );
};

export default Products;
