import React from 'react';

interface SummaryStageProps {
    data: {
        personalInfo?: { name: string; phone: string; email: string };
        experienceLevel?: string;
        careerObjective?: string;
        education?: string[];
        skills?: { primary: string[]; secondary: string[]; additional: string[] };
        projects?: Array<{ title: string; description: string; technologies: string }>;
        internships?: Array<{ company: string; role: string; duration: string }>;
        certifications?: Array<{ name: string; issuer: string; date: string }>;
        achievements?: string[];
        hobbies?: string[];
        languages?: string[];
    };
}

export const SummaryStage: React.FC<SummaryStageProps> = ({ data }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Resume Summary</h2>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Personal Information</h3>
                <p>Name: {data.personalInfo?.name}</p>
                <p>Phone: {data.personalInfo?.phone}</p>
                <p>Email: {data.personalInfo?.email}</p>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Experience Level</h3>
                <p>{data.experienceLevel}</p>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Career Objective</h3>
                <p>{data.careerObjective}</p>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Education</h3>
                <ul>
                    {data.education?.map((edu, index) => (
                        <li key={index}>{edu}</li>
                    ))}
                </ul>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Skills</h3>
                <p>Primary: {data.skills?.primary.join(', ')}</p>
                <p>Secondary: {data.skills?.secondary.join(', ')}</p>
                <p>Additional: {data.skills?.additional.join(', ')}</p>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Projects</h3>
                <ul>
                    {data.projects?.map((project, index) => (
                        <li key={index}>
                            <strong>{project.title}</strong>: {project.description} ({project.technologies})
                        </li>
                    ))}
                </ul>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Internships</h3>
                <ul>
                    {data.internships?.map((internship, index) => (
                        <li key={index}>
                            <strong>{internship.company}</strong>: {internship.role} ({internship.duration})
                        </li>
                    ))}
                </ul>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Certifications</h3>
                <ul>
                    {data.certifications?.map((certification, index) => (
                        <li key={index}>
                            <strong>{certification.name}</strong> by {certification.issuer} ({certification.date})
                        </li>
                    ))}
                </ul>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Achievements</h3>
                <ul>
                    {data.achievements?.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                    ))}
                </ul>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Hobbies</h3>
                <p>{data.hobbies?.join(', ')}</p>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Languages</h3>
                <p>{data.languages?.join(', ')}</p>
            </div>
        </div>
    );
};