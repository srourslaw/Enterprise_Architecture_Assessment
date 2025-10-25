import { Recommendation } from './Recommendation';

export type GapPriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type CostBand = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Gap {
  id: string; // "G001", "G002", etc.
  description: string;
  layer: number; // 0-9
  componentId: string;
  componentName?: string;

  // Risk & Impact Scoring (1-5)
  risk: number; // 1=low, 5=critical security/compliance
  businessImpact: number; // 1=minor, 5=revenue/regulatory
  remediationCost: number; // 1-5 (S/M/L/XL/XXL)

  // Calculated priority score: (Risk × Impact) / Cost
  priorityScore: number;
  priorityBand: GapPriority;

  recommendation: Recommendation;
  triggeredBy?: string[]; // Question IDs that triggered this gap
}

export function calculatePriorityScore(risk: number, impact: number, cost: number): number {
  return (risk * impact) / cost;
}

export function getPriorityBand(score: number): GapPriority {
  if (score >= 8) return 'Critical';
  if (score >= 5) return 'High';
  if (score >= 3) return 'Medium';
  return 'Low';
}

export function getCostBandLabel(band: CostBand): string {
  const labels = {
    'S': 'Small',
    'M': 'Medium',
    'L': 'Large',
    'XL': 'Extra Large',
    'XXL': 'Very Large'
  };
  return labels[band];
}
