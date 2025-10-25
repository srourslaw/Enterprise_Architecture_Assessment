import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { questions } from '../data/questions';
import {
  AssessmentAnswers,
  MaturitySummary,
  calculateMaturity,
  getMaturityInsights,
  MaturityInsight
} from '../utils/maturityCalculator';
import {
  GapAnalysisResult,
  detectGaps,
  getPrioritizedRecommendations,
  PrioritizedRecommendation
} from '../utils/gapDetector';
import { autoSave, loadAutoSave } from '../utils/exportUtils';

/**
 * ASSESSMENT STATE MANAGEMENT
 *
 * Centralized state management for the EA assessment process
 * Provides answers, maturity results, and gap analysis
 */

interface AssessmentContextType {
  // Assessment state
  answers: AssessmentAnswers;
  currentQuestionIndex: number;
  isComplete: boolean;

  // Computed results
  maturitySummary: MaturitySummary | null;
  gapAnalysis: GapAnalysisResult | null;
  maturityInsights: MaturityInsight[];
  recommendations: PrioritizedRecommendation[];

  // Actions
  answerQuestion: (questionId: string, answer: string) => void;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetAssessment: () => void;
  calculateResults: () => void;

  // View state
  currentView: 'questionnaire' | 'results' | 'gaps' | 'layers' | 'roadmap' | 'visual';
  setCurrentView: (view: 'questionnaire' | 'results' | 'gaps' | 'layers' | 'roadmap' | 'visual') => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<AssessmentAnswers>(() => {
    // Load auto-saved assessment on mount
    const saved = loadAutoSave();
    return saved || {};
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [maturitySummary, setMaturitySummary] = useState<MaturitySummary | null>(null);
  const [gapAnalysis, setGapAnalysis] = useState<GapAnalysisResult | null>(null);
  const [maturityInsights, setMaturityInsights] = useState<MaturityInsight[]>([]);
  const [recommendations, setRecommendations] = useState<PrioritizedRecommendation[]>([]);
  const [currentView, setCurrentView] = useState<'questionnaire' | 'results' | 'gaps' | 'layers' | 'roadmap' | 'visual'>('questionnaire');

  // Check if assessment is complete
  const isComplete = Object.keys(answers).length === questions.length;

  // Auto-save answers whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      autoSave(answers);
    }
  }, [answers]);

  // Calculate initial results if we loaded saved data
  useEffect(() => {
    if (Object.keys(answers).length > 0 && !maturitySummary) {
      const maturity = calculateMaturity(answers, questions);
      const gaps = detectGaps(answers, questions);
      const insights = getMaturityInsights(maturity);
      const recs = getPrioritizedRecommendations(gaps);

      setMaturitySummary(maturity);
      setGapAnalysis(gaps);
      setMaturityInsights(insights);
      setRecommendations(recs);
    }
  }, []);

  // Answer a question
  const answerQuestion = useCallback((questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));

    // Auto-calculate results after each answer
    const newAnswers = {
      ...answers,
      [questionId]: answer
    };
    const maturity = calculateMaturity(newAnswers, questions);
    const gaps = detectGaps(newAnswers, questions);
    const insights = getMaturityInsights(maturity);
    const recs = getPrioritizedRecommendations(gaps);

    setMaturitySummary(maturity);
    setGapAnalysis(gaps);
    setMaturityInsights(insights);
    setRecommendations(recs);
  }, [answers]);

  // Navigation
  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  // Reset assessment
  const resetAssessment = useCallback(() => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setMaturitySummary(null);
    setGapAnalysis(null);
    setMaturityInsights([]);
    setRecommendations([]);
    setCurrentView('questionnaire');
  }, []);

  // Calculate results
  const calculateResults = useCallback(() => {
    const maturity = calculateMaturity(answers, questions);
    const gaps = detectGaps(answers, questions);
    const insights = getMaturityInsights(maturity);
    const recs = getPrioritizedRecommendations(gaps);

    setMaturitySummary(maturity);
    setGapAnalysis(gaps);
    setMaturityInsights(insights);
    setRecommendations(recs);
  }, [answers]);

  const value: AssessmentContextType = {
    answers,
    currentQuestionIndex,
    isComplete,
    maturitySummary,
    gapAnalysis,
    maturityInsights,
    recommendations,
    answerQuestion,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    resetAssessment,
    calculateResults,
    currentView,
    setCurrentView
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

// Custom hook to use assessment context
export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
