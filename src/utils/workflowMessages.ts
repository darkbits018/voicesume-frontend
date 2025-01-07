import { WorkflowStage } from '../types/workflow';

export const getStageMessage = (stage: WorkflowStage): string => {
  const messages: Record<WorkflowStage, string> = {
    welcome: 'Welcome! Let\'s build your resume together.',
    userInfo: 'Please enter your personal information.',
    experienceLevel: 'Are you a fresher or experienced professional?',
    careerObjective: 'Let\'s define your career objective.',
    education: 'Let\'s add your educational qualifications.',
    skills: 'Let\'s list your skills.',
    projects: 'Tell me about your projects.',
    internships: 'Have you done any internships?',
    certifications: 'Do you have any certifications?',
    achievements: 'Let\'s add your achievements.',
    hobbies: 'What are your hobbies and languages known?',
    summary: 'Here\'s a summary of your resume.',
    template: 'Choose a template for your resume.',
  };

  return messages[stage];
};