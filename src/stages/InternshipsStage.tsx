import React, { useState } from 'react';
import { ChatInput } from '../components/ChatInput';

interface InternshipsStageProps {
    onStageComplete: (data: { internships: Array<{ company: string; role: string; duration: string }> }) => void;
}

export const InternshipsStage: React.FC<InternshipsStageProps> = ({ onStageComplete }) => {
    const [internships, setInternships] = useState<Array<{ company: string; role: string; duration: string }>>([]);
    const [currentInternship, setCurrentInternship] = useState({ company: '', role: '', duration: '' });
    const [step, setStep] = useState<'company' | 'role' | 'duration'>('company');

    const handleInputSubmit = (value: string) => {
        if (step === 'company') {
            setCurrentInternship({ ...currentInternship, company: value });
            setStep('role');
        } else if (step === 'role') {
            setCurrentInternship({ ...currentInternship, role: value });
            setStep('duration');
        } else if (step === 'duration') {
            const updatedInternship = { ...currentInternship, duration: value };
            setInternships([...internships, updatedInternship]);
            setCurrentInternship({ company: '', role: '', duration: '' });
            setStep('company');
        }
    };

    const handleStageComplete = () => {
        onStageComplete({ internships });
    };

    return (
        <div className="space-y-4">
            {step === 'company' && (
                <div>
                    <p className="text-lg font-semibold">Enter the company name:</p>
                    <ChatInput onSend={handleInputSubmit} placeholder="e.g., Google" />
                </div>
            )}
            {step === 'role' && (
                <div>
                    <p className="text-lg font-semibold">Enter your role:</p>
                    <ChatInput onSend={handleInputSubmit} placeholder="e.g., Software Engineering Intern" />
                </div>
            )}
            {step === 'duration' && (
                <div>
                    <p className="text-lg font-semibold">Enter the duration (e.g., 3 months):</p>
                    <ChatInput onSend={handleInputSubmit} placeholder="e.g., June 2023 - August 2023" />
                </div>
            )}
            {internships.length > 0 && (
                <button
                    onClick={handleStageComplete}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Complete Internships Stage
                </button>
            )}
        </div>
    );
};