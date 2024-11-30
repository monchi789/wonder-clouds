import React from 'react';

type DividerWithTextProps = {
  text: string;
};

const Divider = () => (
  <div className="border-b border-gray-300" />
);

const DividerWithText: React.FC<DividerWithTextProps> = ({ text }) => (
  <div className="flex items-center my-4">
    <div className="flex-grow border-t border-gray-300"></div>
    <span className="mx-4 text-gray-500">{text}</span>
    <div className="flex-grow border-t border-gray-300"></div>
  </div>
);

export { Divider, DividerWithText };
