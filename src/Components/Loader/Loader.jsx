import React from "react";
import "./Loaders.css";
const Loader = (style) => {
  return (
    <div class="lds-ellipsis" style={style.style}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
