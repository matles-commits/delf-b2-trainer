'use client';

import { useState, useEffect } from 'react';
import type { Exercise, ComprehensionEcriteExercise as ComprehensionExerciseType } from '@/types';
import { BookOpen, CheckCircle } from 'lucide-react';

interface Props {
  exercise: Exercise;
  onAnswerChange: (answer: any) => void;
}

export default function ComprehensionEcriteExercise({ exercise, onAnswerChange }: Props) {
  const content = exercise.content as ComprehensionExerciseType;
  const [answers, setAnswers] = useState<Record<string, any>>({});

  useEffect(() => {
    onAnswerChange(answers);
  }, [answers]);

  function handleAnswerChange(questionId: string, answer: any) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }

  function handleMultipleChoiceToggle(questionId: string, option: string, isMultiple: boolean) {
    if (isMultiple) {
      // Multiple answers allowed
      const currentAnswers = answers[questionId] || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((a: string) => a !== option)
        : [...currentAnswers, option];
      handleAnswerChange(questionId, newAnswers);
    } else {
      // Single answer
      handleAnswerChange(questionId, option);
    }
  }

  return (
    <div className="space-y-8">
      {/* Text Section */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Текст для читання</h2>
        </div>
        <div className="prose max-w-none">
          <div className="text-gray-800 leading-relaxed whitespace-pre-line text-justify">
            {content.data.text}
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Питання</h2>
        <div className="space-y-6">
          {content.data.questions.map((question, index) => (
            <div key={question.id} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-1">
                    {question.question_uk}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    {question.question}
                  </p>
                  <span className="inline-block mt-2 text-xs text-blue-600 font-medium">
                    {question.points} {question.points === 1 ? 'бал' : question.points < 5 ? 'бали' : 'балів'}
                  </span>
                </div>
              </div>

              {/* Multiple Choice */}
              {question.type === 'multiple_choice' && (
                <div className="ml-11 space-y-2">
                  {question.options?.map((option, optIndex) => {
                    const isMultiple = Array.isArray(question.correct_answer);
                    const isSelected = isMultiple
                      ? (answers[question.id] || []).includes(option)
                      : answers[question.id] === option;

                    return (
                      <label
                        key={optIndex}
                        className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type={isMultiple ? 'checkbox' : 'radio'}
                          name={question.id}
                          checked={isSelected}
                          onChange={() => handleMultipleChoiceToggle(question.id, option, isMultiple)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <p className="text-gray-900">{question.options_uk?.[optIndex]}</p>
                          <p className="text-sm text-gray-600 italic">{option}</p>
                        </div>
                      </label>
                    );
                  })}
                  {Array.isArray(question.correct_answer) && (
                    <p className="text-sm text-gray-500 italic mt-2">
                      * Можливо декілька правильних відповідей
                    </p>
                  )}
                </div>
              )}

              {/* True/False */}
              {question.type === 'true_false' && (
                <div className="ml-11 flex gap-4">
                  <label
                    className={`flex-1 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      answers[question.id] === 'Vrai'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      checked={answers[question.id] === 'Vrai'}
                      onChange={() => handleAnswerChange(question.id, 'Vrai')}
                      className="mr-2"
                    />
                    <span className="font-medium">Правда / Vrai</span>
                  </label>
                  <label
                    className={`flex-1 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      answers[question.id] === 'Faux'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      checked={answers[question.id] === 'Faux'}
                      onChange={() => handleAnswerChange(question.id, 'Faux')}
                      className="mr-2"
                    />
                    <span className="font-medium">Неправда / Faux</span>
                  </label>
                </div>
              )}

              {/* Open Question */}
              {question.type === 'open' && (
                <div className="ml-11">
                  <textarea
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    placeholder="Введіть вашу відповідь..."
                    className="textarea-field min-h-[100px]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-900">Прогрес відповідей</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(Object.keys(answers).length / content.data.questions.length) * 100}%`,
              }}
            ></div>
          </div>
          <span className="text-sm font-medium text-blue-900">
            {Object.keys(answers).length} / {content.data.questions.length}
          </span>
        </div>
      </div>
    </div>
  );
}
