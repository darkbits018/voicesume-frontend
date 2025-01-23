import { ResumeData, WorkflowStage } from '../types/workflow';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Update with your backend URL

export const sendResponse = async (stage: WorkflowStage, data: Partial<ResumeData>) => {
    const endpoints: Record<WorkflowStage, string> = {
        welcome: '/start-resume',
        userInfo: '/start-resume',
        experienceLevel: '/set-experience-level',
        careerObjective: '/generate-career-profile',
        education: '/add-education',
        skills: '/segregate-skills',
        projects: '/add-projects',
        internships: '/add-internships',
        certifications: '/add-certifications',
        achievements: '/add-achievements',
        hobbies: '/add-hobbies',
        summary: '/get-resume',
        template: '/generate-template',
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