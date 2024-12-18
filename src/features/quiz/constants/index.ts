export const QUIZ_CONFIG = {
  QUESTIONS_COUNT: 15,
  MIN_ANSWERS_REQUIRED: 15,
  ANALYSIS_DELAY: 1000,
  RESULT_TYPES: ['competitive', 'recreational', 'trainer', 'adventurous'] as const,
  CATEGORIES: {
    personality: 'Osobowość',
    technical: 'Umiejętności techniczne',
    relationship: 'Relacja z koniem',
    goals: 'Cele',
    management: 'Zarządzanie'
  } as const
};

export const API_ENDPOINTS = {
  ANALYZE: '/api/analyze',
  SAVE_RESULTS: '/api/quiz/save'
};

export const SCORE_WEIGHTS = {
  primary: 1.0,
  secondary: 0.6,
  tertiary: 0.3
};

export const RESULT_THRESHOLDS = {
  HIGH: 75,
  MEDIUM: 50,
  LOW: 25
};