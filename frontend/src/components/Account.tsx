import { useGetMeQuery } from "@/redux/slices/authApiSlice";
import { useGetOrdersByUserQuery } from "../redux/slices/ordersApiSlice";
import Loader from "./Loader";
import { selectCurrentUser } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";

const Account = () => {
  const {
    isLoading: userLoading,
    isError: userError,
    data: user,
  } = useGetMeQuery();

  const {
    isLoading: orderLoading,
    isError: orderError,
    data: orders,
  } = user ? useGetOrdersByUserQuery(,{
  skip: true;
  });

  let content;
  // if (isLoading) {
  //   content = <Loader />;
  // } else if (isError) {
  //   content = (
  //     <div>There was an error loading your orders. Please try again.</div>
  //   );
  // } else if (orders?.length === 0) {
  //   content = <div>You have no orders.</div>;
  // } else {
  //   content = orders?.map((order: any) => {
  //     return <div>order id: {order.id}</div>;
  //   });
  // }

  return <div className="flex justify-center items-center p-16">{content}</div>;
};

export default Account;
