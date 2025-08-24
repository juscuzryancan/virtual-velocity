import { Route, Routes } from "react-router";
import {
  Confirmation,
  Home,
  Cart,
  Navigation,
  Products,
  Account,
  Register,
  Login,
} from "./components";

const App = () => {
  return (
    <div className="flex flex-col">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders/:id" element={<Confirmation />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
};

export default App;
