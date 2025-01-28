import React, { useState } from 'react';
import { ChatActions } from '../components/ChatActions';
import { ChatInput } from '../components/ChatInput';

interface CareerObjectiveStageProps {
  onSubmit: (data: { careerObjective: string }) => void;
  onAISuggestion: () => void;
  onAISuggestionSubmit: (desiredJobRole: string) => void;
  handleSendMessage?: (message: string, type?: 'user' | 'ai') => void;
  handleSendMessageWrapper: (input: string) => void;
  startListening: () => void;
  stopListening: () => void;
  isListening: boolean;
  transcript: string;
  inputValue: string;
  setInputValue: (value: string) => void;
}

export const CareerObjectiveStage: React.FC<CareerObjectiveStageProps> = ({
  onSubmit,
  onAISuggestion,
  onAISuggestionSubmit,
  handleSendMessage,
  handleSendMessageWrapper,
  startListening,
  stopListening,
  isListening,
  transcript,
  inputValue,
  setInputValue,
}) => {
  const [careerObjective, setCareerObjective] = useState('');
  const [useAISuggestion, setUseAISuggestion] = useState(false);
  const [desiredJobRole, setDesiredJobRole] = useState('');
  const [showActions, setShowActions] = useState(true);
  const [showDesiredRoleInput, setShowDesiredRoleInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (useAISuggestion) {
      onAISuggestionSubmit(desiredJobRole);
      setShowDesiredRoleInput(false);
    } else {
      onSubmit({ careerObjective });
    }
  };

  const handleAISuggestion = () => {
    setUseAISuggestion(true);
    onAISuggestion();
  };

  const handleAIClick = () => {
    setShowActions(false);
    handleAISuggestion();
    setUseAISuggestion(true);
    setShowDesiredRoleInput(true);
    handleSendMessage?.("I want AI to suggest a career objective", "user");
    handleSendMessage?.("I can help you craft a professional career objective. Please enter your desired job role.", "ai");
  };

  const handleManualClick = () => {
    setShowActions(false);
    setUseAISuggestion(false);
    handleSendMessage?.("I want to write my own career objective", "user");
  };
  const handleSend = (input: string) => {
    handleSendMessageWrapper(input);
    setShowDesiredRoleInput(false);
  };


  return (
    <div className="space-y-4 mt-4">
      {!showDesiredRoleInput && (
        <ChatActions
          action={{
            type: "button",
            options: [
              {
                label: "AI Suggestion",
                value: "ai",
                action: handleAIClick
              },
              {
                label: "Create from Scratch",
                value: "manual",
                action: () => console.log('Create from Scratch clicked')
              }
            ]
          }}
        />
      )}
      {showDesiredRoleInput && (
        <ChatInput
          onSend={handleSendMessageWrapper}
          onStartVoice={startListening}
          onStopVoice={stopListening}
          isListening={isListening}
          transcript={transcript}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      )}
    </div>
  );
};

export default CareerObjectiveStage;

