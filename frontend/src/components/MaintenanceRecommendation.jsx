/**
 * Maintenance Recommendation Component
 * Displays AI-powered maintenance decision with styling based on severity
 */
import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { getSeverityColors } from '../utils/helpers';

const MaintenanceRecommendation = ({ decision }) => {
  if (!decision) {
    return null;
  }

  const colors = getSeverityColors(decision.level);

  const icons = {
    normal: CheckCircle,
    soon: Info,
    warning: AlertTriangle,
    immediate: AlertTriangle,
    critical: AlertTriangle
  };

  const Icon = icons[decision.level] || Info;

  return (
    <div className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 shadow-sm`}>
      <div className="flex items-start gap-4">
        <Icon className={`h-8 w-8 ${colors.text} flex-shrink-0`} />
        <div className="flex-1">
          <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>
            {decision.message}
          </h3>
          <p className="text-gray-700 text-lg">
            {decision.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRecommendation;
