import React, { useState } from 'react';

interface Education {
  degree: string;
  institution: string;
  year: string;
  percentage: string;
}

interface EducationalQualificationsStageProps {
  onSubmit: (data: { education: Education[] }) => void;
}

export const EducationalQualificationsStage: React.FC<EducationalQualificationsStageProps> = ({ onSubmit }) => {
  const [qualifications, setQualifications] = useState<Education[]>([
    { degree: '', institution: '', year: '', percentage: '' }
  ]);

  const handleChange = (index: number, field: keyof Education, value: string) => {
    const newQualifications = [...qualifications];
    newQualifications[index][field] = value;
    setQualifications(newQualifications);
  };

  const addMore = () => {
    setQualifications([...qualifications, { degree: '', institution: '', year: '', percentage: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ education: qualifications });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Educational Qualifications</h2>
      
      {qualifications.map((qual, index) => (
        <div key={index} className="space-y-3 p-4 border rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Degree/Certificate</label>
            <input
              type="text"
              value={qual.degree}
              onChange={(e) => handleChange(index, 'degree', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Institution</label>
            <input
              type="text"
              value={qual.institution}
              onChange={(e) => handleChange(index, 'institution', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              value={qual.year}
              onChange={(e) => handleChange(index, 'year', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Percentage/CGPA</label>
            <input
              type="text"
              value={qual.percentage}
              onChange={(e) => handleChange(index, 'percentage', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      ))}
      
      <div className="flex gap-4">
        <button
          type="button"
          onClick={addMore}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          + Add More
        </button>
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Continue
        </button>
      </div>
    </form>
  );
}; 