import { Gap } from './Gap';

export interface Assessment {
  id: string; // Unique identifier
  clientName: string;
  date: Date;
  answers: Record<string, string>; // QuestionID → Selected Answer Label
  componentMaturity: Record<string, number>; // ComponentID → Score 1-5
  layerMaturity: Record<number, number>; // LayerID (0-9) → Score 1-5
  overallMaturity: number; // Overall EA maturity score 1-5
  gaps: Gap[];
  lastUpdated: Date;
}

export interface AssessmentMetadata {
  id: string;
  clientName: string;
  date: Date;
  overallMaturity: number;
  completionPercentage: number; // % of questions answered
  gapCount: number;
}
