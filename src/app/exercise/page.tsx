'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../lib/supabase/client';
import { ArrowLeft, BookOpen, Clock, Target } from 'lucide-react';
import type { Exercise } from '@/types';

function ExerciseListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const skill = searchParams?.get('skill') || '';
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (skill) {
      loadExercises();
    }
  }, [skill]);

  async function loadExercises() {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('skill', skill)
        .order('difficulty', { ascending: true });

      if (error) throw error;
      setExercises(data || []);
    } catch (error) {
      console.error('Error loading exercises:', error);
    } finally {
      setLoading(false);
    }
  }

  function getSkillNameUk(skill: string): string {
    const names: Record<string, string> = {
      comprehension_ecrite: 'Розуміння письмового тексту',
      production_ecrite: 'Письмова практика',
      comprehension_orale: 'Розуміння усного мовлення',
      production_orale: 'Усна практика',
    };
    return names[skill] || skill;
  }

  function getDifficultyBadge(difficulty: string) {
    const badges: Record<string, string> = {
      facile: 'badge-success',
      moyen: 'badge-warning',
      difficile: 'badge-error',
    };
    const labels: Record<string, string> = {
      facile: 'Легко',
      moyen: 'Середньо',
      difficile: 'Складно',
    };
    return (
      <span className={badges[difficulty] || 'badge'}>
        {labels[difficulty] || difficulty}
      </span>
    );
  }

  function startExercise(exerciseId: string) {
    router.push(`/exercise/${exerciseId}`);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold font-display text-gray-900">
                {getSkillNameUk(skill)}
              </h1>
              <p className="text-sm text-gray-600">
                Оберіть вправу для початку тренування
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {exercises.length === 0 ? (
          <div className="card text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Вправ ще немає
            </h3>
            <p className="text-gray-600">
              Вправи для цієї навички з'являться незабаром
            </p>
          </div>
        ) : (
          <div className="grid gap-6 max-w-4xl mx-auto">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="card-hover"
                onClick={() => startExercise(exercise.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {exercise.title_uk}
                      </h3>
                      {getDifficultyBadge(exercise.difficulty)}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {exercise.title}
                    </p>
                    <p className="text-gray-700">
                      {exercise.description_uk}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{exercise.estimated_time_minutes} хв</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>{exercise.max_score} балів</span>
                  </div>
                  {exercise.tags && exercise.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {exercise.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExercisePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ExerciseListContent />
    </Suspense>
  );
}
