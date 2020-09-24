import React from "react";

export const Page: React.FC = ({ children }) => (
  <div className="bg-gray-100 w-full h-full">
    <div className="container mx-auto py-8">{children}</div>
  </div>
);
