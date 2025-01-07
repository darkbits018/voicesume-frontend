import React from 'react';
import { ChatAction } from '../types';
import { ChatActions } from '../components/ChatActions';

interface ExperienceLevelStageProps {
  onSelect: (level: 'fresher' | 'experienced') => void;
}

export const ExperienceLevelStage: React.FC<ExperienceLevelStageProps> = ({ onSelect }) => {
  const action: ChatAction = {
    type: 'button',
    options: [
      { label: 'Fresher', value: 'fresher', action: () => onSelect('fresher') },
      { label: 'Experienced', value: 'experienced', action: () => onSelect('experienced') },
    ],
  };

  return (
    <div className="space-y-4">
      <ChatActions action={action} />
    </div>
  );
};