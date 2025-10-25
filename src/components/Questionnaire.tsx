import { useAssessment } from '../context/AssessmentContext';
import { questions } from '../data/questions';

/**
 * QUESTIONNAIRE COMPONENT
 *
 * Interactive EA assessment questionnaire with progress tracking
 */

export function Questionnaire() {
  const {
    answers,
    currentQuestionIndex,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    setCurrentView
  } = useAssessment();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  const handleAnswerSelect = (answer: string) => {
    answerQuestion(currentQuestion.id, answer);

    // Auto-advance to next question after short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        nextQuestion();
      }
    }, 300);
  };

  const isAnswered = answers[currentQuestion.id] !== undefined;
  const selectedAnswer = answers[currentQuestion.id];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-ea-text">EA Assessment Questionnaire</h2>
            <p className="text-gray-600 mt-1">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-ea-accent">{answeredCount}</div>
            <div className="text-sm text-gray-600">Answered</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-ea-accent rounded-full h-3 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>{Math.round(progress)}% Complete</span>
          <span>{questions.length - answeredCount} Remaining</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Category Badge */}
        <div className="inline-block px-3 py-1 bg-ea-accent text-white rounded-full text-sm font-medium mb-4">
          {currentQuestion.category}
        </div>

        {/* Question Text */}
        <h3 className="text-xl font-semibold text-ea-text mb-6">
          {currentQuestion.text}
          {currentQuestion.isRequired && <span className="text-red-500 ml-1">*</span>}
        </h3>

        {/* Answer Options */}
        <div className="space-y-3 mb-8">
          {currentQuestion.answers.map((answer, index) => {
            const isSelected = selectedAnswer === answer.label;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(answer.label)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-ea-accent bg-blue-50'
                    : 'border-gray-200 hover:border-ea-accent hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mt-0.5 mr-3 flex items-center justify-center ${
                      isSelected
                        ? 'border-ea-accent bg-ea-accent'
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${isSelected ? 'text-ea-accent' : 'text-gray-900'}`}>
                      {answer.label}
                    </div>
                    {answer.triggersGaps && answer.triggersGaps.length > 0 && (
                      <div className="text-xs text-orange-600 mt-1">
                        May identify improvement opportunities
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(answer.score)}`}>
                      Maturity: {answer.score}/5
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          <div className="text-sm text-gray-600">
            {currentQuestionIndex + 1} / {questions.length}
          </div>

          <button
            onClick={nextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentQuestionIndex === questions.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-ea-accent text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      {answeredCount > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-ea-accent">{answeredCount}</div>
              <div className="text-sm text-gray-600">Questions Answered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{questions.length - answeredCount}</div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-ea-accent">{Math.round(progress)}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
            <div className="text-center">
              <button
                onClick={() => setCurrentView('results')}
                className="text-sm text-ea-accent hover:underline font-medium"
              >
                View Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Progress */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Progress by Category</h4>
        <div className="space-y-3">
          {getCategoryProgress(questions, answers).map((cat, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{cat.category}</span>
                <span className="text-gray-600">{cat.answered}/{cat.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-ea-accent rounded-full h-2 transition-all"
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper to get score color
function getScoreColor(score: number): string {
  if (score >= 5) return 'bg-green-100 text-green-800';
  if (score >= 4) return 'bg-green-50 text-green-700';
  if (score >= 3) return 'bg-yellow-50 text-yellow-700';
  if (score >= 2) return 'bg-orange-50 text-orange-700';
  return 'bg-red-50 text-red-700';
}

// Helper to calculate category progress
function getCategoryProgress(questions: any[], answers: any) {
  const categories = [...new Set(questions.map(q => q.category))];

  return categories.map(category => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const answered = categoryQuestions.filter(q => answers[q.id] !== undefined).length;
    const total = categoryQuestions.length;
    const percentage = (answered / total) * 100;

    return {
      category,
      answered,
      total,
      percentage
    };
  });
}
