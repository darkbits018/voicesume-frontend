import React from 'react';
import { cn } from '../utils/cn';

interface ChatBubbleProps {
  message: string;
  isAI: boolean;
  timestamp: string;
}

export function ChatBubble({ message, isAI, timestamp }: ChatBubbleProps) {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isAI ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-2",
        isAI ? "bg-blue-100 rounded-tl-none" : "bg-green-100 rounded-tr-none"
      )}>
        <p className="text-gray-800">{message}</p>
        <span className="text-xs text-gray-500 mt-1 block">{timestamp}</span>
      </div>
    </div>
  );
}