
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { EligibilityForm } from './components/EligibilityForm';
import { ChecklistForm } from './components/ChecklistForm';
import { ResponseDisplay } from './components/ResponseDisplay';
import { TabButton } from './components/TabButton';
import { checkEligibility, generateDocumentChecklist } from './services/geminiService';
import type { EligibilityFormData, LoanType } from './types';
import { AppMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.Eligibility);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string>('');

  const handleEligibilitySubmit = useCallback(async (formData: EligibilityFormData) => {
    setIsLoading(true);
    setError(null);
    setAiResponse('');
    try {
      const response = await checkEligibility(formData);
      setAiResponse(response);
    } catch (err) {
      setError('An error occurred while checking eligibility. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChecklistSubmit = useCallback(async (loanType: LoanType) => {
    setIsLoading(true);
    setError(null);
    setAiResponse('');
    try {
      const response = await generateDocumentChecklist(loanType);
      setAiResponse(response);
    } catch (err) {
      setError('An error occurred while generating the checklist. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-secondary text-brand-dark">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column: Controls and Forms */}
            <div className="flex flex-col">
              <div className="flex border-b border-gray-200 mb-6">
                <TabButton
                  label="Eligibility Checker"
                  isActive={mode === AppMode.Eligibility}
                  onClick={() => setMode(AppMode.Eligibility)}
                />
                <TabButton
                  label="Document Checklist"
                  isActive={mode === AppMode.Checklist}
                  onClick={() => setMode(AppMode.Checklist)}
                />
              </div>
              
              <div>
                {mode === AppMode.Eligibility ? (
                  <EligibilityForm onSubmit={handleEligibilitySubmit} isLoading={isLoading} />
                ) : (
                  <ChecklistForm onSubmit={handleChecklistSubmit} isLoading={isLoading} />
                )}
              </div>
            </div>

            {/* Right Column: AI Response */}
            <div className="bg-brand-secondary rounded-xl p-6 md:p-8 min-h-[400px] lg:min-h-full">
              <ResponseDisplay response={aiResponse} isLoading={isLoading} error={error} />
            </div>
          </div>
        </div>
        <footer className="text-center text-gray-500 mt-8 text-sm">
          <p>
            Disclaimer: This is an AI-powered tool for informational purposes only and does not constitute financial advice.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
