import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logOut, selectCurrentToken } from "../redux/slices/authSlice";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetCartQuery } from "@/redux/slices/ordersApiSlice";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let token = useAppSelector(selectCurrentToken);
  const { data: cart, isLoading } = useGetCartQuery(undefined);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
    navigate("/");
  };

  return (
    <header className="flex w-full p-2 justify-between items-center bg-slate-900">
      <div>
        <Button
          asChild
          className="no-underline font-bold text-white"
          variant="link"
        >
          <Link to="/">Virtual Traders</Link>
        </Button>

        <Button asChild className="no-underline text-white" variant="link">
          <Link
            to="/products"
            className="no-underline text-white hover:text-blue-400"
          >
            Products
          </Link>
        </Button>

        {token ? (
          <>
            <Button asChild className="no-underline text-white" variant="link">
              <Link to="/account" className="text-white hover:text-blue-400">
                Account
              </Link>
            </Button>
            <Button
              className="bg-transparent text-white hover:underline underline-offset-4 hover:text-blue-400"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button asChild className="no-underline text-white" variant="link">
              <Link to="/login" className="text-white hover:text-blue-400">
                Login
              </Link>
            </Button>
            <Button asChild className="no-underline text-white" variant="link">
              <Link to="/register" className="text-white hover:text-blue-400">
                Register
              </Link>
            </Button>
          </>
        )}
      </div>
      <Link
        to="/cart"
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <ShoppingCart size={20} />
        <span>
          Cart{" "}
          {cart
            ? `(${cart.products.reduce((prev, curr) => {
                return prev + curr.quantity;
              }, 0)})`
            : "0"}
        </span>
      </Link>
    </header>
  );
};

export default Navigation;
