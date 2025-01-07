import { ResumeData, WorkflowStage } from '../types/workflow';

const API_BASE_URL = '/api';

export const sendResponse = async (stage: WorkflowStage, data: Partial<ResumeData>) => {
    const endpoints: Record<WorkflowStage, string> = {
        welcome: '/welcome',
        userInfo: '/user-info',
        experienceLevel: '/experience-level',
        careerObjective: '/career-objective',
        education: '/education',
        skills: '/skills',
        projects: '/projects',
        internships: '/internships',
        certifications: '/certifications',
        achievements: '/achievements',
        hobbies: '/hobbies',
        summary: '/summary',
        template: '/template'
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoints[stage]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error sending ${stage} data:`, error);
        throw error;
    }
};