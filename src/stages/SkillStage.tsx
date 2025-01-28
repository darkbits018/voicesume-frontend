import React from 'react';

interface SkillStageProps {
    onStageComplete: (data: { primarySkill: string; secondarySkill: string; additionalSkills: string }) => void;
    jobRole: string;
    userInput: string;
    skills: { primary: string; secondary: string; additional: string } | null;
    loading: boolean;
    error: string | null;
    handleUserInputSubmit: (input: string) => void;
}

const SkillStage: React.FC<SkillStageProps> = ({
    onStageComplete,
    jobRole,
    userInput,
    skills,
    loading,
    error,
    handleUserInputSubmit,
}) => {
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
            {/* Step 1: Describe your skills */}
            {!skills && (
                <div>
                    <p className="text-lg font-semibold">Describe what you can do:</p>
                    {loading && <p className="text-gray-600">Loading skill suggestions...</p>}
                    {error && <p className="text-red-600">{error}</p>}
                </div>
            )}

            {/* Step 2: Display suggested skills */}
            {skills && (
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

export default SkillStage;