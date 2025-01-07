export type WorkflowStage =
  | 'welcome'
  | 'careerObjective'
  | 'userInfo'
  | 'experienceLevel'
  | 'education'
  | 'skills'
  | 'projects'
  | 'internships'
  | 'certifications'
  | 'achievements'
  | 'hobbies'
  | 'summary'
  | 'template';

export interface WorkflowState {
  stage: WorkflowStage;
  messages: Array<{
    id: string;
    type: 'ai' | 'user' | 'system';
    content: string;
    timestamp: Date;
  }>;
  data: ResumeData;
}

export interface ResumeData {
  personalInfo?: {
    name: string;
    phone: string;
    email: string;
  };
  experienceLevel?: 'fresher' | 'experienced';
  careerObjective?: string;
  education?: Education[];
  skills?: {
    primary: string[];
    secondary: string[];
    additional: string[];
  };
  projects?: Project[];
  internships?: Internship[];
  certifications?: Certification[];
  achievements?: Achievement[];
  hobbies?: string[];
  languages?: string[];
}