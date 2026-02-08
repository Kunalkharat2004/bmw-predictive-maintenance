/**
 * KPI Cards Component
 * Displays key performance indicators in a grid layout
 */
import React from 'react';
import { Activity, Clock, AlertTriangle, Heart } from 'lucide-react';
import { formatPercentage } from '../utils/helpers';

const KPICards = ({ kpis }) => {
  if (!kpis) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
            <div className="h-20"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      id: 'failure',
      title: 'Failure Risk',
      value: kpis.failure_probability,
      unit: '%',
      icon: AlertTriangle,
      getColor: (val) => {
        if (val >= 70) return { bg: 'bg-red-100', text: 'text-red-600', icon: 'text-red-500' };
        if (val >= 40) return { bg: 'bg-yellow-100', text: 'text-yellow-600', icon: 'text-yellow-500' };
        return { bg: 'bg-green-100', text: 'text-green-600', icon: 'text-green-500' };
      }
    },
    {
      id: 'rul',
      title: 'Remaining Useful Life',
      value: kpis.remaining_useful_life,
      unit: ' cycles',
      icon: Clock,
      getColor: (val) => {
        if (val <= 30) return { bg: 'bg-red-100', text: 'text-red-600', icon: 'text-red-500' };
        if (val <= 60) return { bg: 'bg-yellow-100', text: 'text-yellow-600', icon: 'text-yellow-500' };
        return { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'text-blue-500' };
      }
    },
    {
      id: 'anomaly',
      title: 'Anomaly Index',
      value: kpis.anomaly_score,
      unit: '',
      icon: Activity,
      getColor: (val) => {
        if (val >= 0.5) return { bg: 'bg-red-100', text: 'text-red-600', icon: 'text-red-500' };
        if (val >= 0.1) return { bg: 'bg-yellow-100', text: 'text-yellow-600', icon: 'text-yellow-500' };
        return { bg: 'bg-purple-100', text: 'text-purple-600', icon: 'text-purple-500' };
      }
    },
    {
      id: 'health',
      title: 'Overall Health',
      value: kpis.overall_health,
      unit: '%',
      icon: Heart,
      getColor: (val) => {
        if (val >= 80) return { bg: 'bg-green-100', text: 'text-green-600', icon: 'text-green-500' };
        if (val >= 50) return { bg: 'bg-yellow-100', text: 'text-yellow-600', icon: 'text-yellow-500' };
        return { bg: 'bg-red-100', text: 'text-red-600', icon: 'text-red-500' };
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const colors = card.getColor(card.value);
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className={`${colors.bg} rounded-xl p-6 border-2 border-gray-200 shadow-sm hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <Icon className={`h-5 w-5 ${colors.icon}`} />
            </div>
            <div className="flex items-baseline gap-1">
              <p className={`text-3xl font-bold ${colors.text}`}>
                {card.id === 'anomaly' ? card.value.toFixed(4) : Math.round(card.value)}
              </p>
              <span className={`text-lg font-medium ${colors.text}`}>
                {card.unit}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;
