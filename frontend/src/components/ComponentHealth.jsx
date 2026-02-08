/**
 * Component Health Display
 * Shows health status breakdown by component
 */
import React from 'react';
import { Battery, Thermometer, Cog, CircleSlash, TrendingDown } from 'lucide-react';

const ComponentHealth = ({ componentHealth }) => {
  if (!componentHealth) {
    return (
      <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🧩 Component-Level Health Assessment
        </h3>
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-12 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const componentIcons = {
    'Battery System': Battery,
    'Thermal System': Thermometer,
    'Motor System': Cog,
    'Braking System': CircleSlash,
    'Usage Stress': TrendingDown
  };

  const getStatusColor = (status) => {
    const colors = {
      healthy: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-300',
        bar: 'bg-green-500'
      },
      degrading: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-300',
        bar: 'bg-yellow-500'
      },
      critical: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-300',
        bar: 'bg-red-500'
      }
    };
    return colors[status] || colors.healthy;
  };

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        🧩 Component-Level Health Assessment
      </h3>

      <div className="space-y-4">
        {Object.entries(componentHealth).map(([name, data]) => {
          const Icon = componentIcons[name] || Cog;
          const colors = getStatusColor(data.status);

          return (
            <div
              key={name}
              className={`border-2 ${colors.border} ${colors.bg} rounded-lg p-4 transition-all hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${colors.text}`} />
                  <span className="font-semibold text-gray-800">{name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${colors.text}`}>
                    {data.score}%
                  </span>
                  <span className="text-lg">{data.icon}</span>
                </div>
              </div>

              {/* Health bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${colors.bar} transition-all duration-500`}
                  style={{ width: `${data.score}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComponentHealth;
