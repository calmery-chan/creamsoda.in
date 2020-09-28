import React from "react";
import { render } from "../../utils/render";

const resolveUrl = (path: string) =>
  process.env.NODE_ENV === "production" ? `/a/dream/${path}` : path;

const Admin: React.FC = () => {
  return (
    <>
      <div>
        <a href={resolveUrl("admin/serial_codes")}>Serial Codes</a>
      </div>
      <div>
        <a href={resolveUrl("admin/canvas")}>Canvas</a>
      </div>
      <div>
        <a href={resolveUrl("admin/works")}>Works</a>
      </div>
    </>
  );
};

render(Admin);
