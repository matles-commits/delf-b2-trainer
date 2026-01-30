'use client';

import { useState, useEffect } from 'react';
import type { Exercise, ProductionOraleExercise as ProductionOraleType } from '@/types';
import { Mic, Clock, CheckSquare, AlertCircle } from 'lucide-react';

interface Props {
  exercise: Exercise;
  onAnswerChange: (answer: any) => void;
}

export default function ProductionOraleExercise({ exercise, onAnswerChange }: Props) {
  const content = exercise.content as ProductionOraleType;
  const [preparationTime, setPreparationTime] = useState(content.data.preparation_minutes * 60);
  const [isPreparationStarted, setIsPreparationStarted] = useState(false);
  const [preparationNotes, setPreparationNotes] = useState('');
  const [isPreparationComplete, setIsPreparationComplete] = useState(false);
  const [presentationNotes, setPresentationNotes] = useState('');
  const [checkedPoints, setCheckedPoints] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isPreparationStarted && preparationTime > 0) {
      const timer = setInterval(() => {
        setPreparationTime((prev) => {
          if (prev <= 1) {
            setIsPreparationComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPreparationStarted, preparationTime]);

  useEffect(() => {
    onAnswerChange({
      preparationNotes,
      presentationNotes,
      checkedPoints: Array.from(checkedPoints),
      preparationComplete: isPreparationComplete,
    });
  }, [preparationNotes, presentationNotes, checkedPoints, isPreparationComplete]);

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  function toggleKeyPoint(index: number) {
    setCheckedPoints((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }

  return (
    <div className="space-y-6">
      {/* Scenario Section */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Mic className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Сценарій</h2>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-900 leading-relaxed">
                  {content.data.scenario_uk}
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  {content.data.scenario}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-1">Ваша роль:</h3>
            <p className="text-gray-700">{content.data.role_uk}</p>
            <p className="text-sm text-gray-600 italic mt-1">{content.data.role}</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-1">Тривалість:</h3>
            <p className="text-2xl font-bold text-purple-600">
              {content.data.duration_minutes} хвилин
            </p>
          </div>
        </div>
      </div>

      {/* Key Points */}
      <div className="card">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-green-600" />
          Ключові пункти для обговорення:
        </h3>
        <div className="space-y-3">
          {content.data.key_points_uk.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={checkedPoints.has(index)}
                onChange={() => toggleKeyPoint(index)}
                className="mt-1 w-5 h-5 text-blue-600 rounded"
              />
              <div className="flex-1">
                <p className="text-gray-900">{point}</p>
                <p className="text-sm text-gray-600 italic">{content.data.key_points[index]}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(checkedPoints.size / content.data.key_points_uk.length) * 100}%`,
                }}
              ></div>
            </div>
            <span className="font-medium text-gray-700">
              {checkedPoints.size} / {content.data.key_points_uk.length}
            </span>
          </div>
        </div>
      </div>

      {/* Preparation Timer */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-gray-900">Час на підготовку</h3>
          </div>
          {!isPreparationStarted ? (
            <button
              onClick={() => setIsPreparationStarted(true)}
              className="btn-primary"
            >
              Почати підготовку
            </button>
          ) : (
            <div className="text-3xl font-mono font-bold text-blue-600">
              {formatTime(preparationTime)}
            </div>
          )}
        </div>

        {isPreparationStarted && (
          <>
            <div className="mb-4">
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                  style={{
                    width: `${((content.data.preparation_minutes * 60 - preparationTime) / (content.data.preparation_minutes * 60)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {isPreparationComplete && (
              <div className="p-3 bg-green-100 border border-green-300 rounded-lg flex items-center gap-2 text-green-800 mb-4">
                <CheckSquare className="w-5 h-5" />
                <span className="font-medium">Час підготовки закінчився! Ви готові до презентації.</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Нотатки для підготовки:
              </label>
              <textarea
                value={preparationNotes}
                onChange={(e) => setPreparationNotes(e.target.value)}
                placeholder="Запишіть ваші ідеї, структуру промови, ключові слова..."
                className="textarea-field min-h-[150px]"
              />
            </div>
          </>
        )}
      </div>

      {/* Presentation Notes */}
      {isPreparationStarted && (
        <div className="card">
          <h3 className="font-bold text-gray-900 mb-4">Нотатки під час презентації:</h3>
          <p className="text-sm text-gray-600 mb-3">
            Після завершення вашої усної презентації, запишіть тут основні пункти, які ви охопили, 
            для подальшого аналізу.
          </p>
          <textarea
            value={presentationNotes}
            onChange={(e) => setPresentationNotes(e.target.value)}
            placeholder="Опишіть, що ви сказали, які аргументи використали..."
            className="textarea-field min-h-[200px]"
          />
        </div>
      )}

      {/* Tips */}
      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-bold text-gray-900 mb-3">💡 Поради для усної презентації:</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Структуруйте вашу промову: вступ, розвиток, висновок</li>
          <li>• Використовуйте сполучники для зв'язку ідей (d'abord, ensuite, par ailleurs, enfin...)</li>
          <li>• Говоріть чітко та не поспішайте</li>
          <li>• Використовуйте різноманітну лексику та складні структури</li>
          <li>• Виражайте вашу думку та аргументуйте її</li>
          <li>• Тренуйтесь вимовляти промову вголос під час підготовки</li>
        </ul>
      </div>

      {/* Warning */}
      {!isPreparationStarted && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Важливо:</p>
              <p>
                Це симуляція усної вправи. На реальному іспиті ви будете говорити перед екзаменатором. 
                Використовуйте цей час для підготовки та практики вашої промови вголос. 
                Після відправки ви отримаєте рекомендації щодо покращення.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
