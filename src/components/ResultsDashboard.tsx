import { useAssessment } from '../context/AssessmentContext';

/**
 * RESULTS DASHBOARD COMPONENT
 *
 * Displays maturity scores, insights, and layer-by-layer breakdown
 */

export function ResultsDashboard() {
  const { maturitySummary, maturityInsights, gapAnalysis, setCurrentView } = useAssessment();

  if (!maturitySummary) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-yellow-900 mb-2">
            No Assessment Data Yet
          </h3>
          <p className="text-yellow-700 mb-4">
            Please answer some questions to see your maturity results.
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

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Overall Score Card */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">Overall Enterprise Architecture Maturity</div>
          <div
            className="inline-block text-6xl font-bold mb-2"
            style={{ color: maturitySummary.layers[0]?.color || '#3B82F6' }}
          >
            {maturitySummary.overallMaturityScore.toFixed(1)}
          </div>
          <div className="text-xl text-gray-700 mb-4">
            {maturitySummary.overallMaturityLabel}
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-ea-text">{maturitySummary.questionsAnswered}</span> / {maturitySummary.totalQuestions} Questions
            </div>
            <div>
              <span className="font-semibold text-ea-text">{maturitySummary.completionPercentage}%</span> Complete
            </div>
            <div>
              <span className="font-semibold text-ea-text">{maturitySummary.layers.length}</span> / 10 Layers Assessed
            </div>
          </div>
        </div>

        {/* Maturity Level Bar */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Maturity Scale</span>
          </div>
          <div className="flex h-12 rounded-lg overflow-hidden border border-gray-300">
            {[
              { level: 1, label: 'Initial', color: '#FEE2E2' },
              { level: 2, label: 'Developing', color: '#FED7AA' },
              { level: 3, label: 'Defined', color: '#FEF3C7' },
              { level: 4, label: 'Managed', color: '#D1FAE5' },
              { level: 5, label: 'Optimized', color: '#A7F3D0' }
            ].map(item => {
              const isCurrentLevel = maturitySummary.overallMaturityLevel === item.level;
              return (
                <div
                  key={item.level}
                  className={`flex-1 flex items-center justify-center text-xs font-medium relative ${
                    isCurrentLevel ? 'ring-4 ring-blue-500 z-10' : ''
                  }`}
                  style={{ backgroundColor: item.color }}
                >
                  <div className="text-center">
                    <div className="font-bold">{item.level}</div>
                    <div className="hidden md:block">{item.label}</div>
                  </div>
                  {isCurrentLevel && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="text-ea-accent text-xl">▲</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Insights */}
      {maturityInsights.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {maturityInsights.map((insight, index) => {
            const colors = {
              strength: 'bg-green-50 border-green-200 text-green-900',
              concern: 'bg-orange-50 border-orange-200 text-orange-900',
              critical: 'bg-red-50 border-red-200 text-red-900'
            };

            const icons = {
              strength: '✓',
              concern: '!',
              critical: '⚠'
            };

            return (
              <div key={index} className={`border rounded-lg p-4 ${colors[insight.type]}`}>
                <div className="flex items-start">
                  <div className="text-2xl mr-3">{icons[insight.type]}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{insight.title}</h4>
                    <p className="text-sm">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Gap Summary Card */}
      {gapAnalysis && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gaps Identified</h3>
              <p className="text-gray-700">
                {gapAnalysis.totalGaps} improvement opportunities detected
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{gapAnalysis.criticalGaps}</div>
                <div className="text-xs text-gray-600">Critical</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{gapAnalysis.highGaps}</div>
                <div className="text-xs text-gray-600">High</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{gapAnalysis.mediumGaps}</div>
                <div className="text-xs text-gray-600">Medium</div>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('gaps')}
              className="px-6 py-2 bg-ea-accent text-white rounded-lg hover:bg-blue-600 font-medium"
            >
              View Gap Analysis
            </button>
          </div>
        </div>
      )}

      {/* Layer Maturity Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-ea-text mb-6">Layer-by-Layer Maturity</h3>

        <div className="space-y-4">
          {maturitySummary.layers.map(layer => (
            <div key={layer.layerId} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold"
                    style={{ backgroundColor: layer.color }}
                  >
                    {layer.maturityScore.toFixed(1)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg">{layer.layerName}</h4>
                    <p className="text-sm text-gray-600">{layer.maturityLabel}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {layer.components.length} component{layer.components.length !== 1 ? 's' : ''} assessed
                    </p>
                  </div>
                </div>

                {/* Visual Maturity Bar */}
                <div className="w-48">
                  <div className="flex h-8 rounded overflow-hidden border border-gray-300">
                    {[1, 2, 3, 4, 5].map(level => {
                      const isActive = level <= layer.maturityLevel;
                      const colors = ['#FEE2E2', '#FED7AA', '#FEF3C7', '#D1FAE5', '#A7F3D0'];
                      return (
                        <div
                          key={level}
                          className={`flex-1 ${isActive ? 'opacity-100' : 'opacity-30'}`}
                          style={{ backgroundColor: colors[level - 1] }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Component Pills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {layer.components.slice(0, 6).map(component => (
                  <div
                    key={component.componentId}
                    className="px-3 py-1 rounded-full text-xs border"
                    style={{
                      backgroundColor: component.color + '40',
                      borderColor: component.color
                    }}
                  >
                    {component.componentName}: {component.maturityScore.toFixed(1)}
                  </div>
                ))}
                {layer.components.length > 6 && (
                  <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    +{layer.components.length - 6} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentView('questionnaire')}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-ea-accent hover:bg-blue-50 transition-all text-left"
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="font-semibold text-gray-900">Continue Assessment</div>
            <div className="text-sm text-gray-600 mt-1">
              {maturitySummary.totalQuestions - maturitySummary.questionsAnswered} questions remaining
            </div>
          </button>

          <button
            onClick={() => setCurrentView('gaps')}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-ea-accent hover:bg-blue-50 transition-all text-left"
          >
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-semibold text-gray-900">View Gap Analysis</div>
            <div className="text-sm text-gray-600 mt-1">
              See {gapAnalysis?.totalGaps || 0} improvement opportunities
            </div>
          </button>

          <button
            onClick={() => setCurrentView('layers')}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-ea-accent hover:bg-blue-50 transition-all text-left"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold text-gray-900">Explore EA Map</div>
            <div className="text-sm text-gray-600 mt-1">
              Interactive view of all layers
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
