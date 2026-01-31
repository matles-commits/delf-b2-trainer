import { NextRequest, NextResponse } from 'next/server';
import { evaluateWriting, evaluateComprehension } from '../lib/gemini/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { exerciseId, exerciseType, userAnswer, exerciseContent } = body;

    if (!exerciseId || !exerciseType || !userAnswer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let evaluation;

    // Evaluate based on exercise type
    if (exerciseType === 'production_ecrite') {
      evaluation = await evaluateWriting({
        exerciseType: 'production_ecrite',
        userAnswer: userAnswer.text,
        criteria: exerciseContent.data.criteria,
      });
    } else if (exerciseType === 'comprehension_ecrite') {
      evaluation = await evaluateComprehension({
        exerciseType: 'comprehension_ecrite',
        userAnswer,
        exerciseContent,
        correctAnswer: exerciseContent.data.questions.reduce((acc: any, q: any) => {
          acc[q.id] = q.correct_answer;
          return acc;
        }, {}),
      });
    } else if (exerciseType === 'production_orale') {
      // For production orale, provide general feedback based on notes
      evaluation = {
        score: 20, // Placeholder score
        max_score: 25,
        feedback: 'Votre présentation orale a été enregistrée.',
        feedback_uk: 'Вашу усну презентацію зафіксовано.',
        corrections: [],
        strengths: ['Bon usage du temps de préparation'],
        strengths_uk: ['Хороше використання часу підготовки'],
        weaknesses: ['Nécessite une pratique avec un partenaire'],
        weaknesses_uk: ['Потребує практики з партнером'],
        recommendations: ['Pratiquez à voix haute'],
        recommendations_uk: ['Практикуйте вголос'],
      };
    } else {
      return NextResponse.json(
        { error: 'Unsupported exercise type' },
        { status: 400 }
      );
    }

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error('Error evaluating exercise:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate exercise' },
      { status: 500 }
    );
  }
}
