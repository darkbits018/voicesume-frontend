/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { StageManager } from './components/StageManager';
import { useWorkflow } from './hooks/useWorkflow';
import { useVoiceInput } from './hooks/useVoiceInput';
import { getNextStage } from './utils/workflowUtils';
import { ChatAction } from './types';

function App() {
  const { state, moveToStage, addMessage, updateData } = useWorkflow();
  const { isListening, transcript, startListening, stopListening } = useVoiceInput();
  const [useAISuggestion, setUseAISuggestion] = useState(false); // Define useAISuggestion state
  const [editingProfile, setEditingProfile] = useState(false); // Define editingProfile state
  const [inputValue, setInputValue] = useState(''); // Define inputValue state
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleStageComplete = (data: any, message: string) => {
    addMessage(message, 'user');
    updateData(data);
    const nextStage = getNextStage(state.stage);
    if (nextStage) {
      moveToStage(nextStage);
    }
  };

  const handleSendMessage = (message: string, type: 'user' | 'ai' = 'user', action?: ChatAction) => {
    addMessage(message, type);
    if (action) {
      addMessage(action, 'ai');
    }
  };

  const handleAISuggestion = () => {
    setUseAISuggestion(true);
    addMessage('Please enter your desired job role.', 'ai');
  };

  const handleAISuggestionSubmit = (desiredJobRole: string) => {
    const message = `Desired Job Role: ${desiredJobRole}`;
    handleStageComplete({ desiredJobRole }, message);

    // Simulate AI-generated career profile
    const dummyProfile = `Based on your desired job role as a ${desiredJobRole}, here is a suggested career profile: "To secure a position as a ${desiredJobRole}, leveraging my skills and knowledge to contribute to organizational success."`;
    handleSendMessage(dummyProfile, 'ai');

    // Provide chat action buttons
    const action: ChatAction = {
      type: 'button',
      options: [
        { label: 'Edit', value: 'edit', action: () => handleEditProfile(dummyProfile) },
        { label: 'Proceed', value: 'proceed', action: () => handleProceed() },
      ],
    };
    handleSendMessage('What would you like to do next?', 'ai', action);
  };

  const handleEditProfile = (profile: string) => {
    setEditingProfile(true);
    setInputValue(profile);
    handleSendMessage('Please edit your career profile in the chatbox below.', 'ai');
  };

  const handleProceed = () => {
    setUseAISuggestion(false);
    setEditingProfile(false);
    const nextStage = getNextStage(state.stage);
    if (nextStage) {
      moveToStage(nextStage);
    }
  };

  const handleProfileUpdate = (updatedProfile: string) => {
    handleSendMessage(`Updated Career Profile: "${updatedProfile}"`, 'user');
    setEditingProfile(false);
    handleProceed();
  };

  const handleSendMessageWrapper = (message: string) => {
    if (editingProfile) {
      handleProfileUpdate(message);
    } else if (useAISuggestion) {
      handleAISuggestionSubmit(message);
    } else {
      handleSendMessage(message);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b p-4">
        <h1 className="text-xl font-semibold text-gray-800">Resume Builder</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {state.messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              type={message.type}
            />
          ))}
          <StageManager 
            stage={state.stage}
            onStageComplete={handleStageComplete}
            handleSendMessage={handleSendMessage}
            handleAISuggestion={handleAISuggestion}
            handleEditProfile={handleEditProfile}
          />
          <div ref={chatEndRef} />
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            onSend={handleSendMessageWrapper}
            onStartVoice={startListening}
            onStopVoice={stopListening}
            isListening={isListening}
            transcript={transcript}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      </footer>
    </div>
  );
}

export default App;