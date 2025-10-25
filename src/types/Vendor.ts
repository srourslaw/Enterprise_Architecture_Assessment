export type CompanyScale = 'SMB' | 'Mid-Market' | 'Enterprise' | 'All';
export type DeploymentPattern = 'Cloud' | 'On-Prem' | 'Hybrid' | 'SaaS';

export interface Vendor {
  name: string;
  product?: string;
  componentIds: string[]; // Which components this vendor relates to
  deploymentPattern: DeploymentPattern;
  scale: CompanyScale; // Target company size
  integrationPatterns: string[];
  pitfalls: string[];
  url?: string;
}
