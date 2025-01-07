import { useState, useCallback, useEffect } from 'react';
import { WorkflowState, WorkflowStage, ResumeData } from '../types/workflow';
import { createMessage } from '../utils/messageUtils';
import { getStageMessage } from '../utils/workflowMessages';

const initialState: WorkflowState = {
  stage: 'welcome',
  messages: [
    createMessage('ai', 'Welcome! Let\'s build your resume together.')
  ],
  data: {}
};

export function useWorkflow() {
  const [state, setState] = useState<WorkflowState>(initialState);

  // Automatically move to userInfo stage after welcome
  useEffect(() => {
    if (state.stage === 'welcome') {
      setTimeout(() => {
        moveToStage('userInfo');
      }, 1000);
    }
  }, [state.stage]);

  const moveToStage = useCallback((stage: WorkflowStage) => {
    setState(prev => ({
      ...prev,
      stage,
      messages: [
        ...prev.messages,
        createMessage('ai', getStageMessage(stage))
      ]
    }));
  }, []);

  const addMessage = useCallback((content: string, type: 'ai' | 'user' | 'system') => {
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, createMessage(type, content)]
    }));
  }, []);

  const updateData = useCallback((update: Partial<ResumeData>) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ...update }
    }));
  }, []);

  return {
    state,
    moveToStage,
    addMessage,
    updateData,
  };
}