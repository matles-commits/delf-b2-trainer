'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { ArrowLeft, Clock, Send, AlertCircle } from 'lucide-react';
import ComprehensionEcriteExercise from '@/components/exercises/ComprehensionEcrite';
import ProductionEcriteExercise from '@/components/exercises/ProductionEcrite';
import ProductionOraleExercise from '@/components/exercises/ProductionOrale';
import type { Exercise } from '@/types';

export default function ExerciseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const exerciseId = params?.id as string;

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (exerciseId) {
      loadExercise();
    }
  }, [exerciseId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  async function loadExercise() {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('id', exerciseId)
        .single();

      if (error) throw error;
      setExercise(data);
    } catch (error) {
      console.error('Error loading exercise:', error);
      setError('Не вдалося завантажити вправу');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    if (!exercise || !userAnswer) {
      setError('Будь ласка, дайте відповідь перед відправкою');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/');
        return;
      }

      // Submit to API for evaluation
      const response = await fetch('/api/exercises/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseId: exercise.id,
          exerciseType: exercise.skill,
          userAnswer,
          exerciseContent: exercise.content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate exercise');
      }

      const result = await response.json();

      // Save attempt
      const durationSeconds = Math.floor((Date.now() - startTime) / 1000);
      
      const { error: insertError } = await supabase
        .from('exercise_attempts')
        .insert({
          user_id: session.user.id,
          exercise_id: exercise.id,
          skill: exercise.skill,
          user_answer: userAnswer,
          score: result.score,
          max_score: exercise.max_score,
          feedback: result.feedback_uk,
          corrections: result.corrections || [],
          duration_seconds: durationSeconds,
        });

      if (insertError) throw insertError;

      // Update user progress
      await fetch('/api/progress/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          skill: exercise.skill,
          score: result.score,
          maxScore: exercise.max_score,
          durationSeconds,
        }),
      });

      // Navigate to results
      router.push(`/exercise/${exercise.id}/results?attemptScore=${result.score}`);
    } catch (error) {
      console.error('Error submitting exercise:', error);
      setError('Помилка при відправці. Спробуйте ще раз.');
    } finally {
      setSubmitting(false);
    }
  }

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Вправу не знайдено
          </h2>
          <button onClick={() => router.push('/dashboard')} className="btn-primary mt-4">
            Повернутись на головну
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {exercise.title_uk}
                </h1>
                <p className="text-sm text-gray-600">
                  {exercise.description_uk}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="font-mono font-semibold">
                  {formatTime(timeElapsed)}
                </span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={submitting || !userAnswer}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Перевірка...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Відправити
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          {exercise.skill === 'comprehension_ecrite' && (
            <ComprehensionEcriteExercise
              exercise={exercise}
              onAnswerChange={setUserAnswer}
            />
          )}

          {exercise.skill === 'production_ecrite' && (
            <ProductionEcriteExercise
              exercise={exercise}
              onAnswerChange={setUserAnswer}
            />
          )}

          {exercise.skill === 'production_orale' && (
            <ProductionOraleExercise
              exercise={exercise}
              onAnswerChange={setUserAnswer}
            />
          )}

          {!['comprehension_ecrite', 'production_ecrite', 'production_orale'].includes(exercise.skill) && (
            <div className="card text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Тип вправи не підтримується
              </h3>
              <p className="text-gray-600">
                Ця вправа ще не реалізована
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
