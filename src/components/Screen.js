import React from "react";
import "./Screen.css";

const Screen = ({ value }) => {
  const displayValue = value.length > 20 ? `${value.slice(0, 20)}...` : value;

  return <div className="screen">{displayValue}</div>;
};

export default Screen;
