import React, { useState } from 'react';
import Question from './Question';
import Results from './Results';
import { Answer, Question as QuestionType, ScoringResult } from '../types/quiz.types';
import { scoringService } from '../services/scoringService';
import { aiService } from '../services/aiService';
import { questions } from '../data/questions';

const QuizContainer: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(-1);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<ScoringResult | null>(null);
  const [aiResult, setAiResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setCurrentQuestion(0);
  };

  const handleAnswer = async (answer: Answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (newAnswers.length === questions.length) {
      // Quiz completed
      setIsLoading(true);
      const scoringResult = scoringService.calculateScore(newAnswers);
      setResult(scoringResult);

      try {
        const enhancedResults = await aiService.enhanceResults(
          scoringResult,
          newAnswers.map(a => a.text)
        );
        setAiResult(enhancedResults);
      } catch (error) {
        console.error('AI enhancement failed:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Move to next question
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(-1);
    setAnswers([]);
    setResult(null);
    setAiResult(null);
  };

  if (currentQuestion === -1) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">
          Jakim typem jeźdźca jesteś?
        </h1>
        <p className="text-xl mb-8">
          Odkryj swój unikalny styl jeździecki i otrzymaj spersonalizowane rekomendacje rozwoju.
        </p>
        <button
          onClick={handleStart}
          className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark"
        >
          Rozpocznij Quiz
        </button>
      </div>
    );
  }

  if (result) {
    return (
      <Results 
        result={result} 
        aiResult={aiResult} 
        isLoading={isLoading} 
        onRestart={handleRestart}
      />
    );
  }

  return (
    <Question
      question={questions[currentQuestion]}
      currentQuestion={currentQuestion + 1}
      totalQuestions={questions.length}
      onAnswer={handleAnswer}
    />
  );
};

export default QuizContainer;