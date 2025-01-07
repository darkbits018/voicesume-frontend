import React, { useState, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onStartVoice: () => void;
  onStopVoice: () => void;
  isListening: boolean;
  transcript: string;
  inputValue: string;
  setInputValue: (value: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, onStartVoice, onStopVoice, isListening, transcript, inputValue, setInputValue }) => {
  const [input, setInput] = useState(inputValue);

  useEffect(() => {
    setInput(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t bg-white">
      <button
        type="button"
        onClick={isListening ? onStopVoice : onStartVoice}
        className={`p-2 rounded-full ${
          isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
        } hover:bg-gray-200 transition-colors`}
      >
        <Mic size={20} />
      </button>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setInputValue(e.target.value);
        }}
        placeholder="Type your message..."
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={!input.trim()}
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Send size={20} />
      </button>
    </form>
  );
};