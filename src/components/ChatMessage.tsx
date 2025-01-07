import React from 'react';
import { MessageType, ChatAction } from '../types';
import { Bot, User } from 'lucide-react';
import { ChatActions } from './ChatActions';

interface ChatMessageProps {
  content: string | ChatAction;
  type: MessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ content, type }) => {
  const isAI = type === 'ai';
  const isAction = typeof content === 'object' && 'type' in content && content.type === 'button';

  return (
    <div className={`flex items-start gap-2 mb-4 ${isAI ? '' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isAI ? 'bg-blue-100' : 'bg-green-100'
      }`}>
        {isAI ? <Bot size={20} className="text-blue-600" /> : <User size={20} className="text-green-600" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        isAI ? 'bg-blue-50 text-gray-800' : 'bg-green-50 text-gray-800'
      }`}>
        {isAction ? <ChatActions action={content as ChatAction} /> : content}
      </div>
    </div>
  );
};