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
  const { state, moveToStage, addMessage, updateData, onStageComplete } = useWorkflow();
  const { isListening, transcript, startListening, stopListening } = useVoiceInput();
  const [useAISuggestion, setUseAISuggestion] = useState(false); // Define useAISuggestion state
  const [editingProfile, setEditingProfile] = useState(false); // Define editingProfile state
  const [inputValue, setInputValue] = useState(''); // Define inputValue state
  const [showInput, setShowInput] = useState(true);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleProfileEdit = (profile: string) => {
    setInputValue(profile);
    setEditingProfile(true);
  };

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

  // const handleProfileUpdate = (updatedProfile: string) => {
  //   handleSendMessage(`Updated Career Profile: "${updatedProfile}"`, 'user');
  //   setEditingProfile(false);
  //   handleSendMessage("Moving to education details", 'ai');
  //   moveToStage('education');
  //   handleSendMessage(
  //     "Let's define your educational qualifications. Please enter your qualification in this format:\n\n" +
  //     "Degree, Specialization, College Name, Year of Completion, CGPA/Percentage\n\n" +
  //     "Example: B.E, CSE from XYZ College, 2019, 8.5 CGPA",
  //     'ai'
  //   );
  // };

  const handleProfileUpdate = async (updatedProfile: string) => {
    try {
      // Send the updated profile to the Flask backend
      const response = await fetch('http://127.0.0.1:5000/update-career-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updated_profile: updatedProfile }),
      });

      if (!response.ok) {
        throw new Error('Failed to update career profile.');
      }

      const data = await response.json();
      console.log(data.message); // Log success message

      // Update the UI
      handleSendMessage(`Updated Career Profile: "${updatedProfile}"`, 'user');
      setEditingProfile(false);
      handleSendMessage("Moving to education details", 'ai');
      moveToStage('education');
      handleSendMessage(
        "Let's define your educational qualifications. Please enter your qualification in this format:\n\n" +
        "Degree, Specialization, College Name, Year of Completion, CGPA/Percentage\n\n" +
        "Example: B.E, CSE from XYZ College, 2019, 8.5 CGPA",
        'ai'
      );
    } catch (error) {
      console.error('Error updating career profile:', error);
      handleSendMessage('Failed to update career profile. Please try again.', 'ai');
    }
  };

  const handleSendMessageWrapper = (message: string) => {
    if (editingProfile) {
      handleProfileUpdate(message);
    } else if (useAISuggestion && state.stage === 'careerObjective') {
      handleSendMessage(message, 'user');
      handleAISuggestionSubmit(message);
      setUseAISuggestion(false);
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
            setInputValue={handleProfileEdit}
            setShowInput={setShowInput}  // Add this prop
            moveToStage={moveToStage} // Pass this prop
            state={state}

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