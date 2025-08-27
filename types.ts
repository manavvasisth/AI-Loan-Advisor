
export enum AppMode {
  Eligibility = 'ELIGIBILITY',
  Checklist = 'CHECKLIST',
}

export interface EligibilityFormData {
  monthlyIncome: number;
  monthlyDebt: number;
  creditScore: number;
  loanAmount: number;
}

export type LoanType = 'Personal' | 'Auto' | 'Mortgage';
