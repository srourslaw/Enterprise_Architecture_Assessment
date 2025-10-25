import { Question, QuestionAnswer } from '../types';
import { eaLayers } from '../data/eaLayers';

/**
 * MATURITY CALCULATION ENGINE
 *
 * Calculates maturity scores for components and layers based on question answers
 *
 * Algorithm:
 * 1. Each question has a maturity score (1-5) per answer
 * 2. Questions are weighted (1x, 1.5x, 2x, 3x)
 * 3. Each question affects specific components
 * 4. Component maturity = weighted average of all related question scores
 * 5. Layer maturity = average of all component maturities
 *
 * Maturity Levels:
 * - 1.0-1.9: Initial (Critical attention needed)
 * - 2.0-2.9: Developing (Significant gaps)
 * - 3.0-3.9: Defined (On track)
 * - 4.0-4.9: Managed (Above average)
 * - 5.0: Optimized (Best-in-class)
 */

export interface AssessmentAnswers {
  [questionId: string]: string; // questionId → selected answer label
}

export interface ComponentMaturity {
  componentId: string;
  componentName: string;
  maturityScore: number;
  maturityLevel: 1 | 2 | 3 | 4 | 5;
  maturityLabel: string;
  contributingQuestions: number;
  color: string;
}

export interface LayerMaturity {
  layerId: number;
  layerName: string;
  maturityScore: number;
  maturityLevel: 1 | 2 | 3 | 4 | 5;
  maturityLabel: string;
  components: ComponentMaturity[];
  color: string;
}

export interface MaturitySummary {
  overallMaturityScore: number;
  overallMaturityLevel: 1 | 2 | 3 | 4 | 5;
  overallMaturityLabel: string;
  layers: LayerMaturity[];
  questionsAnswered: number;
  totalQuestions: number;
  completionPercentage: number;
}

/**
 * Get maturity level (1-5) from score
 */
export function getMaturityLevel(score: number): 1 | 2 | 3 | 4 | 5 {
  if (score >= 4.5) return 5;
  if (score >= 3.5) return 4;
  if (score >= 2.5) return 3;
  if (score >= 1.5) return 2;
  return 1;
}

/**
 * Get maturity label from score
 */
export function getMaturityLabel(score: number): string {
  const level = getMaturityLevel(score);
  switch (level) {
    case 5: return 'Optimized (Best-in-class)';
    case 4: return 'Managed (Above average)';
    case 3: return 'Defined (On track)';
    case 2: return 'Developing (Significant gaps)';
    case 1: return 'Initial (Critical attention needed)';
    default: return 'Not assessed';
  }
}

/**
 * Get maturity color from score
 */
export function getMaturityColor(score: number): string {
  const level = getMaturityLevel(score);
  switch (level) {
    case 5: return '#A7F3D0'; // ea-optimized
    case 4: return '#D1FAE5'; // ea-managed
    case 3: return '#FEF3C7'; // ea-defined
    case 2: return '#FED7AA'; // ea-developing
    case 1: return '#FEE2E2'; // ea-critical
    default: return '#E5E7EB'; // ea-base
  }
}

/**
 * Calculate maturity scores from assessment answers
 */
export function calculateMaturity(
  answers: AssessmentAnswers,
  questions: Question[]
): MaturitySummary {
  // Initialize component score accumulators
  const componentScores: {
    [componentId: string]: {
      totalWeightedScore: number;
      totalWeight: number;
      name: string;
      layerId: number;
    };
  } = {};

  // Initialize all components from eaLayers
  eaLayers.forEach(layer => {
    layer.components.forEach(component => {
      componentScores[component.id] = {
        totalWeightedScore: 0,
        totalWeight: 0,
        name: component.name,
        layerId: layer.id
      };
    });
  });

  // Process each answered question
  let questionsAnswered = 0;
  questions.forEach(question => {
    const selectedAnswer = answers[question.id];
    if (!selectedAnswer) return;

    questionsAnswered++;

    // Find the answer object
    const answerObj = question.answers.find(a => a.label === selectedAnswer);
    if (!answerObj) return;

    const score = answerObj.score;
    const weight = question.weight || 1.0;

    // Apply score to all affected components
    question.affectsComponents.forEach(componentId => {
      if (componentScores[componentId]) {
        componentScores[componentId].totalWeightedScore += score * weight;
        componentScores[componentId].totalWeight += weight;
      }
    });
  });

  // Calculate component maturity scores
  const componentMaturities: ComponentMaturity[] = Object.entries(componentScores)
    .map(([componentId, data]) => {
      const maturityScore = data.totalWeight > 0
        ? data.totalWeightedScore / data.totalWeight
        : 0;

      return {
        componentId,
        componentName: data.name,
        maturityScore: Math.round(maturityScore * 10) / 10,
        maturityLevel: maturityScore > 0 ? getMaturityLevel(maturityScore) : 1,
        maturityLabel: maturityScore > 0 ? getMaturityLabel(maturityScore) : 'Not assessed',
        contributingQuestions: data.totalWeight > 0 ? Math.round(data.totalWeight) : 0,
        color: maturityScore > 0 ? getMaturityColor(maturityScore) : '#E5E7EB'
      };
    })
    .filter(c => c.maturityScore > 0); // Only include assessed components

  // Group components by layer and calculate layer maturity
  const layerMaturities: LayerMaturity[] = eaLayers.map(layer => {
    const layerComponents = componentMaturities.filter(c =>
      componentScores[c.componentId]?.layerId === layer.id
    );

    const layerScore = layerComponents.length > 0
      ? layerComponents.reduce((sum, c) => sum + c.maturityScore, 0) / layerComponents.length
      : 0;

    return {
      layerId: layer.id,
      layerName: layer.name,
      maturityScore: Math.round(layerScore * 10) / 10,
      maturityLevel: layerScore > 0 ? getMaturityLevel(layerScore) : 1,
      maturityLabel: layerScore > 0 ? getMaturityLabel(layerScore) : 'Not assessed',
      components: layerComponents,
      color: layerScore > 0 ? getMaturityColor(layerScore) : '#E5E7EB'
    };
  }).filter(l => l.maturityScore > 0); // Only include assessed layers

  // Calculate overall maturity score
  const overallScore = layerMaturities.length > 0
    ? layerMaturities.reduce((sum, l) => sum + l.maturityScore, 0) / layerMaturities.length
    : 0;

  return {
    overallMaturityScore: Math.round(overallScore * 10) / 10,
    overallMaturityLevel: overallScore > 0 ? getMaturityLevel(overallScore) : 1,
    overallMaturityLabel: overallScore > 0 ? getMaturityLabel(overallScore) : 'Not assessed',
    layers: layerMaturities,
    questionsAnswered,
    totalQuestions: questions.length,
    completionPercentage: Math.round((questionsAnswered / questions.length) * 100)
  };
}

/**
 * Get maturity insights and recommendations
 */
export interface MaturityInsight {
  type: 'strength' | 'concern' | 'critical';
  title: string;
  description: string;
  components: string[];
}

export function getMaturityInsights(summary: MaturitySummary): MaturityInsight[] {
  const insights: MaturityInsight[] = [];

  // Identify strengths (maturity >= 4.0)
  const strengths = summary.layers.filter(l => l.maturityScore >= 4.0);
  if (strengths.length > 0) {
    insights.push({
      type: 'strength',
      title: `${strengths.length} Strong Layer${strengths.length > 1 ? 's' : ''}`,
      description: `${strengths.map(s => s.layerName).join(', ')} ${strengths.length > 1 ? 'are' : 'is'} performing well with maturity scores of 4.0+`,
      components: strengths.map(s => s.layerName)
    });
  }

  // Identify concerns (maturity 2.0-2.9)
  const concerns = summary.layers.filter(l => l.maturityScore >= 2.0 && l.maturityScore < 3.0);
  if (concerns.length > 0) {
    insights.push({
      type: 'concern',
      title: `${concerns.length} Layer${concerns.length > 1 ? 's' : ''} Need${concerns.length === 1 ? 's' : ''} Improvement`,
      description: `${concerns.map(c => c.layerName).join(', ')} ${concerns.length > 1 ? 'have' : 'has'} significant gaps that should be addressed`,
      components: concerns.map(c => c.layerName)
    });
  }

  // Identify critical issues (maturity < 2.0)
  const critical = summary.layers.filter(l => l.maturityScore < 2.0);
  if (critical.length > 0) {
    insights.push({
      type: 'critical',
      title: `${critical.length} Critical Layer${critical.length > 1 ? 's' : ''}`,
      description: `${critical.map(c => c.layerName).join(', ')} ${critical.length > 1 ? 'require' : 'requires'} immediate attention with maturity below 2.0`,
      components: critical.map(c => c.layerName)
    });
  }

  // Check completion
  if (summary.completionPercentage < 100) {
    insights.push({
      type: 'concern',
      title: 'Assessment Incomplete',
      description: `Only ${summary.completionPercentage}% of questions answered. Complete the assessment for accurate maturity scoring.`,
      components: []
    });
  }

  return insights;
}

/**
 * Compare maturity scores (for before/after analysis)
 */
export interface MaturityComparison {
  layerName: string;
  beforeScore: number;
  afterScore: number;
  improvement: number;
  percentageChange: number;
}

export function compareMaturity(
  before: MaturitySummary,
  after: MaturitySummary
): MaturityComparison[] {
  return before.layers.map(beforeLayer => {
    const afterLayer = after.layers.find(l => l.layerId === beforeLayer.layerId);
    const afterScore = afterLayer?.maturityScore || beforeLayer.maturityScore;
    const improvement = afterScore - beforeLayer.maturityScore;
    const percentageChange = (improvement / beforeLayer.maturityScore) * 100;

    return {
      layerName: beforeLayer.layerName,
      beforeScore: beforeLayer.maturityScore,
      afterScore,
      improvement: Math.round(improvement * 10) / 10,
      percentageChange: Math.round(percentageChange)
    };
  });
}
