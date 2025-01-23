import React, { useState } from 'react';
import { ChatInput } from '../components/ChatInput';

interface ProjectsStageProps {
    onStageComplete: (data: { projects: Array<{ title: string; description: string; technologies: string }> }) => void;
}

export const ProjectsStage: React.FC<ProjectsStageProps> = ({ onStageComplete }) => {
    const [projects, setProjects] = useState<Array<{ title: string; description: string; technologies: string }>>([]);
    const [currentProject, setCurrentProject] = useState({ title: '', description: '', technologies: '' });
    const [step, setStep] = useState<'title' | 'description' | 'technologies'>('title');

    const handleInputSubmit = (value: string) => {
        if (step === 'title') {
            setCurrentProject({ ...currentProject, title: value });
            setStep('description');
        } else if (step === 'description') {
            setCurrentProject({ ...currentProject, description: value });
            setStep('technologies');
        } else if (step === 'technologies') {
            const updatedProject = { ...currentProject, technologies: value };
            setProjects([...projects, updatedProject]);
            setCurrentProject({ title: '', description: '', technologies: '' });
            setStep('title');
        }
    };

    const handleStageComplete = () => {
        onStageComplete({ projects });
    };

    return (
        <div className="space-y-4">
            {step === 'title' && (
                <div>
                    <p className="text-lg font-semibold">Enter the title of your project:</p>
                    <ChatInput onSend={handleInputSubmit} placeholder="e.g., E-commerce Website" />
                </div>
            )}
            {step === 'description' && (
                <div>
                    <p className="text-lg font-semibold">Describe your project:</p>
                    <ChatInput onSend={handleInputSubmit} placeholder="e.g., Built a full-stack e-commerce platform using React and Node.js" />
                </div>
            )}
            {step === 'technologies' && (
                <div>
                    <p className="text-lg font-semibold">List the technologies used (comma-separated):</p>
                    <ChatInput onSend={handleInputSubmit} placeholder="e.g., React, Node.js, MongoDB" />
                </div>
            )}
            {projects.length > 0 && (
                <button
                    onClick={handleStageComplete}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Complete Projects Stage
                </button>
            )}
        </div>
    );
};