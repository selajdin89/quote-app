import React from "react";
import classes from "./Cart.module.css";

function Cart(props) {
  return (
    <div className={classes.quoteCart}>
      <h2>{props.quote}</h2>
      <p>{props.author}</p>
    </div>
  );
}

export default Cart;
