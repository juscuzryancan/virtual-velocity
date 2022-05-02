import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap"
import { getOrdersByUserId } from "../api";
import "./SingleOrder.css";

const SingleOrder = (props) => {
  const { order, isCart } = props;
  const { orderId } = useParams();

    const handleRemoveFromCart = async () => {
         
    };

    return (
        order &&
        <div className="single-order">
            <header className="order-info">
            <div> Order #{order.id} </div>
            <div> Order Status: {order.status} </div>
            <div> Order Placed: {order.datePlaced} </div>
            </header>
            <div className="products">
            Items inside cart:
            {order.products && order.products.map(({ id, name, description, category, price, quantity }) => { 
               return(
                   <div key={id} className="product">
                   <div>Name: {name} </div>
                   <div> Category: {category} </div>
                   <div> Description: {description} </div>
                   <div> Price: {price / 100.0} </div>
                   <div> Quantity: {quantity} </div>
                   {isCart && <Button className="btn btn-danger" onClick={()=>{
                       console.log('im being clicked');
                   }}>Remove</Button>}
                   </div>
               );
            }
            )
            }
            <div>Total: ${order?.products?.reduce((acc, {price, quantity})=> acc + ( (price/100.0) * quantity), 0).toFixed(2)} </div>
            </div>
        </div>
    );
}

export default SingleOrder;
