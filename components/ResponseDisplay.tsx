
import React from 'react';

interface ResponseDisplayProps {
  response: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
        <p className="mt-4 text-gray-600">Our AI is analyzing your request...</p>
        <p className="text-sm text-gray-500 mt-2">This may take a few moments.</p>
    </div>
);

const WelcomeMessage: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="bg-white p-6 rounded-full mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h3 className="text-lg font-semibold text-brand-dark">AI Assistant Ready</h3>
        <p className="text-gray-600 mt-2">
            Your personalized loan insights will appear here. Use the forms on the left to get started.
        </p>
    </div>
);

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, isLoading, error }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-center text-red-600">
        <div className="bg-red-50 p-4 rounded-lg">
            <p>{error}</p>
        </div>
      </div>
    );
  }
  
  // A simple markdown-like renderer
  const renderResponse = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-semibold text-brand-dark mt-4 mb-2">{line.substring(4)}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold text-brand-dark mt-6 mb-3">{line.substring(3)}</h2>;
      }
      if (line.startsWith('* ')) {
        return <li key={index} className="ml-5 list-disc text-gray-700">{line.substring(2)}</li>;
      }
       if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="text-gray-700 mb-2">{line}</p>;
    });
  };

  if (!response) {
    return <WelcomeMessage />;
  }

  return (
    <div className="prose max-w-none prose-p:text-gray-700 prose-headings:text-brand-dark prose-li:text-gray-700">
        {renderResponse(response)}
    </div>
  );
};
