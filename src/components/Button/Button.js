import React from "react";
import "./styles.css";

const Button = ({
  loading,
  onClickHandler,
  loadingText = "Loading...",
  disabled = false,
  text = "Submit",
}) => {
  return (
    <>
      {loading ? (
        <button className="btn" type="button" disabled>
          {loadingText}
        </button>
      ) : (
        <button
          type="submit"
          className="btn"
          onClick={onClickHandler}
          disabled={disabled}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
