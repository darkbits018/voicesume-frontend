import React, { useState } from 'react';
import { ChatActions } from '../components/ChatActions';
import { ChatAction } from '../types';


interface CareerObjectiveStageProps {
  onSubmit: (data: { careerObjective: string }) => void;
  onAISuggestion: () => void;
  onAISuggestionSubmit: (desiredJobRole: string) => void;
  handleSendMessage?: (message: string, type?: 'user' | 'ai') => void;
}

export const CareerObjectiveStage: React.FC<CareerObjectiveStageProps> = ({ onSubmit, onAISuggestion, onAISuggestionSubmit, handleSendMessage }) => {
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

  return (
    <div className="space-y-4 mt-4">
      {showActions && (
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
                action: handleManualClick
              }
            ]
          }}
        />
      )}
      {showDesiredRoleInput && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Desired Job Role"
              value={desiredJobRole}
              onChange={(e) => setDesiredJobRole(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

