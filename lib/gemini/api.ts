import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface TranslationRequest {
  text: string;
  from: 'fr';
  to: 'uk';
  context?: string;
}

export interface EvaluationRequest {
  exerciseType: string;
  userAnswer: string;
  correctAnswer?: string;
  criteria?: any[];
  exerciseContent?: any;
}

export async function translateText(request: TranslationRequest): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Translate the following French text to Ukrainian. ${request.context ? `Context: ${request.context}` : ''}

Text to translate:
${request.text}

Provide only the Ukrainian translation without any explanations.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function evaluateWriting(request: EvaluationRequest): Promise<any> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `You are a French language examiner for the DELF B2 exam. Evaluate the following written production.

Exercise type: ${request.exerciseType}
${request.criteria ? `Evaluation criteria: ${JSON.stringify(request.criteria)}` : ''}

Student's answer:
${request.userAnswer}

Provide a detailed evaluation in JSON format with:
1. score (out of ${request.criteria?.reduce((sum, c) => sum + c.max_points, 0) || 25})
2. feedback in French
3. feedback_uk in Ukrainian
4. corrections array with: {type, original, correction, explanation, explanation_uk, severity}
5. strengths array (in French)
6. strengths_uk array (in Ukrainian)
7. weaknesses array (in French)
8. weaknesses_uk array (in Ukrainian)
9. recommendations array (in French)
10. recommendations_uk array (in Ukrainian)

Focus on: grammar, vocabulary richness, text structure, coherence, and task completion.
Provide constructive and encouraging feedback.

IMPORTANT: Return ONLY valid JSON, no markdown formatting, no backticks.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Clean up response - remove markdown if present
  let cleanText = text.trim();
  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/```\n?/g, '');
  }

  try {
    return JSON.parse(cleanText);
  } catch (error) {
    // If JSON parsing fails, try to extract JSON from text
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Could not parse JSON from Gemini response');
  }
}

export async function evaluateComprehension(request: EvaluationRequest): Promise<any> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `You are a French language examiner for the DELF B2 exam. Evaluate the following comprehension exercise answers.

Exercise content: ${JSON.stringify(request.exerciseContent)}
Student's answers: ${JSON.stringify(request.userAnswer)}
Correct answers: ${JSON.stringify(request.correctAnswer)}

Provide a detailed evaluation in JSON format with:
1. score (total points earned)
2. max_score (maximum possible points)
3. feedback in French
4. feedback_uk in Ukrainian
5. detailed_results array with per-question analysis
6. strengths array (in French)
7. strengths_uk array (in Ukrainian)
8. weaknesses array (in French)
9. weaknesses_uk array (in Ukrainian)
10. recommendations array (in French)
11. recommendations_uk array (in Ukrainian)

Be precise and constructive in your feedback.

IMPORTANT: Return ONLY valid JSON, no markdown formatting, no backticks.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Clean up response
  let cleanText = text.trim();
  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/```\n?/g, '');
  }

  try {
    return JSON.parse(cleanText);
  } catch (error) {
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Could not parse JSON from Gemini response');
  }
}

export async function generateRecommendations(userStats: any, progressData: any): Promise<any> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Based on the following user statistics and progress data for a DELF B2 student, generate personalized recommendations.

User Statistics:
${JSON.stringify(userStats)}

Progress Data:
${JSON.stringify(progressData)}

Provide recommendations in JSON format with:
1. recommendations array containing objects with:
   - skill (comprehension_ecrite, production_ecrite, etc.)
   - priority (high, medium, low)
   - message (in French)
   - message_uk (in Ukrainian)
   - specific_exercise_type (optional)

Focus on areas that need improvement while being encouraging.

IMPORTANT: Return ONLY valid JSON, no markdown formatting, no backticks.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Clean up response
  let cleanText = text.trim();
  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/```\n?/g, '');
  }

  try {
    return JSON.parse(cleanText);
  } catch (error) {
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Could not parse JSON from Gemini response');
  }
}
