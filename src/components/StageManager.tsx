import React, { useState } from 'react';
import { WorkflowStage } from '../types/workflow';
import { UserInfoStage } from '../stages/UserInfoStage';
import { ExperienceLevelStage } from '../stages/ExperienceLevelStage';
import { CareerObjectiveStage } from '../stages/CareerObjectiveStage';
import { ChatAction } from '../types';
import { ChatActions } from '../components/ChatActions';
import { ChatInput } from './ChatInput';

interface StageManagerProps {
  stage: WorkflowStage;
  onStageComplete: (data: any, message: string) => void;
  handleSendMessage: (message: string, type?: 'user' | 'ai', action?: ChatAction) => void;
  handleAISuggestion: () => void;
}

export const StageManager: React.FC<StageManagerProps> = ({ stage, onStageComplete, handleSendMessage, handleAISuggestion }) => {
  const [aiGeneratedProfile, setAiGeneratedProfile] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
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

  const handleAISuggestionSubmit = (desiredJobRole: string) => {
    const message = `Desired Job Role: ${desiredJobRole}`;
    onStageComplete({ desiredJobRole: desiredJobRole }, message);

    // Simulate AI-generated career profile
    const dummyProfile = `Based on your desired job role as a ${desiredJobRole}, here is a suggested career profile: "To secure a position as a ${desiredJobRole}, leveraging my skills and knowledge to contribute to organizational success."`;
    setAiGeneratedProfile(dummyProfile);

    // Add AI-generated career profile message
    handleSendMessage(dummyProfile, 'ai');

    // Provide chat action buttons
    const action: ChatAction = {
      type: 'button',
      options: [
        { label: 'Edit', value: 'edit', action: () => handleEditProfile() },
        { label: 'Proceed', value: 'proceed', action: () => handleProceed() },
      ],
    };
    handleSendMessage('What would you like to do next?', 'ai', action);
  };

  const handleEditProfile = () => {
    handleSendMessage('Please edit your career profile in the chatbox below.', 'ai');
    return (
      <ChatInput
        setInputValue={aiGeneratedProfile}
        onSend={handleSendMessage}
        onStartVoice={handleStartVoice}
        onStopVoice={handleStopVoice}
        isListening={isListening}
        voiceSupported={voiceSupported}
      />
    );
  };
  const handleProceed = () => {
    setAiGeneratedProfile(null);
    const nextStage = getNextStage(stage);
    if (nextStage) {
      moveToStage(nextStage);
    }
  };

  switch (stage) {
    case 'userInfo':
      return <UserInfoStage onSubmit={handleUserInfoSubmit} />;
    case 'experienceLevel':
      return <ExperienceLevelStage onSelect={handleExperienceLevelSelect} />;
    case 'careerObjective':
      return <CareerObjectiveStage onSubmit={handleCareerObjectiveSubmit} onAISuggestion={handleAISuggestion} onAISuggestionSubmit={handleAISuggestionSubmit} />;
    default:
      return null;
  }
};



