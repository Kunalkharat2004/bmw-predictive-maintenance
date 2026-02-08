/**
 * Telemetry Input Form Component
 * Allows users to adjust vehicle telemetry parameters
 */
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Slider, 
  Collapse,
  IconButton,
  useTheme
} from '@mui/material';
import { 
  RestartAlt as ResetIcon,
  BatteryChargingFull,
  Thermostat,
  SettingsSuggest,
  Speed,
  Timeline,
  HealthAndSafety,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { useThemeMode } from '../context/ThemeContext';
import { FEATURE_DEFINITIONS } from '../utils/helpers';

const TelemetryForm = ({ values, onChange }) => {
  const theme = useTheme();
  const { isDark } = useThemeMode();

  const [expandedCategories, setExpandedCategories] = React.useState({
    battery: true,
    thermal: true,
    motor: true,
    braking: true,
    usage: true,
    overall: true
  });

  const groupedFeatures = FEATURE_DEFINITIONS.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    const iconProps = { sx: { fontSize: 18 } };
    switch(category) {
      case 'battery': return <BatteryChargingFull {...iconProps} />;
      case 'thermal': return <Thermostat {...iconProps} />;
      case 'motor': return <SettingsSuggest {...iconProps} />;
      case 'braking': return <Speed {...iconProps} />;
      case 'usage': return <Timeline {...iconProps} />;
      default: return <HealthAndSafety {...iconProps} />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'battery': return '#3b82f6';
      case 'thermal': return '#f97316';
      case 'motor': return '#8b5cf6';
      case 'braking': return '#ef4444';
      case 'usage': return '#22c55e';
      default: return '#06b6d4';
    }
  };

  const getCategoryLabel = (category) => {
    const labels = {
        battery: 'Battery',
        thermal: 'Thermal',
        motor: 'Motor',
        braking: 'Braking',
        usage: 'Usage',
        overall: 'Overall'
    };
    return labels[category] || category;
  };

  const handleReset = () => {
    const defaults = {};
    FEATURE_DEFINITIONS.forEach(f => {
      defaults[f.id] = f.default;
    });
    onChange(defaults);
  };

  const handleSliderChange = (id) => (event, newValue) => {
    onChange({ ...values, [id]: newValue });
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Theme-aware colors
  const colors = {
    textPrimary: isDark ? 'rgba(255,255,255,0.9)' : '#0f172a',
    textSecondary: isDark ? 'rgba(255,255,255,0.6)' : '#64748b',
    textMuted: isDark ? 'rgba(255,255,255,0.4)' : '#94a3b8',
    textVeryMuted: isDark ? 'rgba(255,255,255,0.3)' : '#cbd5e1',
    cardBg: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
    cardBorder: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    hoverBg: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    sliderRail: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
  };

  return (
    <Box>
      {/* Reset Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          variant="text" 
          size="small" 
          startIcon={<ResetIcon sx={{ fontSize: 16 }} />} 
          onClick={handleReset}
          sx={{ 
            color: colors.textMuted,
            fontSize: '0.75rem',
            '&:hover': { color: colors.textSecondary, bgcolor: colors.hoverBg }
          }}
        >
          Reset All
        </Button>
      </Box>

      {/* Category Groups */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {Object.entries(groupedFeatures).map(([category, features]) => {
          const color = getCategoryColor(category);
          const isExpanded = expandedCategories[category];
          
          return (
            <Box 
              key={category}
              sx={{ 
                bgcolor: colors.cardBg,
                borderRadius: 2,
                border: `1px solid ${colors.cardBorder}`,
                overflow: 'hidden'
              }}
            >
              {/* Category Header */}
              <Box 
                onClick={() => toggleCategory(category)}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  px: 2,
                  py: 1.5,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: colors.hoverBg }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box 
                    sx={{ 
                      p: 0.75, 
                      borderRadius: 1.5, 
                      bgcolor: `${color}20`,
                      color: color,
                      display: 'flex'
                    }}
                  >
                    {getCategoryIcon(category)}
                  </Box>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ color: colors.textPrimary, fontWeight: 600 }}
                  >
                    {getCategoryLabel(category)}
                  </Typography>
                </Box>
                <IconButton size="small" sx={{ color: colors.textVeryMuted }}>
                  {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </IconButton>
              </Box>
              
              {/* Features */}
              <Collapse in={isExpanded}>
                <Box sx={{ px: 2, pb: 2, pt: 0.5 }}>
                  {features.map((feature) => (
                    <Box key={feature.id} sx={{ mb: 2.5, '&:last-child': { mb: 0 } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography 
                          variant="caption" 
                          sx={{ color: colors.textSecondary, fontWeight: 500 }}
                        >
                          {feature.name}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ color: color, fontWeight: 700 }}
                        >
                          {values[feature.id]} {feature.unit}
                        </Typography>
                      </Box>
                      <Slider
                        value={typeof values[feature.id] === 'number' ? values[feature.id] : 0}
                        onChange={handleSliderChange(feature.id)}
                        min={feature.min}
                        max={feature.max}
                        step={feature.step || 1}
                        size="small"
                        sx={{
                          color: color,
                          height: 4,
                          '& .MuiSlider-thumb': {
                            width: 14,
                            height: 14,
                            bgcolor: isDark ? 'white' : color,
                            border: `2px solid ${color}`,
                            '&:hover, &.Mui-focusVisible': {
                              boxShadow: `0 0 0 6px ${color}30`
                            }
                          },
                          '& .MuiSlider-track': {
                            bgcolor: color
                          },
                          '& .MuiSlider-rail': {
                            bgcolor: colors.sliderRail
                          }
                        }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" sx={{ color: colors.textVeryMuted, fontSize: '0.65rem' }}>
                          {feature.min}
                        </Typography>
                        <Typography variant="caption" sx={{ color: colors.textVeryMuted, fontSize: '0.65rem' }}>
                          {feature.max}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TelemetryForm;
