import React, { useState } from 'react';

interface CareerObjectiveStageProps {
  onSubmit: (data: { careerObjective: string }) => void;
  onAISuggestion: () => void;
  onAISuggestionSubmit: (desiredJobRole: string) => void;
}

export const CareerObjectiveStage: React.FC<CareerObjectiveStageProps> = ({ onSubmit, onAISuggestion, onAISuggestionSubmit }) => {
  const [careerObjective, setCareerObjective] = useState('');
  const [useAISuggestion, setUseAISuggestion] = useState(false);
  const [desiredJobRole, setDesiredJobRole] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (useAISuggestion) {
      onAISuggestionSubmit(desiredJobRole);
    } else {
      onSubmit({ careerObjective });
    }
  };

  const handleAISuggestion = () => {
    setUseAISuggestion(true);
    onAISuggestion();
  };

  return (
    <div className="space-y-4 mt-4">
      {!useAISuggestion ? (
        <>
          <p className="text-gray-700">Let's define your career objective.</p>
          <button type="button" onClick={handleAISuggestion} className="w-full p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            AI Suggestion
          </button>
          <button type="button" onClick={() => setUseAISuggestion(false)} className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Create from Scratch
          </button>
        </>
      ) : (
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
