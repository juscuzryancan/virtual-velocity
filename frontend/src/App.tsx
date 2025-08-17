import { Route, Routes } from "react-router";
import {
  Confirmation,
  Home,
  Cart,
  Navigation,
  Products,
  Register,
  Account,
} from "./components";
import { useState } from "react";

const App = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <Navigation setShowModal={setShowModal} />
      <Register showModal={showModal} setShowModal={setShowModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders/:id" element={<Confirmation />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
};

export default App;
