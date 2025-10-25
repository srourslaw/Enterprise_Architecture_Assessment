/**
 * COST ESTIMATION FRAMEWORK
 *
 * Based on industry benchmarks for enterprise architecture initiatives
 * Cost bands vary by company size and complexity
 * ROI calculations include NPV, payback period, and TCO analysis
 *
 * Sources: Gartner, Forrester, McKinsey benchmarks (2023-2024)
 */

export type CompanySize = 'Small' | 'Medium' | 'Large' | 'Enterprise';
export type CostComplexity = 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type TimelineRange = '1-3 months' | '3-6 months' | '6-12 months' | '12-18 months' | '18-36 months';

/**
 * COMPANY SIZE DEFINITIONS
 */
export const companySizeBands = {
  Small: {
    revenue: '$1M-$50M',
    employees: '10-250',
    itBudget: '$100K-$2M',
    description: 'Small businesses, startups, SMBs'
  },
  Medium: {
    revenue: '$50M-$500M',
    employees: '250-1,000',
    itBudget: '$2M-$20M',
    description: 'Mid-market companies'
  },
  Large: {
    revenue: '$500M-$5B',
    employees: '1,000-10,000',
    itBudget: '$20M-$200M',
    description: 'Large enterprises'
  },
  Enterprise: {
    revenue: '$5B+',
    employees: '10,000+',
    itBudget: '$200M+',
    description: 'Fortune 500, global enterprises'
  }
};

/**
 * COST BAND MATRIX
 * Maps cost complexity (S/M/L/XL/XXL) to actual $ ranges by company size
 */
export interface CostBand {
  complexity: CostComplexity;
  small: string;
  medium: string;
  large: string;
  enterprise: string;
  description: string;
}

export const costBands: CostBand[] = [
  {
    complexity: 'S',
    small: '$25K-$100K',
    medium: '$50K-$200K',
    large: '$100K-$400K',
    enterprise: '$200K-$800K',
    description: 'Small initiatives: Single tool deployment, basic automation, limited scope'
  },
  {
    complexity: 'M',
    small: '$100K-$300K',
    medium: '$200K-$600K',
    large: '$400K-$1.2M',
    enterprise: '$800K-$2.4M',
    description: 'Medium initiatives: Platform deployment, moderate integration, single domain'
  },
  {
    complexity: 'L',
    small: '$300K-$800K',
    medium: '$600K-$1.5M',
    large: '$1.2M-$4M',
    enterprise: '$2.4M-$8M',
    description: 'Large initiatives: Enterprise platform, multi-system integration, cross-domain'
  },
  {
    complexity: 'XL',
    small: '$800K-$2M',
    medium: '$1.5M-$4M',
    large: '$4M-$10M',
    enterprise: '$8M-$20M',
    description: 'Extra-large initiatives: Core system replacement (ERP, CRM), major transformation'
  },
  {
    complexity: 'XXL',
    small: 'N/A',
    medium: '$4M-$10M',
    large: '$10M-$30M',
    enterprise: '$20M-$100M',
    description: 'Enterprise transformation: Multi-year, company-wide, strategic overhaul'
  }
];

/**
 * Get cost range for specific complexity and company size
 */
export function getCostRange(complexity: CostComplexity, companySize: CompanySize): string {
  const band = costBands.find(b => b.complexity === complexity);
  if (!band) return 'Unknown';

  switch (companySize) {
    case 'Small': return band.small;
    case 'Medium': return band.medium;
    case 'Large': return band.large;
    case 'Enterprise': return band.enterprise;
    default: return 'Unknown';
  }
}

/**
 * IMPLEMENTATION TIMELINE BANDS
 */
export interface TimelineBand {
  range: TimelineRange;
  description: string;
  typicalInitiatives: string[];
  keyMilestones: string[];
}

export const timelineBands: TimelineBand[] = [
  {
    range: '1-3 months',
    description: 'Quick wins, tactical improvements',
    typicalInitiatives: [
      'MFA deployment',
      'Basic monitoring setup',
      'SSO for 5-10 apps',
      'API documentation portal'
    ],
    keyMilestones: [
      'Week 1-2: Planning & requirements',
      'Week 3-6: Configuration & testing',
      'Week 7-10: Pilot deployment',
      'Week 11-12: Full rollout & training'
    ]
  },
  {
    range: '3-6 months',
    description: 'Platform deployments, moderate complexity',
    typicalInitiatives: [
      'BI platform (Power BI, Tableau)',
      'API management platform',
      'CI/CD pipeline',
      'Data warehouse initial build',
      'IaC implementation'
    ],
    keyMilestones: [
      'Month 1: Discovery, design, vendor selection',
      'Month 2-3: Platform setup & configuration',
      'Month 4-5: Integration & testing',
      'Month 6: Training, go-live, hypercare'
    ]
  },
  {
    range: '6-12 months',
    description: 'Enterprise platforms, significant integration',
    typicalInitiatives: [
      'Cloud data platform (Snowflake, Databricks)',
      'iPaaS deployment (MuleSoft, Boomi)',
      'MDM program',
      'SIEM implementation',
      'Container platform (Kubernetes)',
      'Cloud migration (Phase 1)'
    ],
    keyMilestones: [
      'Months 1-2: Assessment, architecture, roadmap',
      'Months 3-6: Platform build & pilot',
      'Months 7-10: Phased rollout',
      'Months 11-12: Optimization & scaling'
    ]
  },
  {
    range: '12-18 months',
    description: 'Major system replacements, transformations',
    typicalInitiatives: [
      'Mid-market ERP replacement',
      'CRM transformation',
      'Zero Trust architecture',
      'Event-driven architecture',
      'Agile transformation',
      'Data governance program'
    ],
    keyMilestones: [
      'Months 1-3: Business case, vendor selection, design',
      'Months 4-9: Build, integrate, migrate data',
      'Months 10-15: UAT, training, phased cutover',
      'Months 16-18: Hypercare, optimization, lessons learned'
    ]
  },
  {
    range: '18-36 months',
    description: 'Enterprise-wide transformations',
    typicalInitiatives: [
      'SAP S/4HANA migration',
      'Cloud transformation (full)',
      'Enterprise-wide Zero Trust',
      'Complete digital transformation',
      'Multi-region platform consolidation'
    ],
    keyMilestones: [
      'Months 1-6: Strategy, business case, vendor selection, blueprint',
      'Months 7-18: Phased implementation (waves)',
      'Months 19-30: Testing, training, cutover',
      'Months 31-36: Stabilization, optimization, continuous improvement'
    ]
  }
];

/**
 * ROI CALCULATION MODELS
 */

export interface ROIModel {
  name: string;
  description: string;
  formula: string;
  typicalROI: string;
  paybackPeriod: string;
}

export const roiModels: { [key: string]: ROIModel } = {
  // Cost Reduction Models
  infrastructureSavings: {
    name: 'Infrastructure Cost Reduction',
    description: 'Cloud migration, server consolidation, datacenter exit',
    formula: '(Current Infrastructure Cost - New Infrastructure Cost) × Years',
    typicalROI: '150-200% over 3 years',
    paybackPeriod: '18-24 months'
  },

  licenseSavings: {
    name: 'License Optimization',
    description: 'Software license consolidation, SaaS optimization',
    formula: '(Eliminated License Costs + Reduced Maintenance) × Years',
    typicalROI: '200-300% over 3 years',
    paybackPeriod: '12-18 months'
  },

  // Productivity Models
  automationProductivity: {
    name: 'Process Automation Gains',
    description: 'RPA, workflow automation, integration automation',
    formula: '(FTE Hours Saved × Hourly Rate × Productivity Factor) × Years',
    typicalROI: '300-500% over 3 years',
    paybackPeriod: '9-15 months'
  },

  developerProductivity: {
    name: 'Developer Productivity',
    description: 'CI/CD, IaC, platform engineering, DevOps',
    formula: '(Dev Hours Saved × Hourly Rate × Deployment Frequency Increase) × Years',
    typicalROI: '250-400% over 3 years',
    paybackPeriod: '12-18 months'
  },

  // Revenue Impact Models
  revenueGrowth: {
    name: 'Revenue Growth Enablement',
    description: 'Faster time-to-market, new capabilities, improved CX',
    formula: '(New Revenue Enabled + Retained Revenue from CX) - Investment',
    typicalROI: '200-500% over 3 years',
    paybackPeriod: '18-30 months'
  },

  // Risk Reduction Models
  securityRiskAvoidance: {
    name: 'Security Breach Avoidance',
    description: 'Zero Trust, MFA, SIEM, PAM, DLP',
    formula: '(Probability of Breach × Average Breach Cost) - Investment',
    typicalROI: '300-1000%+ (avoided cost)',
    paybackPeriod: 'Immediate (if breach prevented)'
  },

  complianceRiskAvoidance: {
    name: 'Compliance Fine Avoidance',
    description: 'GDPR, CCPA, PCI-DSS, HIPAA, SOX compliance',
    formula: '(Probability of Fine × Average Fine) + Audit Costs Reduced - Investment',
    typicalROI: '200-500% over 3 years',
    paybackPeriod: '12-24 months'
  },

  // Quality Models
  qualityImprovement: {
    name: 'Quality & Defect Reduction',
    description: 'Testing automation, observability, shift-left',
    formula: '(Production Incident Cost Reduction + Faster Resolution) × Years',
    typicalROI: '250-400% over 3 years',
    paybackPeriod: '12-18 months'
  }
};

/**
 * NPV CALCULATOR
 * Calculate Net Present Value for multi-year investments
 */
export interface NPVInput {
  initialInvestment: number;
  annualBenefits: number[]; // Array of benefits by year
  annualCosts: number[]; // Array of ongoing costs by year
  discountRate: number; // Typical 8-12% for enterprise IT
}

export function calculateNPV(input: NPVInput): number {
  const { initialInvestment, annualBenefits, annualCosts, discountRate } = input;

  let npv = -initialInvestment;

  const years = Math.max(annualBenefits.length, annualCosts.length);

  for (let year = 1; year <= years; year++) {
    const benefit = annualBenefits[year - 1] || 0;
    const cost = annualCosts[year - 1] || 0;
    const netCashFlow = benefit - cost;
    const discountFactor = Math.pow(1 + discountRate, year);
    npv += netCashFlow / discountFactor;
  }

  return Math.round(npv);
}

/**
 * PAYBACK PERIOD CALCULATOR
 */
export function calculatePaybackPeriod(
  initialInvestment: number,
  annualNetBenefit: number
): number {
  return initialInvestment / annualNetBenefit;
}

/**
 * ROI PERCENTAGE CALCULATOR
 */
export function calculateROI(
  totalBenefits: number,
  totalCosts: number
): number {
  return ((totalBenefits - totalCosts) / totalCosts) * 100;
}

/**
 * TCO (TOTAL COST OF OWNERSHIP) CALCULATOR
 */
export interface TCOInput {
  initialImplementation: number;
  annualLicenses: number;
  annualSupport: number;
  annualInfrastructure: number;
  annualStaffing: number;
  years: number;
}

export function calculateTCO(input: TCOInput): number {
  const {
    initialImplementation,
    annualLicenses,
    annualSupport,
    annualInfrastructure,
    annualStaffing,
    years
  } = input;

  const annualCosts = annualLicenses + annualSupport + annualInfrastructure + annualStaffing;
  const totalCost = initialImplementation + (annualCosts * years);

  return Math.round(totalCost);
}

/**
 * COMPONENT-SPECIFIC COST ESTIMATES
 * Pre-calculated cost ranges for common EA initiatives
 */
export interface ComponentCostEstimate {
  componentId: string;
  componentName: string;
  costComplexity: CostComplexity;
  timeline: TimelineRange;
  costDrivers: string[];
  roiModel: string;
  notes: string;
}

export const componentCostEstimates: ComponentCostEstimate[] = [
  // Strategy Layer (0.x)
  {
    componentId: '0.1',
    componentName: 'EA Framework',
    costComplexity: 'M',
    timeline: '3-6 months',
    costDrivers: ['EA tool license', 'Consulting fees', 'Training', 'Governance setup'],
    roiModel: 'qualityImprovement',
    notes: 'Includes EA tool (LeanIX, Ardoq) + consulting for framework setup'
  },

  // Application Layer (2.x)
  {
    componentId: '2.1',
    componentName: 'ERP',
    costComplexity: 'XXL',
    timeline: '18-36 months',
    costDrivers: ['Software licenses', 'Implementation partner', 'Data migration', 'Change management', 'Integration'],
    roiModel: 'automationProductivity',
    notes: 'SAP S/4HANA migration is most expensive initiative. Consider phased approach.'
  },
  {
    componentId: '2.2',
    componentName: 'CRM',
    costComplexity: 'L',
    timeline: '6-12 months',
    costDrivers: ['Salesforce/D365 licenses', 'Customization', 'Data quality', 'Integration', 'Training'],
    roiModel: 'revenueGrowth',
    notes: 'Include MDM/data quality costs. CRM ROI heavily depends on adoption.'
  },
  {
    componentId: '2.5',
    componentName: 'EPM',
    costComplexity: 'M',
    timeline: '6-12 months',
    costDrivers: ['Anaplan/OneStream license', 'Implementation', 'Model design', 'Integration to ERP/GL'],
    roiModel: 'automationProductivity',
    notes: 'Fast ROI through faster close cycles (15 days → 5 days typical)'
  },

  // Data Layer (3.x)
  {
    componentId: '3.1',
    componentName: 'Data Warehouse',
    costComplexity: 'L',
    timeline: '6-12 months',
    costDrivers: ['Snowflake/Databricks consumption', 'Data engineering', 'ETL tools', 'Data modeling'],
    roiModel: 'developerProductivity',
    notes: 'Cloud DW pricing is consumption-based. Start small, scale with usage.'
  },
  {
    componentId: '3.2',
    componentName: 'MDM',
    costComplexity: 'XL',
    timeline: '12-18 months',
    costDrivers: ['Informatica/Profisee license', 'Data governance program', 'Stewardship', 'Integration'],
    roiModel: 'qualityImprovement',
    notes: 'High effort but critical for analytics accuracy and compliance'
  },
  {
    componentId: '3.4',
    componentName: 'BI & Reporting',
    costComplexity: 'S',
    timeline: '3-6 months',
    costDrivers: ['Power BI/Tableau licenses', 'Semantic layer design', 'Report migration', 'Training'],
    roiModel: 'automationProductivity',
    notes: 'Power BI has best TCO for Microsoft shops. Fast ROI through self-service.'
  },

  // Integration Layer (4.x)
  {
    componentId: '4.1',
    componentName: 'Integration Architecture',
    costComplexity: 'XL',
    timeline: '12-18 months',
    costDrivers: ['iPaaS license (MuleSoft, Boomi)', 'Integration development', 'Migration from point-to-point'],
    roiModel: 'developerProductivity',
    notes: 'Replaces spaghetti integrations. 70% faster integration development post-implementation.'
  },
  {
    componentId: '4.2',
    componentName: 'API Management',
    costComplexity: 'M',
    timeline: '3-6 months',
    costDrivers: ['Apigee/Kong license', 'API gateway setup', 'Developer portal', 'Migration'],
    roiModel: 'developerProductivity',
    notes: 'Critical for API-first architecture. Enables partner integrations.'
  },

  // Platform Layer (5.x)
  {
    componentId: '5.1',
    componentName: 'Cloud Platform',
    costComplexity: 'XXL',
    timeline: '18-36 months',
    costDrivers: ['Migration costs', 'Refactoring', 'Training', 'Managed services', 'Consumption costs'],
    roiModel: 'infrastructureSavings',
    notes: 'Phased migration recommended. Typical 30-40% infrastructure cost reduction.'
  },
  {
    componentId: '5.3',
    componentName: 'Container Platform',
    costComplexity: 'L',
    timeline: '6-12 months',
    costDrivers: ['Kubernetes setup (EKS/AKS/GKE)', 'App containerization', 'Training', 'Monitoring'],
    roiModel: 'infrastructureSavings',
    notes: 'Improves resource utilization by 40-60%. Better for new microservices first.'
  },

  // Security Layer (6.x)
  {
    componentId: '6.1',
    componentName: 'Security Architecture',
    costComplexity: 'XL',
    timeline: '12-18 months',
    costDrivers: ['Zero Trust platform', 'Network segmentation', 'Security tools', 'Consulting'],
    roiModel: 'securityRiskAvoidance',
    notes: 'High investment but prevents breaches. Average breach cost: $4.35M (IBM 2023).'
  },
  {
    componentId: '6.2',
    componentName: 'IAM',
    costComplexity: 'M',
    timeline: '3-6 months',
    costDrivers: ['Okta/Azure AD license', 'SSO integration', 'MFA rollout', 'App onboarding'],
    roiModel: 'securityRiskAvoidance',
    notes: 'MFA prevents 99.9% of automated attacks. Fast ROI through reduced help desk tickets.'
  },
  {
    componentId: '6.5',
    componentName: 'SIEM',
    costComplexity: 'L',
    timeline: '6-12 months',
    costDrivers: ['Splunk/Sentinel license', 'Log ingestion costs', 'Use case development', 'SOC setup'],
    roiModel: 'securityRiskAvoidance',
    notes: 'Required for PCI-DSS, HIPAA. Reduces detection time from days to hours.'
  },

  // DevOps Layer (7.x)
  {
    componentId: '7.2',
    componentName: 'CI/CD',
    costComplexity: 'S',
    timeline: '3-6 months',
    costDrivers: ['GitHub Actions/GitLab CI', 'Pipeline development', 'Training', 'Testing tools'],
    roiModel: 'developerProductivity',
    notes: 'Fast ROI - 90% faster deployments, 80% fewer defects typical.'
  },
  {
    componentId: '7.5',
    componentName: 'Monitoring & Observability',
    costComplexity: 'M',
    timeline: '3-6 months',
    costDrivers: ['Datadog/New Relic license', 'Instrumentation', 'Dashboard setup', 'Alerting'],
    roiModel: 'qualityImprovement',
    notes: 'Reduces MTTR by 70-80%. Critical for SLA achievement.'
  }
];

/**
 * BUSINESS CASE GENERATOR
 * Generate financial business case for a recommendation
 */
export interface BusinessCaseInput {
  recommendationTitle: string;
  companySize: CompanySize;
  costComplexity: CostComplexity;
  timeline: TimelineRange;
  roiModelKey: string;
  estimatedAnnualBenefit: number;
}

export interface BusinessCase {
  recommendationTitle: string;
  totalInvestment: string;
  timeline: string;
  year1Benefit: string;
  year2Benefit: string;
  year3Benefit: string;
  cumulativeBenefit: string;
  roi: string;
  paybackPeriod: string;
  npv: string;
  recommendation: 'Approve' | 'Review' | 'Defer';
}

export function generateBusinessCase(input: BusinessCaseInput): BusinessCase {
  const { companySize, costComplexity, estimatedAnnualBenefit, roiModelKey } = input;

  // Get cost range
  const costRange = getCostRange(costComplexity, companySize);

  // Parse average cost from range (e.g., "$100K-$400K" → 250000)
  const avgCost = parseAvgCost(costRange);

  // Calculate benefits over 3 years (with growth)
  const year1 = estimatedAnnualBenefit;
  const year2 = estimatedAnnualBenefit * 1.2; // 20% increase
  const year3 = estimatedAnnualBenefit * 1.4; // 40% increase
  const cumulativeBenefit = year1 + year2 + year3;

  // Calculate NPV (10% discount rate)
  const npv = calculateNPV({
    initialInvestment: avgCost,
    annualBenefits: [year1, year2, year3],
    annualCosts: [avgCost * 0.15, avgCost * 0.15, avgCost * 0.15], // 15% annual maintenance
    discountRate: 0.10
  });

  // Calculate ROI
  const roi = calculateROI(cumulativeBenefit, avgCost);

  // Calculate payback period
  const payback = calculatePaybackPeriod(avgCost, year1);

  // Recommendation based on NPV and payback
  let recommendation: 'Approve' | 'Review' | 'Defer';
  if (npv > 0 && payback < 2) {
    recommendation = 'Approve';
  } else if (npv > 0 && payback < 3) {
    recommendation = 'Review';
  } else {
    recommendation = 'Defer';
  }

  return {
    recommendationTitle: input.recommendationTitle,
    totalInvestment: formatCurrency(avgCost),
    timeline: input.timeline,
    year1Benefit: formatCurrency(year1),
    year2Benefit: formatCurrency(year2),
    year3Benefit: formatCurrency(year3),
    cumulativeBenefit: formatCurrency(cumulativeBenefit),
    roi: `${Math.round(roi)}%`,
    paybackPeriod: `${payback.toFixed(1)} years`,
    npv: formatCurrency(npv),
    recommendation
  };
}

/**
 * UTILITY FUNCTIONS
 */

// Parse average cost from range string
function parseAvgCost(costRange: string): number {
  if (costRange === 'N/A' || costRange === 'Unknown') return 0;

  // Extract numbers from "$100K-$400K" format
  const matches = costRange.match(/\$(\d+(?:\.\d+)?)(K|M)/g);
  if (!matches || matches.length < 2) return 0;

  const parseCurrency = (str: string): number => {
    const num = parseFloat(str.replace(/[$KM]/g, ''));
    const multiplier = str.includes('M') ? 1000000 : 1000;
    return num * multiplier;
  };

  const low = parseCurrency(matches[0]);
  const high = parseCurrency(matches[1]);

  return (low + high) / 2;
}

// Format currency
function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  } else {
    return `$${amount.toFixed(0)}`;
  }
}

/**
 * COST ESTIMATION SUMMARY STATISTICS
 */
export const costEstimateStats = {
  totalComponents: componentCostEstimates.length,
  byComplexity: {
    S: componentCostEstimates.filter(c => c.costComplexity === 'S').length,
    M: componentCostEstimates.filter(c => c.costComplexity === 'M').length,
    L: componentCostEstimates.filter(c => c.costComplexity === 'L').length,
    XL: componentCostEstimates.filter(c => c.costComplexity === 'XL').length,
    XXL: componentCostEstimates.filter(c => c.costComplexity === 'XXL').length,
  },
  roiModelsCount: Object.keys(roiModels).length,
  timelineBandsCount: timelineBands.length
};
