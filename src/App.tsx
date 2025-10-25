import React from 'react';
import { AssessmentProvider, useAssessment } from './context/AssessmentContext';
import { Questionnaire } from './components/Questionnaire';
import { ResultsDashboard } from './components/ResultsDashboard';
import { GapAnalysis } from './components/GapAnalysis';
import { Roadmap } from './components/Roadmap';
import { VisualMap } from './components/VisualMap';
import { ExportMenu } from './components/ExportMenu';
import { eaLayers } from './data/eaLayers';

/**
 * MAIN APPLICATION
 *
 * Enterprise Architecture Assessment Dashboard
 * Multi-view application with questionnaire, results, gap analysis, and EA map
 */

function AppContent() {
  const { currentView, setCurrentView, answers, maturitySummary, gapAnalysis, resetAssessment } = useAssessment();

  return (
    <div className="min-h-screen bg-ea-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-ea-text">
                EA Assessment Dashboard
              </h1>
              <p className="text-xs text-gray-600 mt-0.5">
                TOGAF 10 + ArchiMate 3.2 • 10 Layers • 109 Components
              </p>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-xl font-bold text-ea-accent">
                  {Object.keys(answers).length}
                </div>
                <div className="text-xs text-gray-600">Answered</div>
              </div>

              {maturitySummary && (
                <div className="text-center">
                  <div className="text-xl font-bold" style={{ color: maturitySummary.layers[0]?.color || '#3B82F6' }}>
                    {maturitySummary.overallMaturityScore.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-600">Maturity</div>
                </div>
              )}

              {gapAnalysis && gapAnalysis.totalGaps > 0 && (
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-600">
                    {gapAnalysis.totalGaps}
                  </div>
                  <div className="text-xs text-gray-600">Gaps</div>
                </div>
              )}

              <ExportMenu />

              <button
                onClick={resetAssessment}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4 border-b border-gray-200">
            <button
              onClick={() => setCurrentView('questionnaire')}
              className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                currentView === 'questionnaire'
                  ? 'border-ea-accent text-ea-accent'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Questionnaire
            </button>

            <button
              onClick={() => setCurrentView('results')}
              className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                currentView === 'results'
                  ? 'border-ea-accent text-ea-accent'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Results
            </button>

            <button
              onClick={() => setCurrentView('gaps')}
              className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 relative ${
                currentView === 'gaps'
                  ? 'border-ea-accent text-ea-accent'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Gap Analysis
              {gapAnalysis && gapAnalysis.totalGaps > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                  {gapAnalysis.totalGaps}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentView('layers')}
              className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                currentView === 'layers'
                  ? 'border-ea-accent text-ea-accent'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              EA Map
            </button>

            <button
              onClick={() => setCurrentView('roadmap')}
              className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                currentView === 'roadmap'
                  ? 'border-ea-accent text-ea-accent'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Roadmap
            </button>

            <button
              onClick={() => setCurrentView('visual')}
              className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                currentView === 'visual'
                  ? 'border-ea-accent text-ea-accent'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              🗺️ Visual Map
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={currentView === 'visual' ? '' : 'px-4 py-8'}>
        {currentView === 'questionnaire' && <Questionnaire />}
        {currentView === 'results' && <ResultsDashboard />}
        {currentView === 'gaps' && <GapAnalysis />}
        {currentView === 'layers' && <EAMapView setCurrentView={setCurrentView} />}
        {currentView === 'roadmap' && <Roadmap />}
        {currentView === 'visual' && <VisualMap />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              EA Assessment Tool v3.0 • Built with React + TypeScript + Tailwind CSS
            </div>
            <div className="flex gap-4">
              <span>Phase 3 Complete: Export, Roadmap & Full Features</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * EA MAP VIEW
 * Interactive view of all 10 layers
 */
function EAMapView({ setCurrentView }: { setCurrentView: (view: any) => void }) {
  const { maturitySummary } = useAssessment();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-ea-text mb-2">
          Enterprise Architecture Map
        </h2>
        <p className="text-gray-600">
          Complete view of all 10 EA layers and 109 components based on TOGAF 10 + ArchiMate 3.2
        </p>
      </div>

      {/* Layers */}
      <div className="space-y-4">
        {eaLayers.map((layer) => {
          // Find maturity for this layer if available
          const layerMaturity = maturitySummary?.layers.find(l => l.layerId === layer.id);

          return (
            <div
              key={layer.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-3xl font-bold text-ea-accent">
                      {layer.id}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-ea-text">
                        {layer.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {layer.components.length} components
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4">
                    {layer.description}
                  </p>

                  {/* Component Pills */}
                  <div className="flex flex-wrap gap-2">
                    {layer.components.map((component) => {
                      // Find component maturity if available
                      const componentMaturity = layerMaturity?.components.find(
                        c => c.componentId === component.id
                      );

                      return (
                        <span
                          key={component.id}
                          className="px-3 py-1.5 rounded-full text-xs font-medium border"
                          style={{
                            backgroundColor: componentMaturity?.color + '40' || '#E5E7EB',
                            borderColor: componentMaturity?.color || '#D1D5DB',
                            color: '#374151'
                          }}
                        >
                          {component.name}
                          {componentMaturity && (
                            <span className="ml-1 font-bold">
                              {componentMaturity.maturityScore.toFixed(1)}
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Maturity Score */}
                <div className="ml-6 text-center">
                  {layerMaturity ? (
                    <div
                      className="w-20 h-20 rounded-lg flex items-center justify-center text-3xl font-bold"
                      style={{ backgroundColor: layerMaturity.color }}
                    >
                      {layerMaturity.maturityScore.toFixed(1)}
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-ea-base flex items-center justify-center">
                      <span className="text-3xl">📊</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {layerMaturity ? layerMaturity.maturityLabel.split(' ')[0] : 'Not assessed'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      {!maturitySummary && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Start Your EA Assessment
          </h3>
          <p className="text-blue-700 mb-4">
            Answer 60+ questions to get maturity scores for all layers and identify improvement opportunities.
          </p>
          <button
            onClick={() => setCurrentView('questionnaire')}
            className="px-6 py-3 bg-ea-accent text-white rounded-lg hover:bg-blue-600 font-medium"
          >
            Begin Assessment
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * ROOT APP COMPONENT
 * Wraps everything in AssessmentProvider
 */
function App() {
  return (
    <AssessmentProvider>
      <AppContent />
    </AssessmentProvider>
  );
}

export default App;
