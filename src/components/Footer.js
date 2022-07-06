import React from "react";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <div className={classes.footer}>
      <h3>Thank's for your visit. Come back tomorrow for another quote!</h3>
      <p className={classes.copyright}>
        © Copyright by Selajdin Memeti. Use for learning or your portfolio.{" "}
        <br />
        Don't use to teach. Don't claim as your own.
      </p>
    </div>
  );
}

export default Footer;
