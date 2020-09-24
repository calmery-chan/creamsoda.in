import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { withAdmin } from "~/utils/with-admin";

const Admin: NextPage = () => {
  return (
    <>
      <div>
        <Link href="/admin/serial_codes">Serial Codes</Link>
      </div>
      <div>
        <Link href="/admin/canvas">Canvas</Link>
      </div>
      <div>
        <Link href="/admin/works">Works</Link>
      </div>
    </>
  );
};

export default withAdmin(Admin);
