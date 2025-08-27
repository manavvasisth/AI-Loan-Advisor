
import React, { useState } from 'react';
import type { EligibilityFormData } from '../types';

interface EligibilityFormProps {
  onSubmit: (formData: EligibilityFormData) => void;
  isLoading: boolean;
}

const FormRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    {children}
  </div>
);

export const EligibilityForm: React.FC<EligibilityFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<EligibilityFormData>({
    monthlyIncome: 5000,
    monthlyDebt: 500,
    creditScore: 680,
    loanAmount: 10000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-brand-dark mb-4">Assess Your Loan Eligibility</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Enter your financial details below. Our AI will provide a confidential, preliminary analysis of your loan profile.
      </p>

      <FormRow label={`Monthly Income: ${formatCurrency(formData.monthlyIncome)}`}>
        <input
          type="range"
          name="monthlyIncome"
          min="1000"
          max="20000"
          step="100"
          value={formData.monthlyIncome}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
      </FormRow>

      <FormRow label={`Monthly Debt Payments: ${formatCurrency(formData.monthlyDebt)}`}>
        <input
          type="range"
          name="monthlyDebt"
          min="0"
          max="5000"
          step="50"
          value={formData.monthlyDebt}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
      </FormRow>

      <FormRow label={`Credit Score: ${formData.creditScore}`}>
        <input
          type="range"
          name="creditScore"
          min="300"
          max="850"
          step="10"
          value={formData.creditScore}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
      </FormRow>
      
      <FormRow label={`Desired Loan Amount: ${formatCurrency(formData.loanAmount)}`}>
        <input
          type="range"
          name="loanAmount"
          min="1000"
          max="100000"
          step="500"
          value={formData.loanAmount}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
      </FormRow>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Check Eligibility'}
        </button>
      </div>
    </form>
  );
};
