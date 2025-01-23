import React, { useState } from 'react';
import { ChatInput } from '../components/ChatInput';
import { sendResponse } from '../services/api';

interface SkillStageProps {
    onStageComplete: (data: { primarySkill: string; secondarySkill: string; additionalSkills: string }) => void;
}

export const SkillStage: React.FC<SkillStageProps> = ({ onStageComplete }) => {
    const [userInput, setUserInput] = useState('');
    const [desiredJobRole, setDesiredJobRole] = useState('');
    const [skills, setSkills] = useState<{ primary: string; secondary: string; additional: string } | null>(null);
    const [step, setStep] = useState<'input' | 'jobRole' | 'result'>('input');

    const handleUserInputSubmit = async (input: string) => {
        if (step === 'input') {
            setUserInput(input);
            setStep('jobRole');
        } else if (step === 'jobRole') {
            setDesiredJobRole(input);

            // Send data to backend for processing
            try {
                const response = await sendResponse('skills', {
                    userInput: userInput,
                    desiredJobRole: input,
                });

                // Set skills returned by the backend
                setSkills({
                    primary: response.primarySkill,
                    secondary: response.secondarySkill,
                    additional: response.additionalSkills,
                });
                setStep('result');
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        }
    };

    const handleConfirmSkills = () => {
        if (skills) {
            onStageComplete({
                primarySkill: skills.primary,
                secondarySkill: skills.secondary,
                additionalSkills: skills.additional,
            });
        }
    };

    return (
        <div className="space-y-4">
            {step === 'input' && (
                <div>
                    <p className="text-lg font-semibold">Describe what you can do:</p>
                    <ChatInput onSend={handleUserInputSubmit} placeholder="e.g., I can build web applications using React and Node.js" />
                </div>
            )}
            {step === 'jobRole' && (
                <div>
                    <p className="text-lg font-semibold">What is your desired job role?</p>
                    <ChatInput onSend={handleUserInputSubmit} placeholder="e.g., Frontend Developer, Data Scientist, etc." />
                </div>
            )}
            {step === 'result' && skills && (
                <div className="space-y-4">
                    <p className="text-lg font-semibold">Here are your skills based on your input:</p>
                    <div className="space-y-2">
                        <p><strong>Primary Skill:</strong> {skills.primary}</p>
                        <p><strong>Secondary Skill:</strong> {skills.secondary}</p>
                        <p><strong>Additional Skills:</strong> {skills.additional}</p>
                    </div>
                    <button
                        onClick={handleConfirmSkills}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Confirm Skills
                    </button>
                </div>
            )}
        </div>
    );
};

export default SkillStage; // Add default export
