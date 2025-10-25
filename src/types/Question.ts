export interface Answer {
  label: string;
  score: number; // 1-5 for maturity scoring
  triggersGaps?: string[]; // Gap IDs that this answer triggers
}

export type QuestionCategory =
  | 'Company Profile'
  | 'Strategic Drivers'
  | 'Applications & Systems'
  | 'Data & Analytics'
  | 'Integration'
  | 'Infrastructure & Cloud'
  | 'Security & Compliance'
  | 'DevOps & Delivery'
  | 'Pain Points';

export interface Question {
  id: string; // "Q1.1", "Q2.1", etc.
  category: QuestionCategory;
  text: string;
  answers: Answer[];
  affectsComponents: string[]; // Component IDs that this question impacts
  weight: number; // For maturity calculation (default: 1.0)
  isRequired?: boolean;
}
