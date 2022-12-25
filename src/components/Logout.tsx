import React from "react";
import { Button } from "react-bootstrap";

const Logout = ({setToken, setUser, setCart}: any) => {

  return (
    <Button
      onClick={() => {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
        setCart(null);
      }}
    >
      Log Out
    </Button>
  );
}

export default Logout;