import { Vendor } from './Vendor';

export interface EAComponent {
  id: string; // "0.1", "1.1", etc.
  name: string; // "Business Strategy & Goals"
  description: string;
  vendors: Vendor[];
  relatedQuestions: string[]; // Question IDs
  maturityIndicators: Record<number, string>; // 1-5 with descriptions
  typicalPitfalls: string[];
}
