
import React, { useState } from 'react';
import type { LoanType } from '../types';

interface ChecklistFormProps {
  onSubmit: (loanType: LoanType) => void;
  isLoading: boolean;
}

export const ChecklistForm: React.FC<ChecklistFormProps> = ({ onSubmit, isLoading }) => {
  const [loanType, setLoanType] = useState<LoanType>('Personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(loanType);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-brand-dark mb-4">Generate Document Checklist</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Select the type of loan you are applying for to receive a tailored checklist of required documents.
      </p>

      <div>
        <label htmlFor="loanType" className="block text-sm font-medium text-gray-700 mb-2">
          Loan Type
        </label>
        <select
          id="loanType"
          name="loanType"
          value={loanType}
          onChange={(e) => setLoanType(e.target.value as LoanType)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md"
        >
          <option>Personal</option>
          <option>Auto</option>
          <option>Mortgage</option>
        </select>
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Get Checklist'}
        </button>
      </div>
    </form>
  );
};
