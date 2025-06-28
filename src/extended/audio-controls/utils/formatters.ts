export const formatDb = (value: number): string => {
  if (value === 0) return '0 dB';
  return value > 0 ? `+${value.toFixed(1)} dB` : `${value.toFixed(1)} dB`;
};

export const formatPan = (value: number): string => {
  if (value === 0) return 'C';
  return value > 0 ? `${value}R` : `${Math.abs(value)}L`;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
};

export const formatBpm = (bpm: number): string => {
  return `${bpm.toFixed(1)} BPM`;
};

export const formatFrequency = (hz: number): string => {
  if (hz >= 1000) {
    return `${(hz / 1000).toFixed(1)}kHz`;
  }
  return `${hz.toFixed(0)}Hz`;
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const valueToPercentage = (value: number, min: number, max: number): number => {
  return ((value - min) / (max - min)) * 100;
};

export const percentageToValue = (percentage: number, min: number, max: number): number => {
  return (percentage / 100) * (max - min) + min;
};

export const clampValue = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};