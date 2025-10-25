import { useState } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { eaLayers } from '../data/eaLayers';

/**
 * ROADMAP & TIMELINE COMPONENT
 *
 * Visual timeline showing recommended implementation roadmap
 * Organized by quarters and phases
 */

export function Roadmap() {
  const { gapAnalysis, setCurrentView } = useAssessment();
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  if (!gapAnalysis || gapAnalysis.totalGaps === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">
            No Roadmap Available
          </h3>
          <p className="text-blue-700 mb-4">
            Complete the assessment to generate a transformation roadmap.
          </p>
          <button
            onClick={() => setCurrentView('questionnaire')}
            className="px-6 py-2 bg-ea-accent text-white rounded-lg hover:bg-blue-600"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  // Group gaps by timeline
  const phases = buildRoadmapPhases(gapAnalysis.gaps);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ea-text">Implementation Roadmap</h2>
            <p className="text-gray-600 mt-1">
              Phased transformation plan based on gap analysis and priorities
            </p>
          </div>
          <button
            onClick={() => setCurrentView('gaps')}
            className="px-4 py-2 text-ea-accent hover:underline"
          >
            ← Back to Gap Analysis
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Total Initiatives</div>
          <div className="text-3xl font-bold text-ea-accent">{gapAnalysis.totalGaps}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Timeline</div>
          <div className="text-3xl font-bold text-purple-600">12-36 mo</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Total Investment</div>
          <div className="text-2xl font-bold text-blue-600">{gapAnalysis.totalEstimatedCost}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Expected ROI</div>
          <div className="text-2xl font-bold text-green-600">{gapAnalysis.totalExpectedROI}</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Phased Implementation Timeline</h3>

        <div className="space-y-8">
          {phases.map((phase, index) => {
            const isSelected = selectedPhase === index;
            const phaseColors = [
              'bg-red-100 border-red-300 text-red-900',
              'bg-orange-100 border-orange-300 text-orange-900',
              'bg-yellow-100 border-yellow-300 text-yellow-900',
              'bg-blue-100 border-blue-300 text-blue-900'
            ];

            return (
              <div key={index} className="relative">
                {/* Timeline Line */}
                {index < phases.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-300" />
                )}

                {/* Phase Card */}
                <div className="relative">
                  <button
                    onClick={() => setSelectedPhase(isSelected ? null : index)}
                    className={`w-full text-left border-2 rounded-lg p-6 transition-all ${
                      isSelected ? 'ring-2 ring-ea-accent' : ''
                    } ${phaseColors[index % 4]}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          {/* Phase Number Circle */}
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold">
                            {index + 1}
                          </div>

                          <div className="flex-1">
                            <h4 className="text-xl font-bold mb-1">{phase.name}</h4>
                            <p className="text-sm opacity-90">{phase.timeline}</p>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold">{phase.gaps.length}</div>
                            <div className="text-xs">Initiatives</div>
                          </div>
                        </div>

                        <p className="text-sm opacity-90 mb-3">{phase.description}</p>

                        <div className="flex gap-4 text-sm">
                          <div>
                            <span className="font-semibold">Investment:</span> {phase.estimatedCost}
                          </div>
                          <div>
                            <span className="font-semibold">Critical:</span> {phase.criticalCount}
                          </div>
                          <div>
                            <span className="font-semibold">High:</span> {phase.highCount}
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        <svg
                          className={`w-6 h-6 transition-transform ${isSelected ? 'transform rotate-180' : ''}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {isSelected && (
                    <div className="mt-4 bg-white rounded-lg border border-gray-200 p-6">
                      <h5 className="font-semibold text-gray-900 mb-4">Phase {index + 1} Initiatives</h5>
                      <div className="space-y-3">
                        {phase.gaps.map((gap, gapIndex) => {
                          const layerName = eaLayers.find(l => l.id === gap.layer)?.name || `Layer ${gap.layer}`;
                          const priorityColors: Record<string, string> = {
                            Critical: 'bg-red-50 border-red-200',
                            High: 'bg-orange-50 border-orange-200',
                            Medium: 'bg-yellow-50 border-yellow-200',
                            Low: 'bg-blue-50 border-blue-200'
                          };

                          return (
                            <div
                              key={gap.id}
                              className={`border rounded-lg p-4 ${priorityColors[gap.priorityBand] || 'bg-gray-50 border-gray-200'}`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium px-2 py-0.5 bg-white rounded">
                                      {gap.priorityBand}
                                    </span>
                                    <span className="text-xs text-gray-600">{layerName}</span>
                                  </div>
                                  <h6 className="font-medium text-gray-900">{gap.description}</h6>
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-4 text-sm mt-3">
                                <div>
                                  <div className="text-xs text-gray-600">Timeline</div>
                                  <div className="font-medium">{gap.recommendation.timeline}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-600">Cost</div>
                                  <div className="font-medium">{gap.recommendation.estimatedCost}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-600">Expected ROI</div>
                                  <div className="font-medium text-green-700">{gap.recommendation.expectedROI}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gantt-style Timeline Visualization */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline Overview</h3>

        <div className="overflow-x-auto">
          {/* Timeline Header */}
          <div className="flex mb-4 text-sm font-medium text-gray-700">
            <div className="w-64 flex-shrink-0">Initiative</div>
            <div className="flex-1 flex">
              <div className="flex-1 text-center border-l border-gray-300 px-2">Q1-Q2</div>
              <div className="flex-1 text-center border-l border-gray-300 px-2">Q3-Q4</div>
              <div className="flex-1 text-center border-l border-gray-300 px-2">Y2 H1</div>
              <div className="flex-1 text-center border-l border-gray-300 px-2">Y2 H2</div>
              <div className="flex-1 text-center border-l border-gray-300 px-2">Y3</div>
            </div>
          </div>

          {/* Timeline Bars */}
          <div className="space-y-2">
            {gapAnalysis.topGaps.slice(0, 10).map((gap, index) => {
              const { start, duration } = getTimelinePosition(gap.recommendation.timeline);
              const barColors = {
                Critical: 'bg-red-500',
                High: 'bg-orange-500',
                Medium: 'bg-yellow-500',
                Low: 'bg-blue-500'
              };

              return (
                <div key={gap.id} className="flex items-center">
                  <div className="w-64 flex-shrink-0 text-sm truncate pr-4">
                    {gap.description}
                  </div>
                  <div className="flex-1 flex relative h-8">
                    <div
                      className={`absolute h-6 rounded ${barColors[gap.priorityBand]} opacity-80`}
                      style={{
                        left: `${start}%`,
                        width: `${duration}%`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Build roadmap phases from gaps
 */
function buildRoadmapPhases(gaps: any[]) {
  // Phase 1: Quick Wins & Critical (0-6 months)
  const phase1 = gaps.filter(g =>
    (g.priorityScore >= 8 || g.remediationCost <= 2) &&
    g.recommendation.timeline.includes('3-6 months')
  );

  // Phase 2: High Priority (6-12 months)
  const phase2 = gaps.filter(g =>
    g.priorityBand === 'High' &&
    (g.recommendation.timeline.includes('6-12 months') || g.recommendation.timeline.includes('4-8 months'))
  );

  // Phase 3: Medium Priority (12-18 months)
  const phase3 = gaps.filter(g =>
    (g.priorityBand === 'Medium' || g.priorityBand === 'High') &&
    g.recommendation.timeline.includes('12-18 months')
  );

  // Phase 4: Long-term & Low Priority (18-36 months)
  const phase4 = gaps.filter(g =>
    g.recommendation.timeline.includes('18-36 months') ||
    (g.priorityBand === 'Low' || g.priorityBand === 'Medium')
  );

  // Remove duplicates (gaps might match multiple phases)
  const usedGapIds = new Set();
  const cleanPhases = (phaseGaps: any[]) => {
    return phaseGaps.filter(gap => {
      if (usedGapIds.has(gap.id)) return false;
      usedGapIds.add(gap.id);
      return true;
    });
  };

  const phases = [
    {
      name: 'Phase 1: Quick Wins & Critical Fixes',
      timeline: 'Months 1-6',
      description: 'High-impact, low-cost improvements and critical security/compliance gaps',
      gaps: cleanPhases(phase1),
      estimatedCost: calculatePhaseCost(phase1),
      criticalCount: phase1.filter(g => g.priorityBand === 'Critical').length,
      highCount: phase1.filter(g => g.priorityBand === 'High').length
    },
    {
      name: 'Phase 2: Foundation Building',
      timeline: 'Months 6-12',
      description: 'Core platform deployments and high-priority system upgrades',
      gaps: cleanPhases(phase2),
      estimatedCost: calculatePhaseCost(phase2),
      criticalCount: phase2.filter(g => g.priorityBand === 'Critical').length,
      highCount: phase2.filter(g => g.priorityBand === 'High').length
    },
    {
      name: 'Phase 3: Transformation',
      timeline: 'Months 12-24',
      description: 'Major system replacements and enterprise-wide initiatives',
      gaps: cleanPhases(phase3),
      estimatedCost: calculatePhaseCost(phase3),
      criticalCount: phase3.filter(g => g.priorityBand === 'Critical').length,
      highCount: phase3.filter(g => g.priorityBand === 'High').length
    },
    {
      name: 'Phase 4: Optimization & Innovation',
      timeline: 'Months 24-36',
      description: 'Advanced capabilities, AI/ML, and continuous improvement',
      gaps: cleanPhases(phase4),
      estimatedCost: calculatePhaseCost(phase4),
      criticalCount: phase4.filter(g => g.priorityBand === 'Critical').length,
      highCount: phase4.filter(g => g.priorityBand === 'High').length
    }
  ].filter(phase => phase.gaps.length > 0);

  return phases;
}

/**
 * Calculate total cost for a phase
 */
function calculatePhaseCost(gaps: any[]): string {
  const costMap: { [key: number]: number } = {
    1: 100000,
    2: 300000,
    3: 800000,
    4: 2000000,
    5: 5000000
  };

  const total = gaps.reduce((sum, gap) => sum + (costMap[gap.remediationCost] || 0), 0);

  if (total >= 1000000) {
    return `$${(total / 1000000).toFixed(1)}M`;
  } else if (total >= 1000) {
    return `$${(total / 1000).toFixed(0)}K`;
  }
  return `$${total}`;
}

/**
 * Get timeline position for Gantt chart
 */
function getTimelinePosition(timeline: string): { start: number; duration: number } {
  if (timeline.includes('1-3 months')) return { start: 0, duration: 15 };
  if (timeline.includes('3-6 months')) return { start: 10, duration: 15 };
  if (timeline.includes('4-8 months')) return { start: 15, duration: 20 };
  if (timeline.includes('6-12 months')) return { start: 25, duration: 25 };
  if (timeline.includes('12-18 months')) return { start: 40, duration: 25 };
  if (timeline.includes('18-36 months')) return { start: 60, duration: 35 };
  return { start: 0, duration: 20 };
}
