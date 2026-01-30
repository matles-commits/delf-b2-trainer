'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase/client';
import {
  BookOpen,
  PenTool,
  Mic,
  FileText,
  TrendingUp,
  Award,
  Target,
  Calendar,
  LogOut,
  BarChart3,
  Clock,
} from 'lucide-react';
import type { User, UserStats, UserProgress, Recommendation } from '@/types';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/');
        return;
      }

      // Load user data
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      // Load stats
      const { data: statsData } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      // Load progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', session.user.id)
        .order('skill');

      setUser(userData);
      setStats(statsData);
      setProgress(progressData || []);

      // Generate recommendations based on progress
      if (progressData && progressData.length > 0) {
        generateRecommendations(progressData);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  }

  function generateRecommendations(progressData: UserProgress[]) {
    const recs: Recommendation[] = [];

    progressData.forEach((p) => {
      const completionRate = p.total_exercises > 0 ? p.completed_exercises / p.total_exercises : 0;
      
      if (completionRate < 0.3) {
        recs.push({
          skill: p.skill,
          priority: 'high',
          message: `Commencez à pratiquer la ${getSkillName(p.skill)}`,
          message_uk: `Почніть практикувати ${getSkillNameUk(p.skill)}`,
        });
      } else if (p.average_score < 50) {
        recs.push({
          skill: p.skill,
          priority: 'high',
          message: `Améliorez vos compétences en ${getSkillName(p.skill)}`,
          message_uk: `Покращте свої навички з ${getSkillNameUk(p.skill)}`,
        });
      } else if (p.average_score < 70) {
        recs.push({
          skill: p.skill,
          priority: 'medium',
          message: `Continuez à pratiquer la ${getSkillName(p.skill)}`,
          message_uk: `Продовжуйте практикувати ${getSkillNameUk(p.skill)}`,
        });
      }
    });

    setRecommendations(recs);
  }

  function getSkillName(skill: string): string {
    const names: Record<string, string> = {
      comprehension_ecrite: 'compréhension écrite',
      production_ecrite: 'production écrite',
      comprehension_orale: 'compréhension orale',
      production_orale: 'production orale',
    };
    return names[skill] || skill;
  }

  function getSkillNameUk(skill: string): string {
    const names: Record<string, string> = {
      comprehension_ecrite: 'розуміння письмового тексту',
      production_ecrite: 'письмова практика',
      comprehension_orale: 'розуміння усного мовлення',
      production_orale: 'усна практика',
    };
    return names[skill] || skill;
  }

  function getSkillIcon(skill: string) {
    const icons: Record<string, any> = {
      comprehension_ecrite: BookOpen,
      production_ecrite: PenTool,
      comprehension_orale: Mic,
      production_orale: FileText,
    };
    const Icon = icons[skill] || BookOpen;
    return <Icon className="w-6 h-6" />;
  }

  function getSkillColor(skill: string): string {
    const colors: Record<string, string> = {
      comprehension_ecrite: 'blue',
      production_ecrite: 'green',
      comprehension_orale: 'purple',
      production_orale: 'orange',
    };
    return colors[skill] || 'gray';
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');
  }

  function navigateToSkill(skill: string) {
    router.push(`/exercise?skill=${skill}`);
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
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold font-display text-gray-900">DELF B2 Trainer</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Вітаємо,</p>
                <p className="font-semibold text-gray-900">{user?.full_name || user?.email}</p>
              </div>
              {user?.avatar_url && (
                <img
                  src={user.avatar_url}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <button
                onClick={handleSignOut}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Вийти"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Всього спроб</span>
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats?.total_attempts || 0}</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Середній бал</span>
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {stats?.average_score ? `${stats.average_score.toFixed(1)}%` : '0%'}
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Час практики</span>
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {stats?.total_time_minutes || 0} хв
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Серія днів</span>
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats?.streak_days || 0}</p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold font-display mb-6 text-gray-900">Навички</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {progress.map((p) => {
              const color = getSkillColor(p.skill);
              const completionRate = p.total_exercises > 0 
                ? (p.completed_exercises / p.total_exercises) * 100 
                : 0;

              return (
                <div
                  key={p.skill}
                  onClick={() => navigateToSkill(p.skill)}
                  className="card-hover"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 bg-${color}-100 rounded-xl`}>
                        {getSkillIcon(p.skill)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {getSkillNameUk(p.skill)}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {p.completed_exercises} / {p.total_exercises || 0} вправ
                        </p>
                      </div>
                    </div>
                    <span className={`badge-${p.average_score >= 70 ? 'success' : p.average_score >= 50 ? 'warning' : 'error'}`}>
                      {p.average_score.toFixed(0)}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`bg-${color}-600 h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>

                  <p className="text-xs text-gray-500">
                    Остання практика: {p.last_practice ? new Date(p.last_practice).toLocaleDateString('uk-UA') : 'Ніколи'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Рекомендації</h2>
            </div>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.priority === 'high'
                      ? 'bg-red-50 border-red-500'
                      : rec.priority === 'medium'
                      ? 'bg-yellow-50 border-yellow-500'
                      : 'bg-blue-50 border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{rec.message_uk}</p>
                      <p className="text-sm text-gray-600 mt-1">{rec.message}</p>
                    </div>
                    <button
                      onClick={() => navigateToSkill(rec.skill)}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Почати
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Start */}
        <div className="card mt-8">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Швидкий старт</h2>
          <p className="text-gray-600 mb-4">
            Оберіть навичку для практики та почніть тренування:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['comprehension_ecrite', 'production_ecrite', 'comprehension_orale', 'production_orale'].map((skill) => (
              <button
                key={skill}
                onClick={() => navigateToSkill(skill)}
                className={`p-4 rounded-xl border-2 hover:border-${getSkillColor(skill)}-500 hover:bg-${getSkillColor(skill)}-50 transition-all duration-200 ${
                  skill === 'comprehension_orale' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={skill === 'comprehension_orale'}
              >
                <div className={`w-12 h-12 bg-${getSkillColor(skill)}-100 rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  {getSkillIcon(skill)}
                </div>
                <p className="text-sm font-medium text-gray-900 text-center">
                  {getSkillNameUk(skill)}
                </p>
                {skill === 'comprehension_orale' && (
                  <span className="text-xs text-gray-500 mt-1 block">Скоро</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
