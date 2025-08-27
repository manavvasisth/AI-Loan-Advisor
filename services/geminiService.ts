
import { GoogleGenAI } from "@google/genai";
import type { EligibilityFormData, LoanType } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
};

export const checkEligibility = async (formData: EligibilityFormData): Promise<string> => {
  const { monthlyIncome, monthlyDebt, creditScore, loanAmount } = formData;
  const prompt = `
    Act as a helpful and cautious AI financial assistant. Your role is to provide a preliminary analysis of a user's likelihood of being approved for a personal loan. IMPORTANT: Start your response with a clear disclaimer that you are an AI and this is not financial advice, and the final decision rests with the lender.

    Analyze the following financial profile:
    - Monthly Income: ${formatNumber(monthlyIncome)}
    - Monthly Debt Payments: ${formatNumber(monthlyDebt)}
    - Credit Score: ${creditScore}
    - Desired Loan Amount: ${formatNumber(loanAmount)}

    Based on this information, provide a response in Markdown format that includes the following sections:
    
    ### Overall Assessment
    Give a qualitative assessment of their chances (e.g., "Strong Candidate," "Good Chance," "May Face Challenges"). Calculate the Debt-to-Income (DTI) ratio ((monthlyDebt / monthlyIncome) * 100) and explain what it means in this context. A DTI under 36% is generally good.
    
    ### Key Strengths
    List 2-3 positive factors from their profile.
    
    ### Areas for Consideration
    List 1-3 potential weaknesses or areas a lender might scrutinize.
    
    ### Suggestions
    Offer actionable advice on how they could improve their profile or application.
    
    Keep the tone encouraging, professional, and easy to understand for someone not familiar with financial jargon.
  `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed for eligibility check:", error);
    throw new Error("Failed to get eligibility assessment from AI.");
  }
};


export const generateDocumentChecklist = async (loanType: LoanType): Promise<string> => {
  const prompt = `
    Act as a helpful AI assistant. Generate a comprehensive checklist of documents typically required for a **${loanType} Loan** application in the United States. 
    
    Organize the checklist into logical categories (e.g., "Proof of Identity," "Proof of Income," "Financial History," etc.). 
    For each document, provide a brief, one-sentence explanation of why it's needed.
    
    Format the entire response in Markdown, using headings for categories and bullet points for the documents.
  `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed for checklist generation:", error);
    throw new Error("Failed to generate document checklist from AI.");
  }
};
