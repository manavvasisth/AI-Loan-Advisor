
import React from 'react';

const BankIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M3 4.5V6h18V4.5a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 3 4.5M3 21h18v-1.5a1.5 1.5 0 0 0-1.5-1.5h-15a1.5 1.5 0 0 0-1.5 1.5V21M4 10h1v7H4v-7m4 0h1v7H8v-7m4 0h1v7h-1v-7m4 0h1v7h-1v-7m-1.5-5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
        <BankIcon />
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">AI Loan Advisor</h1>
          <p className="text-sm text-gray-500">Your intelligent guide to loan applications</p>
        </div>
      </div>
    </header>
  );
};
