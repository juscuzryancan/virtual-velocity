import { Link } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/slices/authSlice";
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
  const token = useAppSelector(selectCurrentToken);

  return (
    <div className="flex w-full">
      <NavigationMenu className="grow bg-slate-900 border-b border-slate-700 p-4">
        <NavigationMenuList className="">
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

          {/* Right side - Navigation links grouped together */}
          <div className="flex items-center space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/products" className="text-white hover:text-blue-400">
                  Products
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {token && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/account"
                      className="text-white hover:text-blue-400"
                    >
                      Account
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/cart" className="text-white hover:text-blue-400">
                      Cart
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="grow bg-slate-900 border-b border-slate-700 p-4"></div>
    </div>
  );
};

export default Navigation;
