import React, { useState } from 'react';
import { ChatInput } from '../components/ChatInput';

interface SkillStageProps {
    onStageComplete: (data: { primarySkill: string; secondarySkill: string; additionalSkills: string }) => void;
}

const SkillStage: React.FC<SkillStageProps> = ({ onStageComplete }) => {
    const [primarySkill, setPrimarySkill] = useState('');
    const [secondarySkill, setSecondarySkill] = useState('');
    const [additionalSkills, setAdditionalSkills] = useState('');

    const handlePrimarySkillSubmit = (data: string) => {
        setPrimarySkill(data);
    };

    const handleSecondarySkillSubmit = (data: string) => {
        setSecondarySkill(data);
    };

    const handleAdditionalSkillsSubmit = (data: string) => {
        setAdditionalSkills(data);
    };

    const handleStageComplete = () => {
        onStageComplete({ primarySkill, secondarySkill, additionalSkills });
    };

    return (
        <div>
            <h2>Describe your primary skill</h2>
            <ChatInput onSubmit={handlePrimarySkillSubmit} />
            {primarySkill && (
                <div>
                    <h2>Describe your secondary skill</h2>
                    <ChatInput onSubmit={handleSecondarySkillSubmit} />
                    {secondarySkill && (
                        <div>
                            <h2>Describe your additional skills</h2>
                            <ChatInput onSubmit={handleAdditionalSkillsSubmit} />
                            {additionalSkills && (
                                <button onClick={handleStageComplete}>Complete Stage</button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SkillStage;