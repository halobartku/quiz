import { Answer, RiderType, ScoringResult } from '../types/quiz.types';

export class ScoringService {
  calculateScore(answers: Answer[]): ScoringResult {
    const scores: Record<RiderType, { raw: number; percentage: number }> = {
      competitive: { raw: 0, percentage: 0 },
      recreational: { raw: 0, percentage: 0 },
      trainer: { raw: 0, percentage: 0 },
      adventurous: { raw: 0, percentage: 0 }
    };

    // Calculate raw scores
    answers.forEach(answer => {
      Object.entries(answer.points).forEach(([type, points]) => {
        scores[type as RiderType].raw += points;
      });
    });

    // Calculate percentages
    const maxPossible = answers.length * 4; // Maximum 4 points per question
    Object.keys(scores).forEach(type => {
      scores[type as RiderType].percentage = 
        (scores[type as RiderType].raw / maxPossible) * 100;
    });

    // Determine primary and secondary types
    let primaryType: RiderType = 'competitive';
    let secondaryType: RiderType | null = null;
    let maxScore = -1;
    let secondMaxScore = -1;

    Object.entries(scores).forEach(([type, score]) => {
      if (score.raw > maxScore) {
        secondMaxScore = maxScore;
        secondaryType = primaryType;
        maxScore = score.raw;
        primaryType = type as RiderType;
      } else if (score.raw > secondMaxScore) {
        secondMaxScore = score.raw;
        secondaryType = type as RiderType;
      }
    });

    return {
      primaryType,
      secondaryType,
      scores
    };
  }
}

export const scoringService = new ScoringService();