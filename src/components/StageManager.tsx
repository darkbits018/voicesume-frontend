/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { WorkflowStage } from '../types/workflow';
import { UserInfoStage } from '../stages/UserInfoStage';
import { ExperienceLevelStage } from '../stages/ExperienceLevelStage';
import { CareerObjectiveStage } from '../stages/CareerObjectiveStage';
import { ChatAction } from '../types';
import { ChatActions } from '../components/ChatActions';
import { ChatInput } from './ChatInput';
import { EducationalQualificationsStage } from '../stages/EducationalQualificationsStage';
import SkillStage from '../stages/SkillStage'; // Use default import
import { getNextStage } from '../utils/workflowUtils'; // Import the function
import { WorkflowState } from '../types/workflow';


interface StageManagerProps {
  stage: WorkflowStage;
  onStageComplete: (data: any, message: string) => void;
  handleSendMessage: (message: string, type?: 'user' | 'ai', action?: ChatAction) => void;
  handleAISuggestion: () => void;
  setInputValue: (value: string) => void;
  setShowInput: (show: boolean) => void;
  moveToStage: (stage: WorkflowStage) => void; // Add this prop
  state: WorkflowState; // Add this prop
}

export const StageManager: React.FC<StageManagerProps> = ({ stage, setShowInput, onStageComplete, handleSendMessage, handleAISuggestion, setInputValue, moveToStage, state, }) => {
  const [aiGeneratedProfile, setAiGeneratedProfile] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [showEditProceedButtons, setShowEditProceedButtons] = useState(false);
  const voiceSupported = true; // Assuming voice support is available
  const [airesponse, setAIResponse] = useState<string | null>(null);


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

  // const handleAISuggestionSubmit = (message: string) => {
  //   // Treat the message as the desired job role
  //   const desiredJobRole = message;
  //   onStageComplete({ desiredJobRole: desiredJobRole }, `Desired Job Role: ${desiredJobRole}`);

  //   // Simulate AI-generated career profile
  //   const dummyProfile = `To secure a position as a ${desiredJobRole}, leveraging my skills and knowledge to contribute to organizational success.`;
  //   const airespo = `Based on your desired job role as a "${desiredJobRole}", here is a suggested career profile:`;
  //   const carprof = airespo + dummyProfile;
  //   setAiGeneratedProfile(dummyProfile);

  //   // Add AI-generated career profile message
  //   handleSendMessage(carprof, 'ai');

  //   // Show the buttons after sending the message
  //   setShowEditProceedButtons(true);
  // };

  const handleAISuggestionSubmit = async (message: string) => {
    // Treat the message as the desired job role
    const desiredJobRole = message;

    try {
      // Send the job role to the backend API
      const response = await fetch('http://127.0.0.1:5000/generate-career-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_role: desiredJobRole }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      // Parse the response
      const data = await response.json();
      const airesponse = data.response
      // Update the state with the AI-generated response
      setAIResponse(airesponse);

      // Update the stage data with the desired job role
      onStageComplete({ desiredJobRole: desiredJobRole }, `Desired Job Role: ${desiredJobRole}`);

      // Display the AI-generated career profile in the chat
      handleSendMessage(airesponse, 'ai');

      // Show the "Edit" and "Proceed" buttons
      setShowEditProceedButtons(true);


    } catch (error) {
      console.error('Error generating career profile:', error);

      // Fallback message if the API call fails
      handleSendMessage('Failed to generate a career profile. Please try again.', 'ai');
    }
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

  const handleEducationSubmit = (data: { education: string }) => {
    handleSendMessage(data.education, 'user');
    onStageComplete({ education: data.education }, `Education added: ${data.education}`);
    const nextStage = getNextStage(state.stage);
    if (nextStage) {
      moveToStage(nextStage); // Move to the next stage
    }
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
                      setInputValue(airesponse || '');
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
      return (
        <EducationalQualificationsStage
          onSubmit={(data) => {
            handleEducationSubmit(data);
          }}
        />
      );
    case 'skills':
      return (
        <SkillStage
          onStageComplete={(data) => {
            onStageComplete(data, "Skills added successfully.");
          }}
        />
      );
    // case 'projects':
    //   return <ProjectsStage onStageComplete={onStageComplete} />;
    // case 'internships':
    //   return <InternshipsStage onStageComplete={onStageComplete} />;
    // case 'certifications':
    //   return <CertificationsStage onStageComplete={onStageComplete} />;
    // case 'summary':
    //   return <SummaryStage data={state.data} />;
    default:
      return null;
  }
};

