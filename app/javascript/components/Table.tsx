import React from "react";

export const Table: React.FC = ({ children }) => (
  <table className="w-full">{children}</table>
);

export const Tbody: React.FC = ({ children }) => <tbody>{children}</tbody>;

export const Td: React.FC<React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableDataCellElement>,
  HTMLTableDataCellElement
>> = (props) => (
  <td
    {...props}
    className={`px-4 py-4 border-b border-gray-200 bg-white text-sm ${
      props.className || ""
    }`}
  />
);

export const Th: React.FC = ({ children }) => (
  <th className="px-4 py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    {children}
  </th>
);

export const Thead: React.FC = ({ children }) => <thead>{children}</thead>;

export const Tr: React.FC = ({ children }) => <tr>{children}</tr>;
