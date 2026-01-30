import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, skill, score, maxScore, durationSeconds } = body;

    if (!userId || !skill || score === undefined || !maxScore) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const percentage = (score / maxScore) * 100;

    // Update user_progress
    const { data: currentProgress } = await supabaseAdmin
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('skill', skill)
      .single();

    if (currentProgress) {
      const newCompletedExercises = currentProgress.completed_exercises + 1;
      const newTotalExercises = Math.max(currentProgress.total_exercises, newCompletedExercises);
      const newAverageScore =
        (currentProgress.average_score * currentProgress.completed_exercises + percentage) /
        newCompletedExercises;

      await supabaseAdmin
        .from('user_progress')
        .update({
          total_exercises: newTotalExercises,
          completed_exercises: newCompletedExercises,
          average_score: newAverageScore,
          last_practice: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .eq('skill', skill);
    }

    // Update user_stats
    const { data: currentStats } = await supabaseAdmin
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (currentStats) {
      const newTotalAttempts = currentStats.total_attempts + 1;
      const newAverageScore =
        (currentStats.average_score * currentStats.total_attempts + percentage) / newTotalAttempts;
      const newTotalTime = currentStats.total_time_minutes + Math.floor(durationSeconds / 60);

      // Calculate streak
      const lastActivity = currentStats.last_activity ? new Date(currentStats.last_activity) : null;
      const today = new Date();
      let newStreak = currentStats.streak_days;

      if (lastActivity) {
        const daysDiff = Math.floor(
          (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysDiff === 1) {
          newStreak += 1;
        } else if (daysDiff > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      await supabaseAdmin
        .from('user_stats')
        .update({
          total_attempts: newTotalAttempts,
          average_score: newAverageScore,
          total_time_minutes: newTotalTime,
          streak_days: newStreak,
          last_activity: today.toISOString(),
        })
        .eq('user_id', userId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
