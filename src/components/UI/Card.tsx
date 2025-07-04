import React from 'react';
import type { ExplanationCardProps } from '../../types';

const Card: React.FC<ExplanationCardProps> = ({
  title,
  children,
  icon,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="flex-shrink-0 text-primary-600">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
        </div>
      </div>
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
