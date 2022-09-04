import React, { Fragment, useState } from "react";
import classes from "./MainContent.module.css";
import Cart from "./Cart";
import Footer from "./Footer";
import { LinearProgress, Stack } from "@mui/material";

function MainContent(props) {
  const [dayQuote, setDayQuote] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [btnIsShown, setBtnIsShown] = useState(true);

  const fetchQuoteHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://programming-quotes-api.herokuapp.com/quotes"
      );

      if (!response.ok) {
        setError(true);
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      console.log(responseData);
      setDayQuote(
        responseData[Math.floor(Math.random() * responseData.length)]
      );
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    setBtnIsShown(false);
  };

  return (
    <Fragment>
      <div className={classes.content}>
        {btnIsShown && (
          <div className={classes.actions}>
            <h2 className={classes.title}>
              Get your daily quote for inspiration 🤷‍♀️
            </h2>
            <button onClick={fetchQuoteHandler}>Reveal</button>
          </div>
        )}

        {isLoading && (
          <LinearProgress
            color="success"
            sx={{ width: "20%", margin: "0 auto" }}
          />
        )}

        {error && (
          <p className={classes["error-text"]}>
            Something went wrong, try again!
          </p>
        )}
        {!btnIsShown && <Cart quote={dayQuote.en} author={dayQuote.author} />}
      </div>
      {!btnIsShown && <Footer />}
    </Fragment>
  );
}

export default MainContent;
