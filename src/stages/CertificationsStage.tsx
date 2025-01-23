import React, { useState } from 'react';
import { ChatInput } from '../components/ChatInput';

interface CertificationsStageProps {
    onStageComplete: (data: { certifications: Array<{ name: string; issuer: string; date: string }> }) => void;
}

export const CertificationsStage: React.FC<CertificationsStageProps> = ({ onStageComplete }) => {
    const [certifications, setCertifications] = useState<Array<{ name: string; issuer: string; date: string }>>([]);
    const [currentCertification, setCurrentCertification] = useState({ name: '', issuer: '', date: '' });
    const [step, setStep] = useState<'name' | 'issuer' | 'date'>('name');

    const handleInputSubmit = (value: string) => {
        if (step === 'name') {
            setCurrentCertification({ ...currentCertification, name: value });
            setStep('issuer');
        } else if (step === 'issuer') {
            setCurrentCertification({ ...currentCertification, issuer: value });
            setStep('date');
        } else if (step === 'date') {
            const updatedCertification = { ...currentCertification, date: value };
            setCertifications([...certifications, updatedCertification]);
            setCurrentCertification({ name: '', issuer: '', date: '' });
            setStep('name');
        }
    };

    const handleStageComplete = () => {
        onStageComplete({ certifications });
    };

    return (
        <div className="space-y-4">
            {step === 'name' && (
                <div>
                    <p className="text-lg font-semibold">Enter the certification name:</p>
                    <ChatInput onSend={handleInputSubmit} placeholder="e.g., AWS Certified Developer" />
                </div>
            )}
            {step === 'issuer' && (
                <div>
                    <p className="text-lg font-semibold">Enter the issuer:</p>
                    <ChatInput onSend={handleInputSubmit} placeholder="e.g., Amazon Web Services" />
                </div>
            )}
            {step === 'date' && (
                <div>
                    <p className="text-lg font-semibold">Enter the date of certification:</p>
                    <ChatInput onSend={handleInputSubmit} placeholder="e.g., August 2023" />
                </div>
            )}
            {certifications.length > 0 && (
                <button
                    onClick={handleStageComplete}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Complete Certifications Stage
                </button>
            )}
        </div>
    );
};