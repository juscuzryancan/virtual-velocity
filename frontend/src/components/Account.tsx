import { useGetOrdersByUserQuery } from '../redux/slices/ordersApiSlice';
import Loader from './Loader';

const Account = () => {

  const {
    data: orders,
    isLoading,
    isError
  } = useGetOrdersByUserQuery();

  let content;
  if (isLoading) {
    content = <Loader /> ;
  } else if (isError) {
    content = <div>
      There was an error loading your orders. Please try again.
    </div>
  } else if (orders?.length === 0) {
    content = <div>
      You have no orders.
    </div>;
  } else {
    content = orders?.map((order) => {
      return (
        <div>
          order id: {order.id}
        </div>
      )
    })
  }

  return (
    <div className="flex justify-center items-center p-16">
      {content}
    </div>
  )
}

export default Account;
