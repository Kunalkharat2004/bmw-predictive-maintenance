/**
 * Main Dashboard Component
 * Orchestrates the vehicle health monitoring interface
 */
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import TelemetryForm from './TelemetryForm';
import KPICards from './KPICards';
import ComponentHealth from './ComponentHealth';
import DegradationContributors from './DegradationContributors';
import MaintenanceRecommendation from './MaintenanceRecommendation';
import { predictVehicleHealth } from '../services/api';
import { FEATURE_DEFINITIONS, convertToFeatures } from '../utils/helpers';

const Dashboard = () => {
  // Initialize with default values
  const [telemetryValues, setTelemetryValues] = useState(() => {
    const defaults = {};
    FEATURE_DEFINITIONS.forEach(f => {
      defaults[f.id] = f.default;
    });
    return defaults;
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      // Convert UI values to normalized features
      const features = convertToFeatures(telemetryValues);
      
      // Call API
      const result = await predictVehicleHealth(features);
      
      if (result.success) {
        setPrediction(result.data);
      } else {
        setError('Failed to get prediction. Please try again.');
      }
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message || 'An error occurred while analyzing vehicle health.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                🚗 BMW Vehicle Health Monitor
              </h1>
              <p className="text-blue-100 mt-1">
                AI-Powered Predictive Maintenance Dashboard
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-sm font-medium">Real-time Analysis</p>
              <p className="text-xs text-blue-100">LSTM + Autoencoder</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Telemetry Input */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TelemetryForm
                values={telemetryValues}
                onChange={setTelemetryValues}
              />

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className={`w-full mt-6 py-4 px-6 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-300 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  '🔍 Analyze Vehicle Health'
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border-2 border-red-300 rounded-xl p-4 text-red-800">
                <p className="font-semibold">⚠️ Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Executive Summary */}
            {!prediction && !loading && (
              <div className="bg-white rounded-xl p-8 border-2 border-gray-200 text-center">
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                  <svg
                    className="h-12 w-12 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Ready to Analyze
                </h2>
                <p className="text-gray-600">
                  Adjust the vehicle telemetry parameters on the left and click
                  "Analyze Vehicle Health" to get AI-powered diagnostics and
                  maintenance recommendations.
                </p>
              </div>
            )}

            {/* Results */}
            {prediction && (
              <>
                {/* Maintenance Recommendation */}
                <MaintenanceRecommendation
                  decision={prediction.maintenance_decision}
                />

                {/* KPI Cards */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    📊 Key Performance Indicators
                  </h2>
                  <KPICards kpis={prediction.kpis} />
                </div>

                {/* Component Health */}
                <ComponentHealth componentHealth={prediction.component_health} />

                {/* Degradation Contributors */}
                <DegradationContributors
                  contributors={prediction.degradation_contributors}
                />
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm">
            BMW Vehicle Health Monitoring System | Powered by AI & Machine Learning
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
