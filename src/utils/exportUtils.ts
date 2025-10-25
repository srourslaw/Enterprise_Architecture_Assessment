import { MaturitySummary } from './maturityCalculator';
import { GapAnalysisResult, exportGapAnalysis } from './gapDetector';
import { AssessmentAnswers } from './maturityCalculator';
import { questions } from '../data/questions';
import { eaLayers } from '../data/eaLayers';

/**
 * EXPORT UTILITIES
 *
 * Functions to export assessment data in various formats:
 * - JSON (complete data export)
 * - CSV (maturity results, gaps, answers)
 * - Summary Report (formatted text)
 */

/**
 * Export complete assessment data as JSON
 */
export function exportToJSON(
  answers: AssessmentAnswers,
  maturitySummary: MaturitySummary | null,
  gapAnalysis: GapAnalysisResult | null
): void {
  const data = {
    exportDate: new Date().toISOString(),
    version: '2.0',
    assessment: {
      answers,
      questionsAnswered: Object.keys(answers).length,
      totalQuestions: questions.length,
      completionPercentage: Math.round((Object.keys(answers).length / questions.length) * 100)
    },
    maturity: maturitySummary,
    gaps: gapAnalysis ? exportGapAnalysis(gapAnalysis) : null
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadFile(blob, `EA-Assessment-${getDateString()}.json`);
}

/**
 * Export maturity results as CSV
 */
export function exportMaturityToCSV(maturitySummary: MaturitySummary): void {
  const rows: string[] = [];

  // Header
  rows.push('EA Assessment - Maturity Results');
  rows.push(`Export Date,${new Date().toISOString()}`);
  rows.push(`Overall Maturity Score,${maturitySummary.overallMaturityScore}`);
  rows.push(`Overall Maturity Level,${maturitySummary.overallMaturityLabel}`);
  rows.push(`Questions Answered,${maturitySummary.questionsAnswered}/${maturitySummary.totalQuestions}`);
  rows.push('');

  // Layer results
  rows.push('Layer ID,Layer Name,Maturity Score,Maturity Level,Maturity Label,Components Assessed');
  maturitySummary.layers.forEach(layer => {
    rows.push(
      `${layer.layerId},"${layer.layerName}",${layer.maturityScore},${layer.maturityLevel},"${layer.maturityLabel}",${layer.components.length}`
    );
  });
  rows.push('');

  // Component details
  rows.push('Layer ID,Layer Name,Component ID,Component Name,Maturity Score,Maturity Level,Contributing Questions');
  maturitySummary.layers.forEach(layer => {
    layer.components.forEach(component => {
      rows.push(
        `${layer.layerId},"${layer.layerName}",${component.componentId},"${component.componentName}",${component.maturityScore},${component.maturityLevel},${component.contributingQuestions}`
      );
    });
  });

  const csv = rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  downloadFile(blob, `EA-Maturity-${getDateString()}.csv`);
}

/**
 * Export gap analysis as CSV
 */
export function exportGapsToCSV(gapAnalysis: GapAnalysisResult): void {
  const rows: string[] = [];

  // Header
  rows.push('EA Assessment - Gap Analysis');
  rows.push(`Export Date,${new Date().toISOString()}`);
  rows.push(`Total Gaps,${gapAnalysis.totalGaps}`);
  rows.push(`Critical Gaps,${gapAnalysis.criticalGaps}`);
  rows.push(`High Priority Gaps,${gapAnalysis.highGaps}`);
  rows.push(`Medium Priority Gaps,${gapAnalysis.mediumGaps}`);
  rows.push(`Low Priority Gaps,${gapAnalysis.lowGaps}`);
  rows.push(`Estimated Total Cost,${gapAnalysis.totalEstimatedCost}`);
  rows.push(`Expected Total ROI,${gapAnalysis.totalExpectedROI}`);
  rows.push('');

  // Gap details
  rows.push('Gap ID,Description,Priority Band,Priority Score,Layer,Component,Risk,Impact,Cost,Recommendation,Timeline,Estimated Cost,Expected ROI,Suggested Vendors');
  gapAnalysis.gaps.forEach(gap => {
    const vendors = gap.recommendation.suggestedVendors.join('; ');
    rows.push(
      `${gap.id},"${gap.description}",${gap.priorityBand},${gap.priorityScore},${gap.layer},${gap.componentId},${gap.risk},${gap.businessImpact},${gap.remediationCost},"${gap.recommendation.title}","${gap.recommendation.timeline}","${gap.recommendation.estimatedCost}","${gap.recommendation.expectedROI}","${vendors}"`
    );
  });

  const csv = rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  downloadFile(blob, `EA-Gaps-${getDateString()}.csv`);
}

/**
 * Export answers as CSV
 */
export function exportAnswersToCSV(answers: AssessmentAnswers): void {
  const rows: string[] = [];

  // Header
  rows.push('EA Assessment - Answers');
  rows.push(`Export Date,${new Date().toISOString()}`);
  rows.push(`Questions Answered,${Object.keys(answers).length}/${questions.length}`);
  rows.push('');

  // Answers
  rows.push('Question ID,Category,Question,Answer,Score,Affects Components,Triggers Gaps');
  questions.forEach(question => {
    const answer = answers[question.id];
    if (answer) {
      const answerObj = question.answers.find(a => a.label === answer);
      const score = answerObj?.score || 0;
      const components = question.affectsComponents.join('; ');
      const gaps = answerObj?.triggersGaps?.join('; ') || '';

      rows.push(
        `${question.id},"${question.category}","${question.text}","${answer}",${score},"${components}","${gaps}"`
      );
    }
  });

  const csv = rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  downloadFile(blob, `EA-Answers-${getDateString()}.csv`);
}

/**
 * Generate Executive Summary Report
 */
export function generateExecutiveSummary(
  maturitySummary: MaturitySummary,
  gapAnalysis: GapAnalysisResult | null
): string {
  const lines: string[] = [];

  lines.push('═══════════════════════════════════════════════════════════════');
  lines.push('       ENTERPRISE ARCHITECTURE ASSESSMENT REPORT');
  lines.push('═══════════════════════════════════════════════════════════════');
  lines.push('');
  lines.push(`Report Date: ${new Date().toLocaleDateString()}`);
  lines.push(`Assessment Completion: ${maturitySummary.completionPercentage}%`);
  lines.push('');

  // Executive Summary
  lines.push('EXECUTIVE SUMMARY');
  lines.push('─────────────────────────────────────────────────────────────');
  lines.push(`Overall EA Maturity Score: ${maturitySummary.overallMaturityScore.toFixed(1)}/5.0`);
  lines.push(`Maturity Level: ${maturitySummary.overallMaturityLabel}`);
  lines.push('');

  if (gapAnalysis && gapAnalysis.totalGaps > 0) {
    lines.push(`Improvement Opportunities Identified: ${gapAnalysis.totalGaps}`);
    lines.push(`  • Critical Priority: ${gapAnalysis.criticalGaps}`);
    lines.push(`  • High Priority: ${gapAnalysis.highGaps}`);
    lines.push(`  • Medium Priority: ${gapAnalysis.mediumGaps}`);
    lines.push(`  • Low Priority: ${gapAnalysis.lowGaps}`);
    lines.push('');
    lines.push(`Estimated Investment Required: ${gapAnalysis.totalEstimatedCost}`);
    lines.push(`Expected 3-Year ROI: ${gapAnalysis.totalExpectedROI}`);
  }
  lines.push('');

  // Layer Breakdown
  lines.push('LAYER-BY-LAYER MATURITY ASSESSMENT');
  lines.push('─────────────────────────────────────────────────────────────');

  // Sort layers by maturity (lowest first to highlight areas needing attention)
  const sortedLayers = [...maturitySummary.layers].sort((a, b) => a.maturityScore - b.maturityScore);

  sortedLayers.forEach(layer => {
    const layerData = eaLayers.find(l => l.id === layer.layerId);
    lines.push('');
    lines.push(`${layer.layerId}. ${layer.layerName.toUpperCase()}`);
    lines.push(`   Maturity Score: ${layer.maturityScore.toFixed(1)}/5.0 (${layer.maturityLabel})`);
    lines.push(`   Components Assessed: ${layer.components.length}`);

    // Show top 3 components by maturity
    const topComponents = [...layer.components]
      .sort((a, b) => b.maturityScore - a.maturityScore)
      .slice(0, 3);

    if (topComponents.length > 0) {
      lines.push('   Top Components:');
      topComponents.forEach(comp => {
        lines.push(`     • ${comp.componentName}: ${comp.maturityScore.toFixed(1)}/5.0`);
      });
    }
  });
  lines.push('');

  // Top Gaps & Recommendations
  if (gapAnalysis && gapAnalysis.topGaps.length > 0) {
    lines.push('');
    lines.push('TOP 10 PRIORITY IMPROVEMENTS');
    lines.push('─────────────────────────────────────────────────────────────');

    gapAnalysis.topGaps.forEach((gap, index) => {
      const layerName = eaLayers.find(l => l.id === gap.layer)?.name || `Layer ${gap.layer}`;
      lines.push('');
      lines.push(`${index + 1}. [${gap.priorityBand.toUpperCase()}] ${gap.description}`);
      lines.push(`   Layer: ${layerName} | Priority Score: ${gap.priorityScore.toFixed(1)}`);
      lines.push(`   Risk: ${gap.risk}/5 | Impact: ${gap.businessImpact}/5 | Cost: ${gap.remediationCost}/5`);
      lines.push(`   Recommendation: ${gap.recommendation.title}`);
      lines.push(`   Timeline: ${gap.recommendation.timeline} | Cost: ${gap.recommendation.estimatedCost}`);
      lines.push(`   Expected ROI: ${gap.recommendation.expectedROI}`);
    });
  }

  lines.push('');
  lines.push('');
  lines.push('NEXT STEPS');
  lines.push('─────────────────────────────────────────────────────────────');
  lines.push('1. Review Critical and High priority gaps with leadership');
  lines.push('2. Validate cost estimates and ROI projections with finance');
  lines.push('3. Prioritize initiatives based on business strategy alignment');
  lines.push('4. Develop detailed implementation roadmap (12-36 months)');
  lines.push('5. Establish governance model for EA transformation');
  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════════');
  lines.push('       END OF REPORT');
  lines.push('═══════════════════════════════════════════════════════════════');

  return lines.join('\n');
}

/**
 * Download executive summary as text file
 */
export function exportExecutiveSummary(
  maturitySummary: MaturitySummary,
  gapAnalysis: GapAnalysisResult | null
): void {
  const summary = generateExecutiveSummary(maturitySummary, gapAnalysis);
  const blob = new Blob([summary], { type: 'text/plain' });
  downloadFile(blob, `EA-Executive-Summary-${getDateString()}.txt`);
}

/**
 * Save assessment to localStorage
 */
export function saveAssessment(
  answers: AssessmentAnswers,
  name: string = 'Current Assessment'
): void {
  const data = {
    name,
    savedDate: new Date().toISOString(),
    answers,
    questionsAnswered: Object.keys(answers).length
  };

  const saved = getSavedAssessments();
  saved.push(data);

  localStorage.setItem('ea-assessments', JSON.stringify(saved));
}

/**
 * Load assessment from localStorage
 */
export function loadAssessment(index: number): AssessmentAnswers | null {
  const saved = getSavedAssessments();
  if (index >= 0 && index < saved.length) {
    return saved[index].answers;
  }
  return null;
}

/**
 * Get all saved assessments
 */
export function getSavedAssessments(): Array<{
  name: string;
  savedDate: string;
  answers: AssessmentAnswers;
  questionsAnswered: number;
}> {
  const saved = localStorage.getItem('ea-assessments');
  return saved ? JSON.parse(saved) : [];
}

/**
 * Delete saved assessment
 */
export function deleteSavedAssessment(index: number): void {
  const saved = getSavedAssessments();
  saved.splice(index, 1);
  localStorage.setItem('ea-assessments', JSON.stringify(saved));
}

/**
 * Auto-save current assessment
 */
export function autoSave(answers: AssessmentAnswers): void {
  localStorage.setItem('ea-autosave', JSON.stringify({
    savedDate: new Date().toISOString(),
    answers
  }));
}

/**
 * Load auto-saved assessment
 */
export function loadAutoSave(): AssessmentAnswers | null {
  const saved = localStorage.getItem('ea-autosave');
  if (saved) {
    const data = JSON.parse(saved);
    return data.answers;
  }
  return null;
}

/**
 * Helper: Download file
 */
function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Helper: Get formatted date string for filenames
 */
function getDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

/**
 * Print current page
 */
export function printReport(): void {
  window.print();
}
