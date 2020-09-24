import React from "react";
import ReactDOM from "react-dom";

export const render = (Component: React.FC) => {
  const div = document.createElement("div");
  div.classList.add("h-full");

  document.body.appendChild(div);

  ReactDOM.render(<Component />, div);
};
