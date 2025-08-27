
import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  const activeClasses = 'border-brand-primary text-brand-primary';
  const inactiveClasses = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
  
  return (
    <button
      onClick={onClick}
      className={`py-4 px-1 border-b-2 font-medium text-sm w-1/2 transition-colors duration-200 focus:outline-none ${isActive ? activeClasses : inactiveClasses}`}
    >
      {label}
    </button>
  );
};
