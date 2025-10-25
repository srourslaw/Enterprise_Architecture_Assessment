import React, { useState } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { eaLayers } from '../data/eaLayers';

/**
 * GAP ANALYSIS & RECOMMENDATIONS COMPONENT
 *
 * Displays detected gaps, priority scores, and detailed recommendations
 */

export function GapAnalysis() {
  const { gapAnalysis, recommendations, setCurrentView } = useAssessment();
  const [selectedGapId, setSelectedGapId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'Critical' | 'High' | 'Medium' | 'Low'>('all');

  if (!gapAnalysis || gapAnalysis.totalGaps === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-green-900 mb-2">
            No Gaps Detected
          </h3>
          <p className="text-green-700 mb-4">
            Great! Your EA assessment shows no significant gaps based on your answers.
          </p>
          <button
            onClick={() => setCurrentView('results')}
            className="px-6 py-2 bg-ea-accent text-white rounded-lg hover:bg-blue-600"
          >
            View Results
          </button>
        </div>
      </div>
    );
  }

  const selectedGap = selectedGapId
    ? gapAnalysis.gaps.find(g => g.id === selectedGapId)
    : null;

  const filteredGaps = filter === 'all'
    ? gapAnalysis.gaps
    : gapAnalysis.gaps.filter(g => g.priorityBand === filter);

  const layerNames = eaLayers.reduce((acc, layer) => {
    acc[layer.id] = layer.name;
    return acc;
  }, {} as { [key: number]: string });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ea-text">Gap Analysis & Recommendations</h2>
            <p className="text-gray-600 mt-1">
              {gapAnalysis.totalGaps} improvement opportunities identified
            </p>
          </div>
          <button
            onClick={() => setCurrentView('results')}
            className="px-4 py-2 text-ea-accent hover:underline"
          >
            ← Back to Results
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-3xl font-bold text-red-600">{gapAnalysis.criticalGaps}</div>
          <div className="text-sm text-red-900 font-medium">Critical Priority</div>
          <div className="text-xs text-red-700 mt-1">Immediate attention required</div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="text-3xl font-bold text-orange-600">{gapAnalysis.highGaps}</div>
          <div className="text-sm text-orange-900 font-medium">High Priority</div>
          <div className="text-xs text-orange-700 mt-1">Address in next quarter</div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-3xl font-bold text-yellow-600">{gapAnalysis.mediumGaps}</div>
          <div className="text-sm text-yellow-900 font-medium">Medium Priority</div>
          <div className="text-xs text-yellow-700 mt-1">Plan for next 6-12 months</div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-3xl font-bold text-blue-600">{gapAnalysis.lowGaps}</div>
          <div className="text-sm text-blue-900 font-medium">Low Priority</div>
          <div className="text-xs text-blue-700 mt-1">Long-term roadmap</div>
        </div>
      </div>

      {/* Investment Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Estimated Total Investment</div>
            <div className="text-3xl font-bold text-blue-600">{gapAnalysis.totalEstimatedCost}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Expected Total ROI (3 years)</div>
            <div className="text-3xl font-bold text-green-600">{gapAnalysis.totalExpectedROI}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Recommended Timeline</div>
            <div className="text-3xl font-bold text-purple-600">12-36 mo</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-2">
          {(['all', 'Critical', 'High', 'Medium', 'Low'] as const).map(priority => {
            const count = priority === 'all'
              ? gapAnalysis.totalGaps
              : gapAnalysis.gaps.filter(g => g.priorityBand === priority).length;

            return (
              <button
                key={priority}
                onClick={() => setFilter(priority)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === priority
                    ? 'bg-ea-accent text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {priority === 'all' ? 'All' : priority} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Gap List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredGaps.map((gap, index) => {
            const isSelected = selectedGapId === gap.id;
            const priorityColors = {
              Critical: 'bg-red-100 text-red-800 border-red-300',
              High: 'bg-orange-100 text-orange-800 border-orange-300',
              Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
              Low: 'bg-blue-100 text-blue-800 border-blue-300'
            };

            return (
              <div key={gap.id} className={`${isSelected ? 'bg-blue-50' : 'bg-white'}`}>
                <button
                  onClick={() => setSelectedGapId(isSelected ? null : gap.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[gap.priorityBand]}`}>
                          {gap.priorityBand} Priority
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {layerNames[gap.layer]}
                        </span>
                        <span className="text-sm text-gray-600">
                          Priority Score: <span className="font-bold">{gap.priorityScore.toFixed(1)}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {gap.description}
                      </h3>

                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Risk:</span> {gap.risk}/5
                        </div>
                        <div>
                          <span className="font-medium">Impact:</span> {gap.businessImpact}/5
                        </div>
                        <div>
                          <span className="font-medium">Cost:</span> {gap.remediationCost}/5
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      <svg
                        className={`w-6 h-6 text-gray-400 transition-transform ${isSelected ? 'transform rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isSelected && (
                  <div className="px-6 pb-6 bg-gray-50 border-t border-gray-200">
                    <div className="mt-4 space-y-4">
                      {/* Recommendation */}
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Recommendation: {gap.recommendation.title}
                        </h4>
                        <p className="text-gray-700 mb-4">{gap.recommendation.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-gray-50 rounded p-3">
                            <div className="text-xs text-gray-600 mb-1">Timeline</div>
                            <div className="font-semibold text-gray-900">{gap.recommendation.timeline}</div>
                          </div>
                          <div className="bg-gray-50 rounded p-3">
                            <div className="text-xs text-gray-600 mb-1">Estimated Cost</div>
                            <div className="font-semibold text-gray-900">{gap.recommendation.estimatedCost}</div>
                          </div>
                          <div className="bg-gray-50 rounded p-3">
                            <div className="text-xs text-gray-600 mb-1">Expected ROI</div>
                            <div className="font-semibold text-green-600">{gap.recommendation.expectedROI}</div>
                          </div>
                          <div className="bg-gray-50 rounded p-3">
                            <div className="text-xs text-gray-600 mb-1">Gap ID</div>
                            <div className="font-mono text-sm text-gray-900">{gap.id}</div>
                          </div>
                        </div>

                        {/* Suggested Vendors */}
                        {gap.recommendation.suggestedVendors && gap.recommendation.suggestedVendors.length > 0 && (
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-2">Suggested Vendors:</div>
                            <div className="flex flex-wrap gap-2">
                              {gap.recommendation.suggestedVendors?.map((vendor, idx) => (
                                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                  {vendor}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Detection Info */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Detection Information</h5>
                        <div className="text-sm text-gray-600">
                          <div className="mb-1">
                            <span className="font-medium">Triggered by:</span> {gap.triggeredBy.length} question{gap.triggeredBy.length !== 1 ? 's' : ''}
                          </div>
                          <div className="mb-1">
                            <span className="font-medium">Confidence:</span> {gap.detectionConfidence}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {gap.triggeredBy.map((qId, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                                {qId}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Win Recommendations */}
      {recommendations.some(r => r.quickWins) && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">⚡</span>
            Quick Wins (High Impact, Low Cost)
          </h3>
          <div className="space-y-2">
            {recommendations
              .filter(r => r.quickWins)
              .map(rec => (
                <div key={rec.gap.id} className="bg-white rounded p-3 border border-green-300">
                  <div className="font-medium text-gray-900">{rec.gap.description}</div>
                  <div className="text-sm text-gray-600 mt-1">{rec.rationale}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
