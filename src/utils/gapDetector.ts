import { Question, Gap } from '../types';
import { gapRules, getGapById } from '../data/gapRules';
import { AssessmentAnswers } from './maturityCalculator';

/**
 * GAP DETECTION ENGINE
 *
 * Detects gaps based on assessment answers and calculates priorities
 *
 * Process:
 * 1. Scan all answered questions for gap triggers
 * 2. Look up gap details from gapRules
 * 3. Calculate priority score: (Risk × Impact) / Cost
 * 4. Assign priority band: Critical, High, Medium, Low
 * 5. Sort by priority score descending
 */

export interface DetectedGap extends Gap {
  triggeredBy: string[]; // Question IDs that triggered this gap
  detectionConfidence: 'High' | 'Medium' | 'Low';
}

export interface GapAnalysisResult {
  totalGaps: number;
  criticalGaps: number;
  highGaps: number;
  mediumGaps: number;
  lowGaps: number;
  gaps: DetectedGap[];
  topGaps: DetectedGap[]; // Top 10 by priority
  gapsByLayer: { [layerId: number]: DetectedGap[] };
  totalEstimatedCost: string;
  totalExpectedROI: string;
}

/**
 * Detect gaps from assessment answers
 */
export function detectGaps(
  answers: AssessmentAnswers,
  questions: Question[]
): GapAnalysisResult {
  const detectedGaps = new Map<string, DetectedGap>();

  // Scan all answered questions for gap triggers
  questions.forEach(question => {
    const selectedAnswer = answers[question.id];
    if (!selectedAnswer) return;

    // Find the answer object
    const answerObj = question.answers.find(a => a.label === selectedAnswer);
    if (!answerObj || !answerObj.triggersGaps) return;

    // Process each triggered gap
    answerObj.triggersGaps.forEach(gapId => {
      const gapRule = getGapById(gapId);
      if (!gapRule) return;

      // Check if gap already detected
      if (detectedGaps.has(gapId)) {
        // Add this question as additional trigger
        const existing = detectedGaps.get(gapId)!;
        existing.triggeredBy.push(question.id);
        existing.detectionConfidence = 'High'; // Multiple triggers = high confidence
      } else {
        // Add new detected gap
        detectedGaps.set(gapId, {
          ...gapRule,
          triggeredBy: [question.id],
          detectionConfidence: 'High'
        });
      }
    });
  });

  // Convert to array and sort by priority score
  const gaps = Array.from(detectedGaps.values()).sort(
    (a, b) => b.priorityScore - a.priorityScore
  );

  // Count by priority band
  const criticalGaps = gaps.filter(g => g.priorityBand === 'Critical').length;
  const highGaps = gaps.filter(g => g.priorityBand === 'High').length;
  const mediumGaps = gaps.filter(g => g.priorityBand === 'Medium').length;
  const lowGaps = gaps.filter(g => g.priorityBand === 'Low').length;

  // Get top 10 gaps
  const topGaps = gaps.slice(0, 10);

  // Group gaps by layer
  const gapsByLayer: { [layerId: number]: DetectedGap[] } = {};
  gaps.forEach(gap => {
    if (!gapsByLayer[gap.layer]) {
      gapsByLayer[gap.layer] = [];
    }
    gapsByLayer[gap.layer].push(gap);
  });

  // Calculate total estimated cost (sum of all gap remediation costs)
  const totalCost = estimateTotalCost(gaps);
  const totalROI = estimateTotalROI(gaps);

  return {
    totalGaps: gaps.length,
    criticalGaps,
    highGaps,
    mediumGaps,
    lowGaps,
    gaps,
    topGaps,
    gapsByLayer,
    totalEstimatedCost: totalCost,
    totalExpectedROI: totalROI
  };
}

/**
 * Estimate total remediation cost
 */
function estimateTotalCost(gaps: DetectedGap[]): string {
  // Map remediation cost to dollar ranges (medium company size)
  const costMap: { [key: number]: number } = {
    1: 100000,    // $100K
    2: 300000,    // $300K
    3: 800000,    // $800K
    4: 2000000,   // $2M
    5: 5000000    // $5M
  };

  const total = gaps.reduce((sum, gap) => {
    return sum + (costMap[gap.remediationCost] || 0);
  }, 0);

  return formatCurrency(total);
}

/**
 * Estimate total expected ROI
 */
function estimateTotalROI(gaps: DetectedGap[]): string {
  // Estimate ROI based on typical returns
  const roiMap: { [key: string]: number } = {
    'Critical': 3.5, // 350%
    'High': 3.0,     // 300%
    'Medium': 2.5,   // 250%
    'Low': 2.0       // 200%
  };

  const costMap: { [key: number]: number } = {
    1: 100000,
    2: 300000,
    3: 800000,
    4: 2000000,
    5: 5000000
  };

  const totalCost = gaps.reduce((sum, gap) => {
    return sum + (costMap[gap.remediationCost] || 0);
  }, 0);

  const totalBenefit = gaps.reduce((sum, gap) => {
    const cost = costMap[gap.remediationCost] || 0;
    const roiMultiplier = roiMap[gap.priorityBand] || 2.0;
    return sum + (cost * roiMultiplier);
  }, 0);

  return formatCurrency(totalBenefit);
}

/**
 * Format currency
 */
function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  } else {
    return `$${amount.toFixed(0)}`;
  }
}

/**
 * Get gap recommendations sorted by priority
 */
export interface PrioritizedRecommendation {
  rank: number;
  gap: DetectedGap;
  rationale: string;
  quickWins: boolean; // Can be achieved in < 6 months
}

export function getPrioritizedRecommendations(
  gapAnalysis: GapAnalysisResult
): PrioritizedRecommendation[] {
  return gapAnalysis.topGaps.map((gap, index) => {
    // Determine if this is a quick win (high impact, low cost, short timeline)
    const quickWins = gap.priorityScore >= 5 && gap.remediationCost <= 2;

    // Generate rationale
    let rationale = `Priority Score: ${gap.priorityScore.toFixed(1)} (Risk: ${gap.risk}, Impact: ${gap.businessImpact}, Cost: ${gap.remediationCost})`;

    if (gap.priorityBand === 'Critical') {
      rationale += '. Critical priority - address immediately.';
    } else if (quickWins) {
      rationale += '. Quick win - high impact, manageable cost.';
    }

    return {
      rank: index + 1,
      gap,
      rationale,
      quickWins
    };
  });
}

/**
 * Generate gap summary by layer
 */
export interface LayerGapSummary {
  layerId: number;
  layerName: string;
  totalGaps: number;
  criticalGaps: number;
  averagePriority: number;
  topGap: DetectedGap | null;
  estimatedCost: string;
}

export function getLayerGapSummary(
  gapAnalysis: GapAnalysisResult,
  layerNames: { [id: number]: string }
): LayerGapSummary[] {
  return Object.entries(gapAnalysis.gapsByLayer).map(([layerId, gaps]) => {
    const id = parseInt(layerId);
    const criticalCount = gaps.filter(g => g.priorityBand === 'Critical').length;
    const avgPriority = gaps.reduce((sum, g) => sum + g.priorityScore, 0) / gaps.length;
    const topGap = gaps.sort((a, b) => b.priorityScore - a.priorityScore)[0] || null;

    const costMap: { [key: number]: number } = {
      1: 100000,
      2: 300000,
      3: 800000,
      4: 2000000,
      5: 5000000
    };

    const totalCost = gaps.reduce((sum, gap) => {
      return sum + (costMap[gap.remediationCost] || 0);
    }, 0);

    return {
      layerId: id,
      layerName: layerNames[id] || `Layer ${id}`,
      totalGaps: gaps.length,
      criticalGaps: criticalCount,
      averagePriority: Math.round(avgPriority * 10) / 10,
      topGap,
      estimatedCost: formatCurrency(totalCost)
    };
  }).sort((a, b) => b.criticalGaps - a.criticalGaps); // Sort by critical gaps descending
}

/**
 * Filter gaps by criteria
 */
export interface GapFilter {
  priorityBands?: ('Critical' | 'High' | 'Medium' | 'Low')[];
  layers?: number[];
  maxCost?: number; // Max remediation cost (1-5)
  quickWinsOnly?: boolean;
}

export function filterGaps(
  gapAnalysis: GapAnalysisResult,
  filter: GapFilter
): DetectedGap[] {
  let filtered = gapAnalysis.gaps;

  if (filter.priorityBands && filter.priorityBands.length > 0) {
    filtered = filtered.filter(g => filter.priorityBands!.includes(g.priorityBand));
  }

  if (filter.layers && filter.layers.length > 0) {
    filtered = filtered.filter(g => filter.layers!.includes(g.layer));
  }

  if (filter.maxCost !== undefined) {
    filtered = filtered.filter(g => g.remediationCost <= filter.maxCost!);
  }

  if (filter.quickWinsOnly) {
    filtered = filtered.filter(g => g.priorityScore >= 5 && g.remediationCost <= 2);
  }

  return filtered;
}

/**
 * Export gap analysis to structured format
 */
export interface GapExportData {
  generatedDate: string;
  summary: {
    totalGaps: number;
    byPriority: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
    estimatedCost: string;
    expectedROI: string;
  };
  gaps: {
    id: string;
    description: string;
    priority: string;
    priorityScore: number;
    layer: number;
    component: string;
    risk: number;
    impact: number;
    cost: number;
    recommendation: string;
    timeline: string;
    estimatedCost: string;
    expectedROI: string;
  }[];
}

export function exportGapAnalysis(gapAnalysis: GapAnalysisResult): GapExportData {
  return {
    generatedDate: new Date().toISOString(),
    summary: {
      totalGaps: gapAnalysis.totalGaps,
      byPriority: {
        critical: gapAnalysis.criticalGaps,
        high: gapAnalysis.highGaps,
        medium: gapAnalysis.mediumGaps,
        low: gapAnalysis.lowGaps
      },
      estimatedCost: gapAnalysis.totalEstimatedCost,
      expectedROI: gapAnalysis.totalExpectedROI
    },
    gaps: gapAnalysis.gaps.map(gap => ({
      id: gap.id,
      description: gap.description,
      priority: gap.priorityBand,
      priorityScore: gap.priorityScore,
      layer: gap.layer,
      component: gap.componentId,
      risk: gap.risk,
      impact: gap.businessImpact,
      cost: gap.remediationCost,
      recommendation: gap.recommendation.title,
      timeline: gap.recommendation.timeline,
      estimatedCost: gap.recommendation.estimatedCost,
      expectedROI: gap.recommendation.expectedROI
    }))
  };
}
