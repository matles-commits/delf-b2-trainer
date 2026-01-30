'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import {
  ArrowLeft,
  Award,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Home,
  RefreshCw,
  Target,
} from 'lucide-react';
import type { ExerciseAttempt, Exercise } from '@/types';

function ResultsContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const exerciseId = params?.id as string;

  const [attempt, setAttempt] = useState<ExerciseAttempt | null>(null);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, [exerciseId]);

  async function loadResults() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/');
        return;
      }

      // Load exercise
      const { data: exerciseData } = await supabase
        .from('exercises')
        .select('*')
        .eq('id', exerciseId)
        .single();

      // Load most recent attempt
      const { data: attemptData } = await supabase
        .from('exercise_attempts')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('exercise_id', exerciseId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      setExercise(exerciseData);
      setAttempt(attemptData);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  }

  function getScoreColor(percentage: number): string {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  }

  function getScoreBadge(percentage: number): string {
    if (percentage >= 80) return 'badge-success';
    if (percentage >= 60) return 'badge-info';
    if (percentage >= 40) return 'badge-warning';
    return 'badge-error';
  }

  function getGrade(percentage: number): string {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 80) return 'Très bien';
    if (percentage >= 70) return 'Bien';
    if (percentage >= 60) return 'Assez bien';
    if (percentage >= 50) return 'Passable';
    return 'Insuffisant';
  }

  function getSeverityIcon(severity: string) {
    switch (severity) {
      case 'major':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'moderate':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'minor':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!attempt || !exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Результати не знайдено</h2>
          <button onClick={() => router.push('/dashboard')} className="btn-primary mt-4">
            Повернутись на головну
          </button>
        </div>
      </div>
    );
  }

  const percentage = (attempt.score / attempt.max_score) * 100;
  const corrections = attempt.corrections as any[] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Результати вправи</h1>
                <p className="text-sm text-gray-600">{exercise.title_uk}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/exercise/${exerciseId}`)}
                className="btn-outline flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Спробувати знову
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="btn-primary flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                На головну
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Score Overview */}
        <div className="card mb-8 text-center">
          <div className="mb-4">
            <Award className="w-20 h-20 mx-auto text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Ваш результат</h2>
          </div>

          <div className={`text-6xl font-bold mb-4 ${getScoreColor(percentage)}`}>
            {percentage.toFixed(1)}%
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-2xl text-gray-600">
              {attempt.score} / {attempt.max_score}
            </span>
            <span className={getScoreBadge(percentage)}>
              {getGrade(percentage)}
            </span>
          </div>

          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-1000 ${
                percentage >= 80
                  ? 'bg-green-600'
                  : percentage >= 60
                  ? 'bg-blue-600'
                  : percentage >= 40
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Feedback */}
        {attempt.feedback && (
          <div className="card mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Зворотний зв'язок
            </h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {attempt.feedback}
              </p>
            </div>
          </div>
        )}

        {/* Corrections */}
        {corrections.length > 0 && (
          <div className="card mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Виправлення</h3>
            <div className="space-y-4">
              {corrections.map((correction, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                >
                  <div className="flex items-start gap-3 mb-2">
                    {getSeverityIcon(correction.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900 capitalize">
                          {correction.type}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            correction.severity === 'major'
                              ? 'bg-red-100 text-red-700'
                              : correction.severity === 'moderate'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {correction.severity}
                        </span>
                      </div>

                      {correction.original && (
                        <div className="mb-2">
                          <span className="text-sm text-gray-600">Оригінал: </span>
                          <span className="text-sm text-red-600 line-through">
                            {correction.original}
                          </span>
                        </div>
                      )}

                      {correction.correction && (
                        <div className="mb-2">
                          <span className="text-sm text-gray-600">Виправлення: </span>
                          <span className="text-sm text-green-600 font-medium">
                            {correction.correction}
                          </span>
                        </div>
                      )}

                      {correction.explanation_uk && (
                        <p className="text-sm text-gray-700 mt-2">
                          {correction.explanation_uk}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push(`/exercise?skill=${exercise.skill}`)}>
            <Target className="w-12 h-12 text-blue-600 mb-3" />
            <h3 className="font-bold text-lg mb-2 text-gray-900">Більше вправ</h3>
            <p className="text-gray-600 text-sm">
              Продовжуйте практикувати цю навичку з іншими вправами
            </p>
          </div>

          <div className="card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/dashboard')}>
            <TrendingUp className="w-12 h-12 text-green-600 mb-3" />
            <h3 className="font-bold text-lg mb-2 text-gray-900">Переглянути прогрес</h3>
            <p className="text-gray-600 text-sm">
              Дивіться вашу загальну статистику та рекомендації
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
