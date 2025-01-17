import React, { useState } from 'react';
import { WorkflowStage } from '../types/workflow';
import { UserInfoStage } from '../stages/UserInfoStage';
import { ExperienceLevelStage } from '../stages/ExperienceLevelStage';
import { CareerObjectiveStage } from '../stages/CareerObjectiveStage';
import { ChatAction } from '../types';
import { ChatActions } from '../components/ChatActions';
import { ChatInput } from './ChatInput';
import { EducationalQualificationsStage } from '../stages/EducationalQualificationsStage';


interface StageManagerProps {
  stage: WorkflowStage;
  onStageComplete: (data: any, message: string) => void;
  handleSendMessage: (message: string, type?: 'user' | 'ai', action?: ChatAction) => void;
  handleAISuggestion: () => void;
  setInputValue: (value: string) => void;
  setShowInput: (show: boolean) => void;
}

export const StageManager: React.FC<StageManagerProps> = ({ stage, setShowInput, onStageComplete, handleSendMessage, handleAISuggestion, setInputValue }) => {
  const [aiGeneratedProfile, setAiGeneratedProfile] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [showEditProceedButtons, setShowEditProceedButtons] = useState(false);
  const voiceSupported = true; // Assuming voice support is available


  const handleStartVoice = () => {
    setIsListening(true);
    console.log('Voice input started');
  };

  const handleStopVoice = () => {
    setIsListening(false);
    console.log('Voice input stopped');
  };


  const handleUserInfoSubmit = (data: { name: string; phone: string; email: string }) => {
    const message = `Name: ${data.name}, Phone: ${data.phone}, Email: ${data.email}`;
    onStageComplete({ personalInfo: data }, message);
  };

  const handleExperienceLevelSelect = (level: 'fresher' | 'experienced') => {
    const message = `Experience Level: ${level}`;
    onStageComplete({ experienceLevel: level }, message);
  };

  const handleCareerObjectiveSubmit = (data: { careerObjective: string }) => {
    const message = `Career Objective: ${data.careerObjective}`;
    onStageComplete({ careerObjective: data.careerObjective }, message);
  };

  const handleAISuggestionSubmit = (message: string) => {
    // Treat the message as the desired job role
    const desiredJobRole = message;
    onStageComplete({ desiredJobRole: desiredJobRole }, `Desired Job Role: ${desiredJobRole}`);

    // Simulate AI-generated career profile
    const dummyProfile = `To secure a position as a ${desiredJobRole}, leveraging my skills and knowledge to contribute to organizational success.`;
    const airespo = `Based on your desired job role as a "${desiredJobRole}", here is a suggested career profile:`;
    const carprof = airespo + dummyProfile;
    setAiGeneratedProfile(dummyProfile);

    // Add AI-generated career profile message
    handleSendMessage(carprof, 'ai');

    // Show the buttons after sending the message
    setShowEditProceedButtons(true);
  };

  const handleProceed = () => {
    setAiGeneratedProfile(null);

    // // First, send the final career profile message
    // handleSendMessage("Your Career Profile:", 'ai');
    // handleSendMessage(aiGeneratedProfile || '', 'user');

    // Then, move to education stage with instructions
    handleSendMessage("Moving to education details", 'ai');
    onStageComplete({ stage: 'education' }, "");
    handleSendMessage(
      "Let's define your educational qualifications. Please enter your qualification in this format:\n\n" +
      "Degree, Specialization, College Name, Year of Completion, CGPA/Percentage\n\n" +
      "Example: B.E, CSE from XYZ College, 2019, 8.5 CGPA",
      'ai'
    );
  };
  const handleEducationSubmit = (educations: any[]) => {
    const message = `Education added: ${educations.length} qualification(s)`;
    onStageComplete({ education: educations }, message);
  };

  switch (stage) {
    case 'userInfo':
      return <UserInfoStage onSubmit={handleUserInfoSubmit} />;
    case 'experienceLevel':
      return <ExperienceLevelStage onSelect={handleExperienceLevelSelect} />;
    case 'careerObjective':
      return (
        <>
          <CareerObjectiveStage
            onSubmit={handleCareerObjectiveSubmit}
            onAISuggestion={handleAISuggestion}
            onAISuggestionSubmit={handleAISuggestionSubmit}
            handleSendMessage={handleSendMessage}
          />
          {showEditProceedButtons && (
            <ChatActions
              action={{
                type: "button",
                options: [
                  {
                    label: "Edit",
                    value: "edit",
                    action: () => {
                      handleSendMessage('Please edit your career profile in the chatbox below.', 'ai');
                      setInputValue(aiGeneratedProfile || '');
                      setShowEditProceedButtons(false);
                    }
                  },
                  {
                    label: "Proceed",
                    value: "proceed",
                    action: () => {
                      handleProceed();
                      setShowEditProceedButtons(false);
                    }
                  }
                ]
              }}
            />
          )}
        </>
      );
    case 'education':
      return <EducationalQualificationsStage onSubmit={handleEducationSubmit} />;
    default:
      return null;
  }
};

