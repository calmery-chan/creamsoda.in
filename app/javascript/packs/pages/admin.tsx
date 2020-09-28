import React from "react";
import { render } from "../../utils/render";

const Admin: React.FC = () => {
  return (
    <>
      <div>
        <a href="/admin/serial_codes">Serial Codes</a>
      </div>
      <div>
        <a href="/admin/canvas">Canvas</a>
      </div>
      <div>
        <a href="/admin/works">Works</a>
      </div>
    </>
  );
};

render(Admin);
