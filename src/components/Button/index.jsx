import classNames from "classnames";
import React from "react";
import classes from "./styles.module.scss";

export default function Button({ onClick, disabled, text }) {
  return (
    <button 
      onClick={onClick}
      className={classNames({[classes.disabled]: disabled })}
    >
      {text}
    </button>
  )
}