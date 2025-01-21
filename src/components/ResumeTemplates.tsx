import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'professional',
    name: 'Professional',
    preview: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'creative',
    name: 'Creative',
    preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=300&q=80'
  }
];

interface ResumeTemplatesProps {
  onSelect: (templateId: string) => void;
}

export function ResumeTemplates({ onSelect }: ResumeTemplatesProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextTemplate = () => {
    setCurrentIndex((prev) => (prev + 1) % templates.length);
  };

  const prevTemplate = () => {
    setCurrentIndex((prev) => (prev - 1 + templates.length) % templates.length);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4">Choose a Template</h3>
      <div className="relative flex items-center">
        <button
          onClick={prevTemplate}
          className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {templates.map((template) => (
              <div
                key={template.id}
                className="flex-shrink-0 w-full px-8"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <h4 className="font-medium mb-2">{template.name}</h4>
                  <button
                    onClick={() => onSelect(template.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Select Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={nextTemplate}
          className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}