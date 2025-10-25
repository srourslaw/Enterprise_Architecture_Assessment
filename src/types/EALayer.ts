import { EAComponent } from './EAComponent';

export interface EALayer {
  id: number; // 0-9
  name: string; // "Strategy & Motivation"
  description: string;
  icon: string; // lucide-react icon name
  components: EAComponent[];
}

export type MaturityLevel = 1 | 2 | 3 | 4 | 5;

export const MaturityLabels: Record<string, string> = {
  '1': 'Initial',
  '2': 'Developing',
  '3': 'Defined',
  '4': 'Managed',
  '5': 'Optimized'
};

export function getMaturityLabel(score: number): string {
  if (score >= 1.0 && score < 2.0) return 'Initial (Critical attention needed)';
  if (score >= 2.0 && score < 3.0) return 'Developing (Significant gaps)';
  if (score >= 3.0 && score < 4.0) return 'Defined (On track)';
  if (score >= 4.0 && score < 5.0) return 'Managed (Above average)';
  if (score === 5.0) return 'Optimized (Best-in-class)';
  return 'Not assessed';
}
