import React, { useState, useEffect } from 'react';
import { Moon, Sun, LogIn, LogOut } from 'lucide-react';
import { auth } from './config/firebase';
import { User } from 'firebase/auth';
import { ChatBubble } from './components/ChatBubble';
import { ChatInput } from './components/ChatInput';
import { AuthModal } from './components/AuthModal';
import { ResumeTemplates } from './components/ResumeTemplates';
import { useVoiceInput } from './hooks/useVoiceInput';
import { useVoiceOutput } from './hooks/useVoiceOutput';
import { cn } from './utils/cn';

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: string;
}

interface ResumeData {
  personalInfo?: {
    name: string;
    email: string;
    phone: string;
  };
  education?: {
    degree: string;
    school: string;
    year: string;
  }[];
  experience?: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  skills?: string[];
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI resume builder assistant. Please sign in to start creating your professional resume.",
      isAI: true,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>({});
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<string>('welcome');

  const { isListening, transcript, startListening, stopListening } = useVoiceInput();
  const { speak, stopSpeaking } = useVoiceOutput();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        addAIMessage("Great! Let's start building your resume. First, would you like to choose a template?");
      }
    });
    return () => unsubscribe();
  }, []);

  const addAIMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isAI: true,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);
    speak(text);
  };

  const handleSend = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isAI: false,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);
    stopSpeaking();

    // Process user input based on current step
    processUserInput(message);
  };

  const processUserInput = (message: string) => {
    switch (currentStep) {
      case 'welcome':
        setCurrentStep('template');
        addAIMessage("Please select a template for your resume.");
        break;
      case 'personal_info':
        // Process personal information
        const personalInfo = extractPersonalInfo(message);
        setResumeData(prev => ({
          ...prev,
          personalInfo
        }));
        setCurrentStep('education');
        addAIMessage("Great! Now, let's add your education details. Please provide your degree, school, and graduation year.");
        break;
      case 'education':
        // Process education information
        const education = extractEducation(message);
        setResumeData(prev => ({
          ...prev,
          education: [...(prev.education || []), education]
        }));
        setCurrentStep('experience');
        addAIMessage("Excellent! Let's move on to your work experience. Please share your job title, company, duration, and key responsibilities.");
        break;
      case 'experience':
        // Process work experience
        const experience = extractExperience(message);
        setResumeData(prev => ({
          ...prev,
          experience: [...(prev.experience || []), experience]
        }));
        setCurrentStep('skills');
        addAIMessage("Almost done! Finally, list your key skills and expertise.");
        break;
      case 'skills':
        // Process skills
        const skills = message.split(',').map(skill => skill.trim());
        setResumeData(prev => ({
          ...prev,
          skills
        }));
        setCurrentStep('review');
        addAIMessage("Perfect! I've compiled your resume. Would you like to review it?");
        break;
      default:
        addAIMessage("I'm not sure how to process that. Could you please try again?");
    }
  };

  const extractPersonalInfo = (message: string) => {
    // Simple extraction logic - in a real app, use NLP or more sophisticated parsing
    const parts = message.split(',').map(part => part.trim());
    return {
      name: parts[0] || '',
      email: parts[1] || '',
      phone: parts[2] || ''
    };
  };

  const extractEducation = (message: string) => {
    const parts = message.split(',').map(part => part.trim());
    return {
      degree: parts[0] || '',
      school: parts[1] || '',
      year: parts[2] || ''
    };
  };

  const extractExperience = (message: string) => {
    const parts = message.split(',').map(part => part.trim());
    return {
      title: parts[0] || '',
      company: parts[1] || '',
      duration: parts[2] || '',
      description: parts[3] || ''
    };
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setCurrentStep('personal_info');
    addAIMessage("Great choice! Now, please provide your personal information in the following format: Full Name, Email, Phone Number");
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors",
      darkMode ? "bg-gray-900" : "bg-gray-100"
    )}>
      <div className="max-w-3xl mx-auto h-screen flex flex-col">
        <header className={cn(
          "flex items-center justify-between p-4 border-b",
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <h1 className={cn(
            "text-xl font-bold",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            AI Resume Builder
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={cn(
                "p-2 rounded-full",
                darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-600"
              )}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {user ? (
              <button
                onClick={() => auth.signOut()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </header>

        <div className={cn(
          "flex-1 overflow-y-auto p-4",
          darkMode ? "bg-gray-900" : "bg-gray-50"
        )}>
          {currentStep === 'template' && (
            <ResumeTemplates onSelect={handleTemplateSelect} />
          )}
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              isAI={message.isAI}
              timestamp={message.timestamp}
            />
          ))}
        </div>

        <ChatInput
          onSend={handleSend}
          onStartRecording={startListening}
          onStopRecording={stopListening}
          isListening={isListening}
        />
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default App;