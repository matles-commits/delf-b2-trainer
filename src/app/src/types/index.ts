// Database types
export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  skill: SkillType;
  total_exercises: number;
  completed_exercises: number;
  average_score: number;
  last_practice: string;
  created_at: string;
  updated_at: string;
}

export interface ExerciseAttempt {
  id: string;
  user_id: string;
  exercise_id: string;
  skill: SkillType;
  user_answer: any;
  score: number;
  max_score: number;
  feedback: string;
  corrections: any;
  duration_seconds: number;
  completed_at: string;
  created_at: string;
}

export interface UserStats {
  user_id: string;
  total_time_minutes: number;
  total_attempts: number;
  average_score: number;
  strongest_skill: SkillType | null;
  weakest_skill: SkillType | null;
  streak_days: number;
  last_activity: string;
  created_at: string;
  updated_at: string;
}

// Exercise types
export type SkillType = 
  | 'comprehension_ecrite' 
  | 'production_ecrite' 
  | 'comprehension_orale' 
  | 'production_orale';

export type DifficultyLevel = 'facile' | 'moyen' | 'difficile';

export interface Exercise {
  id: string;
  skill: SkillType;
  level: 'B2';
  difficulty: DifficultyLevel;
  title: string;
  title_uk: string;
  description: string;
  description_uk: string;
  content: ExerciseContent;
  max_score: number;
  estimated_time_minutes: number;
  tags: string[];
  created_at: string;
}

export interface ExerciseContent {
  type: string;
  data: any;
}

// Comprehension Ecrite
export interface ComprehensionEcriteExercise extends ExerciseContent {
  type: 'comprehension_ecrite';
  data: {
    text: string;
    questions: ComprehensionQuestion[];
  };
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  question_uk: string;
  type: 'multiple_choice' | 'true_false' | 'open';
  options?: string[];
  options_uk?: string[];
  correct_answer: string | string[];
  points: number;
  explanation?: string;
  explanation_uk?: string;
}

// Production Ecrite
export interface ProductionEcriteExercise extends ExerciseContent {
  type: 'production_ecrite';
  data: {
    prompt: string;
    prompt_uk: string;
    min_words: number;
    max_words: number;
    criteria: EvaluationCriteria[];
  };
}

export interface EvaluationCriteria {
  name: string;
  name_uk: string;
  description: string;
  description_uk: string;
  max_points: number;
}

// Production Orale
export interface ProductionOraleExercise extends ExerciseContent {
  type: 'production_orale';
  data: {
    scenario: string;
    scenario_uk: string;
    role: string;
    role_uk: string;
    duration_minutes: number;
    preparation_minutes: number;
    key_points: string[];
    key_points_uk: string[];
  };
}

// Evaluation and Feedback
export interface EvaluationResult {
  score: number;
  max_score: number;
  percentage: number;
  feedback: string;
  feedback_uk: string;
  corrections: Correction[];
  strengths: string[];
  strengths_uk: string[];
  weaknesses: string[];
  weaknesses_uk: string[];
  recommendations: string[];
  recommendations_uk: string[];
}

export interface Correction {
  type: 'grammar' | 'vocabulary' | 'structure' | 'content' | 'spelling';
  original: string;
  correction: string;
  explanation: string;
  explanation_uk: string;
  severity: 'minor' | 'moderate' | 'major';
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Dashboard types
export interface DashboardData {
  user: User;
  stats: UserStats;
  progress: UserProgress[];
  recentAttempts: ExerciseAttempt[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  skill: SkillType;
  priority: 'high' | 'medium' | 'low';
  message: string;
  message_uk: string;
  exerciseId?: string;
}
