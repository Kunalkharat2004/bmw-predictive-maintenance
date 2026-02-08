/**
 * Telemetry Input Form Component
 * Allows users to adjust vehicle telemetry parameters using sliders
 */
import React from 'react';
import { FEATURE_DEFINITIONS } from '../utils/helpers';

const TelemetryForm = ({ values, onChange }) => {
  // Group features by category
  const categories = {
    battery: { name: 'Battery System', icon: '🔋', color: 'blue' },
    thermal: { name: 'Thermal Management', icon: '🌡️', color: 'orange' },
    motor: { name: 'Motor System', icon: '⚙️', color: 'purple' },
    braking: { name: 'Braking System', icon: '🛑', color: 'red' },
    usage: { name: 'Usage Metrics', icon: '📊', color: 'green' },
    overall: { name: 'Overall Health', icon: '💚', color: 'teal' }
  };

  const groupedFeatures = FEATURE_DEFINITIONS.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          🔧 Live Vehicle Telemetry
        </h2>
        <button
          onClick={() => {
            const defaults = {};
            FEATURE_DEFINITIONS.forEach(f => {
              defaults[f.id] = f.default;
            });
            onChange(defaults);
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset to Defaults
        </button>
      </div>

      {Object.entries(groupedFeatures).map(([category, features]) => {
        const categoryInfo = categories[category];
        const colorClasses = {
          blue: 'border-blue-200 bg-blue-50',
          orange: 'border-orange-200 bg-orange-50',
          purple: 'border-purple-200 bg-purple-50',
          red: 'border-red-200 bg-red-50',
          green: 'border-green-200 bg-green-50',
          teal: 'border-teal-200 bg-teal-50'
        };

        return (
          <div
            key={category}
            className={`border-2 rounded-xl p-6 ${colorClasses[categoryInfo.color]}`}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">{categoryInfo.icon}</span>
              {categoryInfo.name}
            </h3>

            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      {feature.name}
                    </label>
                    <span className="text-sm font-bold text-gray-900 bg-white px-3 py-1 rounded-lg shadow-sm">
                      {values[feature.id]} {feature.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={feature.min}
                    max={feature.max}
                    step={feature.step || 1}
                    value={values[feature.id]}
                    onChange={(e) => onChange({
                      ...values,
                      [feature.id]: Number(e.target.value)
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{feature.min} {feature.unit}</span>
                    <span>{feature.max} {feature.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TelemetryForm;
