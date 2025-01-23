import { WorkflowStage } from '../types/workflow';

export const getNextStage = (currentStage: WorkflowStage): WorkflowStage | null => {
  switch (currentStage) {
    case 'welcome':
      return 'userInfo';
    case 'userInfo':
      return 'experienceLevel';
    case 'experienceLevel':
      return 'careerObjective';
    case 'careerObjective':
      return null; // No next stage, end of workflow
    case 'education':
      return 'skills';
    case 'skills':
      return 'projects';
    case 'projects':
      return 'internships';
    case 'internships':
      return 'certifications';
    case 'certifications':
      return 'summary';
    case 'summary':
      return null;
    default:
      return null;
  }
};