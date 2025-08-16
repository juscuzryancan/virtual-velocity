import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/slices/authSlice";
import Login from "./Login";
import Logout from "./Logout";
import Button from "react-bootstrap/Button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

type NavigationProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navigation = ({ setShowModal }: NavigationProps) => {
  const token = useAppSelector(selectCurrentToken);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  // return (
  //   <Navbar className="flex justify-between" bg="dark" variant="dark">
  //     <div className="flex items-center">
  //       <Navbar.Brand className="ml-4">
  //         <Link to="/">Virtual Velocity</Link>
  //       </Navbar.Brand>
  //       <Nav>
  //         <div className="flex gap-4">
  //           <Link className="text-white no-underline" to="/products">
  //             Products
  //           </Link>
  //           {token && (
  //             <>
  //               <Link className="text-white no-underline" to="/account">
  //                 Account
  //               </Link>
  //               <Link className="text-white no-underline" to="/cart">
  //                 Cart
  //               </Link>
  //             </>
  //           )}
  //         </div>
  //       </Nav>
  //     </div>
  //     <div className="flex gap-2 mr-2">
  //       {!token ? (
  //         <>
  //           <Login />
  //           <Button
  //             className="flex items-center text-white no-underline"
  //             onClick={() => setShowModal(true)}
  //           >
  //             Register
  //           </Button>
  //         </>
  //       ) : (
  //         <Logout />
  //       )}
  //     </div>
  //   </Navbar>
  // );
};

export default Navigation;
