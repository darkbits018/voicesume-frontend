import React, { useState } from 'react';
import { Mic, Send } from 'lucide-react';
import { cn } from '../utils/cn';

interface ChatInputProps {
  onSend: (message: string) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  isListening: boolean;
}

export function ChatInput({ onSend, onStartRecording, onStopRecording, isListening }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 border-t p-4 bg-white">
      <button
        onClick={isListening ? onStopRecording : onStartRecording}
        className={cn(
          "p-2 rounded-full transition-colors",
          isListening 
            ? "bg-red-100 text-red-600 hover:bg-red-200" 
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        )}
      >
        <Mic className={cn(
          "w-6 h-6",
          isListening && "animate-pulse"
        )} />
      </button>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        className="flex-1 resize-none rounded-xl border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={1}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-6 h-6" />
      </button>
    </div>
  );
}