import React, { useState } from 'react';

interface EducationalQualificationsStageProps {
  onSubmit: (data: { education: string }) => void;
}

export const EducationalQualificationsStage: React.FC<EducationalQualificationsStageProps> = ({ onSubmit }) => {
  const [education, setEducation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ education });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Educational Qualification</h2>
      
      <div>
        <input
          type="text"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          placeholder="Example: B.E, CSE from XYZ College, 2019, 8.5 CGPA"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
      >
        Continue
      </button>
    </form>
  );
}; 