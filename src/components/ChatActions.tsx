import React from 'react';
import { ChatAction } from '../types';

interface ChatActionsProps {
  action: ChatAction;
}

export const ChatActions: React.FC<ChatActionsProps> = ({ action }) => {
  if (action.type === 'button' && action.options) {
    return (
      <div className="flex flex-wrap gap-2 my-4">
        {action.options.map((option) => (
          <button
            key={option.value}
            onClick={option.action}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  if (action.type === 'input' && action.inputFields) {
    return (
      <div className="space-y-4 my-4">
        {action.inputFields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1">
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
};
