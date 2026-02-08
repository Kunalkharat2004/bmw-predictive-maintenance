/**
 * Degradation Contributors Component
 * Shows the top factors contributing to vehicle degradation
 */
import React from 'react';
import { AlertCircle } from 'lucide-react';

const DegradationContributors = ({ contributors }) => {
  if (!contributors || contributors.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>📉</span>
        Dominant Degradation Contributors
      </h3>

      <div className="space-y-3 mb-4">
        {contributors.map((contributor, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-amber-50 border-2 border-amber-200 rounded-lg"
          >
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">
                {contributor.feature}
              </p>
              <p className="text-sm text-gray-600">
                Current value: <span className="font-medium">{contributor.value}</span>
                {' • '}
                Importance: <span className="font-medium">{contributor.importance.toFixed(3)}</span>
              </p>
            </div>
            <div className="bg-amber-600 text-white rounded-full px-3 py-1 text-sm font-bold">
              #{index + 1}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          <strong className="text-blue-900">💡 Engineering Insight:</strong><br />
          The highlighted components show elevated stress levels and are most likely to
          contribute to future degradation or unexpected breakdowns if left unaddressed.
        </p>
      </div>
    </div>
  );
};

export default DegradationContributors;
