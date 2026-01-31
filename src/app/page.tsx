'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { BookOpen, PenTool, Mic, FileText, ArrowRight, CheckCircle, Star, Users } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.push('/dashboard');
    } else {
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Error signing in:', error);
      alert('Помилка входу. Спробуйте ще раз.');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        
        <nav className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold font-display text-gray-900">DELF B2 Trainer</span>
            </div>
            <button
              onClick={signInWithGoogle}
              className="btn-primary flex items-center gap-2"
            >
              Увійти через Google
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold font-display mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Підготуйтесь до DELF B2
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Комплексна платформа для тренування всіх навичок з детальними поясненнями українською мовою
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button onClick={signInWithGoogle} className="btn-primary text-lg px-8 py-4">
                Почати безкоштовно
              </button>
              <a href="#features" className="btn-outline text-lg px-8 py-4">
                Дізнатись більше
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  <span className="text-3xl font-bold text-gray-900">1000+</span>
                </div>
                <p className="text-gray-600">Активних учнів</p>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <span className="text-3xl font-bold text-gray-900">50+</span>
                </div>
                <p className="text-gray-600">Вправ для практики</p>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <span className="text-3xl font-bold text-gray-900">4.9/5</span>
                </div>
                <p className="text-gray-600">Середня оцінка</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-gray-900">
              Всі 4 навички DELF B2
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Тренуйте кожну компетенцію окремо з реалістичними вправами та миттєвим зворотнім зв'язком
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card-hover animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Compréhension Écrite</h3>
                  <p className="text-gray-600 mb-4">
                    Читайте автентичні тексти та відповідайте на питання різних типів
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Тексти рівня B2
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Різні типи питань
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Детальні пояснення
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-hover animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <PenTool className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Production Écrite</h3>
                  <p className="text-gray-600 mb-4">
                    Пишіть листи, есе та аргументативні тексти з оцінкою ШІ
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Оцінка через Claude AI
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Виправлення помилок
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Рекомендації для покращення
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-hover opacity-75 relative overflow-hidden" style={{ animationDelay: '0.3s' }}>
              <div className="absolute top-4 right-4">
                <span className="badge-warning">Скоро</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Mic className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Compréhension Orale</h3>
                  <p className="text-gray-600 mb-4">
                    Слухайте діалоги та монологи, розвивайте навички розуміння на слух
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Автентичні аудіо
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Різні акценти
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Контроль швидкості
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-hover animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Production Orale</h3>
                  <p className="text-gray-600 mb-4">
                    Практикуйте монологи та діалоги за реалістичними сценаріями
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Сценарії реальних ситуацій
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Ключові пункти
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Час на підготовку
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-gray-900">
              Чому обрати нашу платформу?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Персоналізоване навчання</h3>
              <p className="text-gray-600">
                Система відстежує ваш прогрес та пропонує вправи, які вам найбільше потрібні
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Миттєвий зворотній зв'язок</h3>
              <p className="text-gray-600">
                Отримуйте детальні коментарі та виправлення одразу після виконання вправи
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Українською мовою</h3>
              <p className="text-gray-600">
                Всі пояснення та інструкції доступні українською для кращого розуміння
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Готові почати?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Приєднуйтесь до тисяч студентів, які вже готуються до DELF B2 з нашою платформою
          </p>
          <button onClick={signInWithGoogle} className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            Розпочати безкоштовно
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold text-white">DELF B2 Trainer</span>
            </div>
            <p className="text-sm">
              © 2025 DELF B2 Trainer. Всі права захищені.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
