import React, { useState } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import {
  exportToJSON,
  exportMaturityToCSV,
  exportGapsToCSV,
  exportAnswersToCSV,
  exportExecutiveSummary,
  saveAssessment,
  loadAssessment,
  getSavedAssessments,
  deleteSavedAssessment,
  printReport
} from '../utils/exportUtils';

/**
 * EXPORT & SAVE MENU
 *
 * Dropdown menu for exporting and managing assessments
 */

export function ExportMenu() {
  const { answers, maturitySummary, gapAnalysis } = useAssessment();
  const [isOpen, setIsOpen] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [saveName, setSaveName] = useState('');

  const hasData = Object.keys(answers).length > 0;

  const handleSave = () => {
    if (saveName.trim()) {
      saveAssessment(answers, saveName);
      setSaveName('');
      setShowSaveDialog(false);
      alert('Assessment saved successfully!');
    }
  };

  return (
    <div className="relative">
      {/* Export Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-ea-accent text-white rounded-lg hover:bg-blue-600 font-medium flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export & Save
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="p-2">
              {/* Export Section */}
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                Export
              </div>

              <button
                onClick={() => {
                  if (maturitySummary && gapAnalysis) {
                    exportExecutiveSummary(maturitySummary, gapAnalysis);
                  }
                  setIsOpen(false);
                }}
                disabled={!hasData}
                className="w-full px-3 py-2 text-left text-sm rounded hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-lg">📄</span>
                Executive Summary (.txt)
              </button>

              <button
                onClick={() => {
                  exportToJSON(answers, maturitySummary, gapAnalysis);
                  setIsOpen(false);
                }}
                disabled={!hasData}
                className="w-full px-3 py-2 text-left text-sm rounded hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-lg">📦</span>
                Complete Data (.json)
              </button>

              <button
                onClick={() => {
                  if (maturitySummary) {
                    exportMaturityToCSV(maturitySummary);
                  }
                  setIsOpen(false);
                }}
                disabled={!maturitySummary}
                className="w-full px-3 py-2 text-left text-sm rounded hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-lg">📊</span>
                Maturity Results (.csv)
              </button>

              <button
                onClick={() => {
                  if (gapAnalysis) {
                    exportGapsToCSV(gapAnalysis);
                  }
                  setIsOpen(false);
                }}
                disabled={!gapAnalysis}
                className="w-full px-3 py-2 text-left text-sm rounded hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-lg">🎯</span>
                Gap Analysis (.csv)
              </button>

              <button
                onClick={() => {
                  exportAnswersToCSV(answers);
                  setIsOpen(false);
                }}
                disabled={!hasData}
                className="w-full px-3 py-2 text-left text-sm rounded hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-lg">✓</span>
                All Answers (.csv)
              </button>

              <button
                onClick={() => {
                  printReport();
                  setIsOpen(false);
                }}
                disabled={!hasData}
                className="w-full px-3 py-2 text-left text-sm rounded hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-lg">🖨️</span>
                Print Report
              </button>

              <div className="my-2 border-t border-gray-200" />

              {/* Save/Load Section */}
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                Save & Load
              </div>

              <button
                onClick={() => {
                  setShowSaveDialog(true);
                  setIsOpen(false);
                }}
                disabled={!hasData}
                className="w-full px-3 py-2 text-left text-sm rounded hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-lg">💾</span>
                Save Assessment
              </button>

              <button
                onClick={() => {
                  setShowLoadDialog(true);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm rounded hover:bg-gray-100 flex items-center gap-2"
              >
                <span className="text-lg">📂</span>
                Load Assessment
              </button>
            </div>
          </div>
        </>
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Assessment</h3>
            <p className="text-sm text-gray-600 mb-4">
              Give this assessment a name to save it for later.
            </p>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="e.g., Company XYZ Q1 2024"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ea-accent mb-4"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowSaveDialog(false);
                  setSaveName('');
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!saveName.trim()}
                className="px-4 py-2 bg-ea-accent text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load Dialog */}
      {showLoadDialog && (
        <LoadDialog onClose={() => setShowLoadDialog(false)} />
      )}
    </div>
  );
}

/**
 * LOAD DIALOG
 * Shows saved assessments and allows loading
 */
function LoadDialog({ onClose }: { onClose: () => void }) {
  const { answerQuestion, resetAssessment } = useAssessment();
  const [savedAssessments, setSavedAssessments] = useState(getSavedAssessments());

  const handleLoad = (index: number) => {
    const answers = loadAssessment(index);
    if (answers) {
      resetAssessment();
      // Load all answers
      Object.entries(answers).forEach(([questionId, answer]) => {
        answerQuestion(questionId, answer);
      });
      onClose();
      alert('Assessment loaded successfully!');
    }
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this saved assessment?')) {
      deleteSavedAssessment(index);
      setSavedAssessments(getSavedAssessments());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Load Assessment</h3>

        {savedAssessments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No saved assessments found.</p>
            <p className="text-sm mt-2">Save an assessment to see it here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedAssessments.map((assessment, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:border-ea-accent transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{assessment.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Saved: {new Date(assessment.savedDate).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {assessment.questionsAnswered} questions answered
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleLoad(index)}
                      className="px-3 py-1 bg-ea-accent text-white text-sm rounded hover:bg-blue-600"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
