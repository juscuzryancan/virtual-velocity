import { Link } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/slices/authSlice";
import { ShoppingCart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

type NavigationProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navigation = ({ setShowModal }: NavigationProps) => {
  let token = useAppSelector(selectCurrentToken);
  let numOfItems = 0;

  return (
    <div className="flex w-full justify-between items-center bg-slate-900 border-b border-slate-700 p-4">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center space-x-6">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/"
                className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
              >
                Virtual Traders
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/products" className="text-white hover:text-blue-400">
                Products
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {token && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/account" className="text-white hover:text-blue-400">
                  Account
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <Link
        to="/cart"
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <ShoppingCart size={20} />
        <span>Cart {numOfItems ? `(${numOfItems})` : ""}</span>
      </Link>
    </div>
  );
};

export default Navigation;
