export type RiderType = 'competitive' | 'recreational' | 'trainer' | 'adventurous';

export type Answer = {
  text: string;
  points: Record<RiderType, number>;
  explanation: string;
};

export type Question = {
  id: string;
  text: string;
  subtext?: string;
  category: 'personality' | 'technical' | 'relationship' | 'goals' | 'management';
  answers: Answer[];
};

export type ScoringResult = {
  primaryType: RiderType;
  secondaryType: RiderType | null;
  scores: Record<RiderType, {
    raw: number;
    percentage: number;
  }>;
};

export type AIEnhancedResult = {
  personalizedAnalysis: string;
  detailedRecommendations: string[];
  customizedTrainingPlan: string;
  strengthsAndWeaknesses: {
    strengths: string[];
    areasForImprovement: string[];
  };
  longTermVision: string;
};

export type RiderTypeInfo = {
  title: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  recommendations: string[];
  horsePreferences: string[];
  trainingStyle: string[];
  icon: string;
};