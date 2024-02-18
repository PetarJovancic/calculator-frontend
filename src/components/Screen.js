import React from "react";
import "./Screen.css";

const Screen = ({ value }) => {
  const displayValue = value.length > 30 ? `${value.slice(0, 30)}...` : value;

  return <div className="screen">{displayValue}</div>;
};

export default Screen;
