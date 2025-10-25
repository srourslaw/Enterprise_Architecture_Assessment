export type InitiativeType = 'Quick Win' | 'Medium-Term' | 'Strategic';

export interface Recommendation {
  title: string;
  description: string;

  // Investment (new format)
  investment?: {
    min: number; // AUD
    max: number; // AUD
  };

  // Legacy format (for backward compatibility)
  estimatedCost?: string;
  suggestedVendors?: string[];

  // Timeline
  timeline: string; // "4-8 weeks", "6-12 months", etc.
  initiativeType?: InitiativeType;

  // Expected Returns
  expectedROI: string; // "150-300%", "200-400%"
  paybackPeriod?: string; // "2-4 months", "12-18 months"

  // Recommendations
  vendor?: string; // Recommended vendor/solution
  businessBenefit?: string;
  successMetrics?: string[];

  // Additional details
  actions?: string[]; // Step-by-step actions
  owner?: string; // Typical owner (CISO, CDO, etc.)
}
