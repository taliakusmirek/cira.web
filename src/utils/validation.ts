import { 
  QualityLevel, 
  ConstructionLevel, 
  DurabilityRange, 
  EthicsRating 
} from '@/types/report';

export const validQualityLevels: QualityLevel[] = ['Excellent', 'Good', 'Average', 'Fair'];
export const validConstructionLevels: ConstructionLevel[] = ['Premium', 'Quality', 'Standard', 'Basic'];
export const validDurabilityRanges: DurabilityRange[] = ['5+ Years', '3-4 Years', '2-3 Years', '1-2 Years'];
export const validEthicsRatings: EthicsRating[] = ['Positive', 'Good', 'Neutral', 'Concerning'];

export const validateQualityLevel = (value: any): QualityLevel => {
  return validQualityLevels.includes(value) ? value : 'Average';
};

export const validateConstructionLevel = (value: any): ConstructionLevel => {
  return validConstructionLevels.includes(value) ? value : 'Standard';
};

export const validateDurabilityRange = (value: any): DurabilityRange => {
  return validDurabilityRanges.includes(value) ? value : '2-3 Years';
};

export const validateEthicsRating = (value: any): EthicsRating => {
  return validEthicsRatings.includes(value) ? value : 'Neutral';
};

export const validateOverallScore = (score: any): number => {
  const numScore = Number(score);
  if (isNaN(numScore)) return 75; // Default to average
  return Math.min(100, Math.max(0, Math.round(numScore))); // Clamp between 0-100
};
