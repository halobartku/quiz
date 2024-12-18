import React from 'react';
import { Question as QuestionType, Answer } from '../types/quiz.types';

interface QuestionProps {
  question: QuestionType;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (answer: Answer) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium">
            Pytanie {currentQuestion} z {totalQuestions}
          </span>
          <div className="h-2 bg-gray-200 flex-1 mx-4 rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{
                width: `${(currentQuestion / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mb-2">{question.text}</h2>
        {question.subtext && (
          <p className="text-gray-600 italic">{question.subtext}</p>
        )}
      </div>

      <div className="space-y-4">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer)}
            className="w-full text-left p-4 rounded-lg bg-white hover:bg-gray-50 
                     border-2 border-gray-200 hover:border-primary transition-all"
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;