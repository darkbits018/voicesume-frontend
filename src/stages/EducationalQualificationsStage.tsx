import React, { useState } from 'react';

interface EducationalQualificationsStageProps {
  onSubmit: (data: { education: string }) => void;
  handleSendMessage: (message: string, type: 'user' | 'ai') => void;
}

export const EducationalQualificationsStage: React.FC<EducationalQualificationsStageProps> = ({ onSubmit, handleSendMessage }) => {
  const [education, setEducation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (education.trim()) { // Ensure education is not empty
      try {
        // Send the education data to the Flask backend
        const response = await fetch('http://127.0.0.1:5000/add-education', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ education_input: education }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to save education details.');
        }

        const result = await response.json();
        console.log(result.message); // Log success message

        // Update the UI
        onSubmit({ education });
      } catch (error) {
        console.error('Error saving education details:', error);
        // Display an error message in the chat
        handleSendMessage(error.message || 'Failed to save education details. Please try again.', 'ai');
      }
    }
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