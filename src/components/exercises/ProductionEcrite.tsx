'use client';

import { useState, useEffect } from 'react';
import type { Exercise, ProductionEcriteExercise as ProductionExerciseType } from '@/types';
import { PenTool, AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface Props {
  exercise: Exercise;
  onAnswerChange: (answer: any) => void;
}

export default function ProductionEcriteExercise({ exercise, onAnswerChange }: Props) {
  const content = exercise.content as ProductionExerciseType;
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    
    onAnswerChange({
      text,
      wordCount: words.length,
    });
  }, [text]);

  function getWordCountColor(): string {
    if (wordCount < content.data.min_words) return 'text-red-600';
    if (wordCount > content.data.max_words) return 'text-orange-600';
    return 'text-green-600';
  }

  function getWordCountStatus(): string {
    if (wordCount === 0) return 'Почніть писати...';
    if (wordCount < content.data.min_words) {
      return `Ще ${content.data.min_words - wordCount} слів до мінімуму`;
    }
    if (wordCount > content.data.max_words) {
      return `Перевищено на ${wordCount - content.data.max_words} слів`;
    }
    return 'Відмінно! Кількість слів відповідає вимогам';
  }

  return (
    <div className="space-y-6">
      {/* Prompt Section */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <PenTool className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Завдання</h2>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-900 leading-relaxed whitespace-pre-line">
                  {content.data.prompt_uk}
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 italic leading-relaxed whitespace-pre-line">
                  {content.data.prompt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="card bg-yellow-50 border border-yellow-200">
        <div className="flex items-start gap-2 mb-3">
          <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Вимоги до тексту:</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Мінімальна кількість слів: <strong>{content.data.min_words}</strong></li>
              <li>• Максимальна кількість слів: <strong>{content.data.max_words}</strong></li>
              <li>• Використовуйте формальну мову та правильну структуру</li>
              <li>• Перевіряйте граматику та орфографію</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Evaluation Criteria */}
      <div className="card">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          Критерії оцінювання:
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {content.data.criteria.map((criterion, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-semibold text-sm text-gray-900">
                  {criterion.name_uk}
                </h4>
                <span className="text-xs font-bold text-blue-600">
                  {criterion.max_points} б.
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-1">
                {criterion.description_uk}
              </p>
              <p className="text-xs text-gray-500 italic">
                {criterion.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
          <span className="text-sm text-gray-600">Максимальний бал:</span>
          <span className="font-bold text-lg text-blue-600">
            {content.data.criteria.reduce((sum, c) => sum + c.max_points, 0)} балів
          </span>
        </div>
      </div>

      {/* Writing Area */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Ваша відповідь</h3>
          <div className={`font-mono font-bold ${getWordCountColor()}`}>
            {wordCount} / {content.data.min_words}-{content.data.max_words} слів
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Почніть писати вашу відповідь тут..."
          className="textarea-field min-h-[400px] font-sans text-base leading-relaxed"
        />

        {/* Word Count Status */}
        <div className="mt-3 flex items-center gap-2">
          {wordCount === 0 ? (
            <AlertCircle className="w-4 h-4 text-gray-400" />
          ) : wordCount < content.data.min_words ? (
            <AlertCircle className="w-4 h-4 text-red-500" />
          ) : wordCount > content.data.max_words ? (
            <AlertCircle className="w-4 h-4 text-orange-500" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          )}
          <span className={`text-sm ${getWordCountColor()}`}>
            {getWordCountStatus()}
          </span>
        </div>
      </div>

      {/* Tips */}
      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-bold text-gray-900 mb-3">💡 Поради:</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Почніть з плану: вступ, основна частина, висновок</li>
          <li>• Використовуйте різноманітні сполучники (d'abord, ensuite, enfin, cependant...)</li>
          <li>• Перевірте узгодження часів та відмінювання дієслів</li>
          <li>• Використовуйте багатий та точний словниковий запас</li>
          <li>• Перечитайте текст перед відправкою</li>
        </ul>
      </div>
    </div>
  );
}
