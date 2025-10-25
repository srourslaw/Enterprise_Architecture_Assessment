import { Gap, calculatePriorityScore, getPriorityBand } from '../types';

/**
 * ENTERPRISE ARCHITECTURE GAP DETECTION RULES
 *
 * Based on TOGAF 10 + ArchiMate 3.2 frameworks
 * Each gap is triggered by specific question answers
 * Priority calculated as: (Risk × Impact) / Cost
 *
 * Gap Categories:
 * - G001-G010: Strategic & Business Layer gaps
 * - G011-G020: Application & Data Layer gaps
 * - G021-G030: Integration & Platform Layer gaps
 * - G031-G041: Security, DevOps & Implementation gaps
 */

// Helper function to create gaps with calculated priority
function createGap(
  id: string,
  description: string,
  layer: number,
  componentId: string,
  risk: number,
  businessImpact: number,
  remediationCost: number,
  recommendation: {
    title: string;
    description: string;
    suggestedVendors: string[];
    timeline: string;
    estimatedCost: string;
    expectedROI: string;
  }
): Gap {
  const priorityScore = calculatePriorityScore(risk, businessImpact, remediationCost);
  const priorityBand = getPriorityBand(priorityScore);

  return {
    id,
    description,
    layer,
    componentId,
    risk,
    businessImpact,
    remediationCost,
    priorityScore,
    priorityBand,
    recommendation
  };
}

/**
 * GAP RULES DATABASE
 * All gaps referenced in questions.ts are defined here
 */
export const gapRules: Gap[] = [
  // ========================================
  // STRATEGIC & BUSINESS LAYER GAPS (G001-G010)
  // ========================================

  createGap(
    'G001',
    'No documented EA strategy or framework',
    0, // Strategy Layer
    '0.1', // EA Framework
    5,
    5,
    2,
    {
      title: 'Establish Enterprise Architecture Framework',
      description: 'Implement TOGAF 10 or Zachman framework with governance model, architecture board, and decision-making processes. This creates alignment between IT and business strategy.',
      suggestedVendors: ['LeanIX', 'Ardoq', 'Bizzdesign', 'Avolution ABACUS'],
      timeline: '3-6 months',
      estimatedCost: '$50K-$150K (consulting + EA tool)',
      expectedROI: '300% over 3 years through reduced tech debt, better decision-making, and avoided duplicate spend'
    }
  ),

  createGap(
    'G002',
    'No technology roadmap or architectural vision',
    0, // Strategy Layer
    '0.2', // Technology Roadmap
    4,
    5,
    2,
    {
      title: 'Develop 3-Year Technology Roadmap',
      description: 'Create a phased transformation roadmap with migration paths from legacy to modern platforms, including cloud strategy, API-first architecture, and modernization priorities.',
      suggestedVendors: ['Gartner Advisory', 'Forrester Consulting', 'McKinsey Digital'],
      timeline: '2-4 months',
      estimatedCost: '$75K-$200K',
      expectedROI: '250% by preventing costly rework and enabling strategic technology investments'
    }
  ),

  createGap(
    'G003',
    'Legacy ERP approaching end-of-life (SAP ECC 2027)',
    2, // Application Layer
    '2.1', // ERP
    5,
    5,
    5,
    {
      title: 'Migrate to SAP S/4HANA or Cloud ERP Alternative',
      description: 'SAP ECC support ends in 2027. Migrate to S/4HANA (cloud or on-prem) or consider alternatives like Oracle Fusion Cloud, Microsoft Dynamics 365, or Workday. Greenfield approach recommended over brownfield conversion.',
      suggestedVendors: ['SAP S/4HANA', 'Oracle Fusion Cloud ERP', 'Microsoft Dynamics 365', 'Workday'],
      timeline: '18-36 months',
      estimatedCost: '$2M-$10M+ (depending on size)',
      expectedROI: '150% over 5 years through process automation, real-time insights, and reduced TCO'
    }
  ),

  createGap(
    'G004',
    'Spreadsheet-based financial planning (no EPM)',
    2, // Application Layer
    '2.5', // EPM
    4,
    4,
    3,
    {
      title: 'Implement Enterprise Performance Management (EPM) Platform',
      description: 'Replace spreadsheets with cloud EPM for budgeting, forecasting, consolidation, and reporting. Enables real-time driver-based planning and scenario modeling.',
      suggestedVendors: ['Anaplan', 'OneStream', 'Oracle EPM Cloud', 'Workday Adaptive Planning', 'IBM Planning Analytics'],
      timeline: '6-12 months',
      estimatedCost: '$200K-$800K',
      expectedROI: '400% through faster close cycles (15 → 5 days), improved forecast accuracy, and reduced FTE effort'
    }
  ),

  createGap(
    'G005',
    'No ERP system - relying on spreadsheets',
    2, // Application Layer
    '2.1', // ERP
    5,
    5,
    4,
    {
      title: 'Implement Modern Cloud ERP',
      description: 'Critical gap - implement cloud-native ERP to establish single source of truth for finance, procurement, HR, and operations. Start with core modules and expand.',
      suggestedVendors: ['NetSuite', 'Microsoft Dynamics 365 Business Central', 'SAP Business ByDesign', 'Acumatica', 'Workday'],
      timeline: '9-18 months',
      estimatedCost: '$500K-$3M',
      expectedROI: '200% through process automation, improved controls, real-time visibility, and scalability'
    }
  ),

  createGap(
    'G006',
    'CRM with >15% duplicate records or no CRM',
    2, // Application Layer
    '2.2', // CRM
    4,
    4,
    3,
    {
      title: 'CRM Data Quality Improvement & Master Data Management',
      description: 'Implement data quality tools, deduplication processes, and MDM governance. If no CRM exists, implement cloud CRM with strong data governance from day one.',
      suggestedVendors: ['Salesforce Data Cloud', 'Microsoft Dynamics 365', 'HubSpot', 'Informatica MDM', 'Reltio'],
      timeline: '4-9 months',
      estimatedCost: '$150K-$600K',
      expectedROI: '350% through improved sales productivity, better customer insights, and reduced marketing waste'
    }
  ),

  // ========================================
  // DATA & ANALYTICS LAYER GAPS (G007-G015)
  // ========================================

  createGap(
    'G007',
    'No data warehouse or data lake',
    3, // Data Layer
    '3.1', // Data Warehouse
    4,
    5,
    4,
    {
      title: 'Implement Modern Cloud Data Platform',
      description: 'Build cloud data warehouse (Snowflake, BigQuery, Redshift) or data lakehouse (Databricks) as central analytics platform. Enables self-service BI and advanced analytics.',
      suggestedVendors: ['Snowflake', 'Databricks', 'Google BigQuery', 'Amazon Redshift', 'Microsoft Synapse'],
      timeline: '6-12 months',
      estimatedCost: '$300K-$1.5M',
      expectedROI: '250% through faster insights, reduced report development time, and data-driven decision making'
    }
  ),

  createGap(
    'G008',
    'No Master Data Management (MDM)',
    3, // Data Layer
    '3.2', // MDM
    4,
    4,
    4,
    {
      title: 'Implement Master Data Management Program',
      description: 'Establish MDM for customer, product, vendor, and location data. Creates single source of truth across all systems with data governance and quality rules.',
      suggestedVendors: ['Informatica MDM', 'SAP Master Data Governance', 'Profisee', 'Semarchy xDM', 'Reltio'],
      timeline: '9-18 months',
      estimatedCost: '$400K-$2M',
      expectedROI: '200% through improved data quality, reduced duplicate spend, better compliance, and analytics accuracy'
    }
  ),

  createGap(
    'G009',
    'Spreadsheet-based reporting (no BI platform)',
    3, // Data Layer
    '3.4', // BI & Reporting
    3,
    4,
    2,
    {
      title: 'Implement Self-Service BI Platform',
      description: 'Deploy cloud BI tool (Power BI, Tableau, Looker) with semantic layer, governed data models, and self-service capabilities. Reduces report backlog and empowers business users.',
      suggestedVendors: ['Microsoft Power BI', 'Tableau', 'Looker', 'Qlik Sense', 'Thoughtspot'],
      timeline: '3-6 months',
      estimatedCost: '$100K-$400K',
      expectedROI: '400% through reduced IT report development time (80% reduction), faster insights, and improved decision quality'
    }
  ),

  createGap(
    'G010',
    'No data governance or data quality program',
    3, // Data Layer
    '3.3', // Data Governance
    4,
    4,
    3,
    {
      title: 'Establish Data Governance Framework',
      description: 'Implement data governance program with data stewards, quality KPIs, lineage tracking, and metadata management. Critical for compliance (GDPR, CCPA) and analytics trust.',
      suggestedVendors: ['Collibra', 'Alation', 'Informatica Axon', 'Microsoft Purview', 'Atlan'],
      timeline: '6-12 months',
      estimatedCost: '$200K-$800K',
      expectedROI: '300% through reduced compliance risk, improved analytics accuracy, and faster data discovery'
    }
  ),

  createGap(
    'G011',
    'No predictive analytics or AI/ML capabilities',
    3, // Data Layer
    '3.5', // Advanced Analytics
    3,
    4,
    3,
    {
      title: 'Build AI/ML Analytics Platform',
      description: 'Implement ML platform (Databricks, AWS SageMaker, Azure ML) for predictive models, demand forecasting, customer churn, and process optimization. Start with high-value use cases.',
      suggestedVendors: ['Databricks', 'AWS SageMaker', 'Azure Machine Learning', 'Google Vertex AI', 'DataRobot'],
      timeline: '6-12 months',
      estimatedCost: '$300K-$1.2M',
      expectedROI: '250% through improved forecast accuracy (+20-30%), optimized pricing, and proactive issue detection'
    }
  ),

  createGap(
    'G012',
    'No real-time analytics or streaming data',
    3, // Data Layer
    '3.6', // Streaming Analytics
    3,
    3,
    3,
    {
      title: 'Implement Real-Time Data Streaming Platform',
      description: 'Deploy event streaming platform (Kafka, Kinesis, Pub/Sub) for real-time analytics, fraud detection, and operational dashboards. Enables sub-second decision-making.',
      suggestedVendors: ['Confluent (Kafka)', 'AWS Kinesis', 'Google Pub/Sub', 'Azure Event Hubs', 'Databricks Delta Live Tables'],
      timeline: '4-8 months',
      estimatedCost: '$200K-$700K',
      expectedROI: '200% through real-time fraud prevention, dynamic pricing, and operational efficiency'
    }
  ),

  // ========================================
  // INTEGRATION LAYER GAPS (G013-G020)
  // ========================================

  createGap(
    'G013',
    'Point-to-point integrations (spaghetti)',
    4, // Integration Layer
    '4.1', // Integration Architecture
    5,
    4,
    4,
    {
      title: 'Implement Enterprise Integration Platform (iPaaS)',
      description: 'Replace point-to-point integrations with centralized integration platform (MuleSoft, Boomi, Workato). Reduces complexity from N×(N-1) to 2N connections.',
      suggestedVendors: ['MuleSoft Anypoint', 'Boomi', 'Workato', 'Informatica IICS', 'Snaplogic'],
      timeline: '9-18 months',
      estimatedCost: '$400K-$2M',
      expectedROI: '300% through 70% faster integration development, reduced maintenance cost, and improved reliability'
    }
  ),

  createGap(
    'G014',
    'No API management or API gateway',
    4, // Integration Layer
    '4.2', // API Management
    4,
    4,
    3,
    {
      title: 'Deploy API Management Platform',
      description: 'Implement API gateway for authentication, rate limiting, versioning, and analytics. Enables API-first architecture and secure partner/mobile integrations.',
      suggestedVendors: ['Apigee', 'Kong', 'AWS API Gateway', 'Azure API Management', 'MuleSoft Anypoint'],
      timeline: '3-6 months',
      estimatedCost: '$150K-$600K',
      expectedROI: '250% through faster partner onboarding, improved security, and reduced integration time (50%)'
    }
  ),

  createGap(
    'G015',
    'Batch-only integration (no real-time)',
    4, // Integration Layer
    '4.3', // Real-time Integration
    3,
    4,
    3,
    {
      title: 'Enable Real-Time Integration Capabilities',
      description: 'Implement event-driven architecture with API-based real-time integrations and webhooks. Critical for customer experience, inventory accuracy, and fraud prevention.',
      suggestedVendors: ['MuleSoft', 'Confluent Platform', 'AWS EventBridge', 'Azure Logic Apps', 'Workato'],
      timeline: '4-8 months',
      estimatedCost: '$200K-$800K',
      expectedROI: '200% through improved customer experience, reduced stockouts, and real-time decision-making'
    }
  ),

  createGap(
    'G016',
    'No ETL/ELT tool or pipeline automation',
    4, // Integration Layer
    '4.4', // ETL/ELT
    4,
    4,
    3,
    {
      title: 'Implement Modern Data Integration Platform',
      description: 'Deploy cloud ETL/ELT platform (Fivetran, Matillion, Talend Cloud) for automated data pipelines with monitoring, error handling, and lineage tracking.',
      suggestedVendors: ['Fivetran', 'Matillion', 'Talend Cloud', 'AWS Glue', 'Azure Data Factory', 'Informatica IICS'],
      timeline: '3-6 months',
      estimatedCost: '$150K-$500K',
      expectedROI: '350% through 80% faster pipeline development, reduced errors, and self-service data access'
    }
  ),

  createGap(
    'G017',
    'No ESB or event-driven architecture',
    4, // Integration Layer
    '4.5', // ESB
    3,
    3,
    3,
    {
      title: 'Implement Event-Driven Architecture',
      description: 'Deploy modern event bus (Kafka, AWS EventBridge, Azure Event Grid) for decoupled, scalable, real-time integrations. Replaces legacy ESB with cloud-native approach.',
      suggestedVendors: ['Confluent', 'AWS EventBridge', 'Azure Event Grid', 'Google Pub/Sub', 'Solace'],
      timeline: '6-12 months',
      estimatedCost: '$300K-$1M',
      expectedROI: '200% through improved system resilience, faster feature delivery, and real-time capabilities'
    }
  ),

  // ========================================
  // PLATFORM & INFRASTRUCTURE GAPS (G018-G025)
  // ========================================

  createGap(
    'G018',
    'No cloud strategy or still 100% on-premises',
    5, // Platform Layer
    '5.1', // Cloud Platform
    4,
    5,
    4,
    {
      title: 'Develop Cloud Migration Strategy',
      description: 'Create phased cloud migration plan starting with non-critical workloads. Recommend hybrid approach with mission-critical apps on cloud IaaS/PaaS and SaaS for standard functions.',
      suggestedVendors: ['AWS', 'Microsoft Azure', 'Google Cloud Platform', 'Oracle Cloud'],
      timeline: '12-36 months (phased)',
      estimatedCost: '$500K-$5M+ (depends on scope)',
      expectedROI: '150% through reduced infrastructure costs (30-40%), improved agility, and faster time-to-market'
    }
  ),

  createGap(
    'G019',
    'No containerization or Kubernetes',
    5, // Platform Layer
    '5.3', // Container Platform
    3,
    3,
    3,
    {
      title: 'Implement Container Platform',
      description: 'Deploy Kubernetes (EKS, AKS, GKE) for container orchestration. Enables portability, auto-scaling, and efficient resource utilization. Start with new microservices.',
      suggestedVendors: ['AWS EKS', 'Azure AKS', 'Google GKE', 'Red Hat OpenShift', 'Rancher'],
      timeline: '6-12 months',
      estimatedCost: '$200K-$800K',
      expectedROI: '200% through improved resource utilization (40-60%), faster deployments, and reduced infrastructure costs'
    }
  ),

  createGap(
    'G020',
    'No infrastructure as code (IaC)',
    5, // Platform Layer
    '5.4', // IaC
    3,
    3,
    2,
    {
      title: 'Implement Infrastructure as Code (IaC)',
      description: 'Adopt Terraform or CloudFormation for infrastructure automation. Enables version control, repeatability, disaster recovery, and compliance-as-code.',
      suggestedVendors: ['Terraform', 'AWS CloudFormation', 'Azure Bicep', 'Pulumi', 'Ansible'],
      timeline: '3-6 months',
      estimatedCost: '$100K-$400K',
      expectedROI: '300% through 80% faster environment provisioning, reduced errors, and improved compliance'
    }
  ),

  // ========================================
  // SECURITY & COMPLIANCE GAPS (G021-G030)
  // ========================================

  createGap(
    'G021',
    'No Zero Trust architecture',
    6, // Security Layer
    '6.1', // Security Architecture
    5,
    5,
    4,
    {
      title: 'Implement Zero Trust Security Model',
      description: 'Move from perimeter-based security to Zero Trust with identity-based access, micro-segmentation, and continuous verification. Critical for cloud and remote work.',
      suggestedVendors: ['Okta', 'Microsoft Entra (Azure AD)', 'Zscaler', 'Palo Alto Prisma', 'CrowdStrike'],
      timeline: '12-24 months',
      estimatedCost: '$500K-$2M',
      expectedROI: '250% through reduced breach risk (60-70%), improved compliance, and secure remote access'
    }
  ),

  createGap(
    'G022',
    'No SSO or federated identity',
    6, // Security Layer
    '6.2', // IAM
    4,
    4,
    2,
    {
      title: 'Implement Single Sign-On (SSO) & Identity Federation',
      description: 'Deploy SSO (Okta, Azure AD, Ping) for centralized authentication across all apps. Improves security, reduces password fatigue, and enables faster onboarding/offboarding.',
      suggestedVendors: ['Okta', 'Microsoft Entra ID', 'Ping Identity', 'Auth0', 'OneLogin'],
      timeline: '3-6 months',
      estimatedCost: '$100K-$400K',
      expectedROI: '400% through reduced help desk tickets (40%), improved security, and faster user provisioning'
    }
  ),

  createGap(
    'G023',
    'No privileged access management (PAM)',
    6, // Security Layer
    '6.3', // PAM
    5,
    4,
    3,
    {
      title: 'Implement Privileged Access Management',
      description: 'Deploy PAM solution for securing admin accounts, session recording, and just-in-time access. Critical for SOX, PCI-DSS compliance and preventing insider threats.',
      suggestedVendors: ['CyberArk', 'BeyondTrust', 'Delinea (Thycotic)', 'HashiCorp Vault', 'AWS Secrets Manager'],
      timeline: '4-8 months',
      estimatedCost: '$200K-$800K',
      expectedROI: '250% through reduced breach risk from compromised admin accounts (80% of breaches) and compliance'
    }
  ),

  createGap(
    'G024',
    'No multi-factor authentication (MFA)',
    6, // Security Layer
    '6.2', // IAM
    5,
    5,
    2,
    {
      title: 'Deploy Multi-Factor Authentication (MFA)',
      description: 'Critical security gap - implement MFA across all systems, starting with email, VPN, and admin access. Prevents 99.9% of automated attacks.',
      suggestedVendors: ['Duo Security', 'Okta', 'Microsoft Authenticator', 'Google Authenticator', 'RSA SecurID'],
      timeline: '2-4 months',
      estimatedCost: '$50K-$200K',
      expectedROI: '500%+ through prevented breaches - average breach cost is $4.35M vs. $50K-$200K MFA investment'
    }
  ),

  createGap(
    'G025',
    'No SIEM or security monitoring',
    6, // Security Layer
    '6.5', // SIEM
    5,
    4,
    4,
    {
      title: 'Implement Security Information & Event Management (SIEM)',
      description: 'Deploy SIEM for centralized log collection, threat detection, and security analytics. Critical for compliance (PCI-DSS, HIPAA) and detecting advanced threats.',
      suggestedVendors: ['Splunk', 'Microsoft Sentinel', 'Palo Alto Cortex', 'IBM QRadar', 'Sumo Logic'],
      timeline: '6-12 months',
      estimatedCost: '$300K-$1.5M',
      expectedROI: '200% through faster threat detection (hours vs. days), compliance automation, and reduced breach impact'
    }
  ),

  createGap(
    'G026',
    'No DLP or data encryption strategy',
    6, // Security Layer
    '6.6', // DLP
    4,
    4,
    3,
    {
      title: 'Implement Data Loss Prevention (DLP) & Encryption',
      description: 'Deploy DLP solution to prevent sensitive data exfiltration via email, USB, cloud apps. Combine with encryption at rest and in transit for GDPR/CCPA compliance.',
      suggestedVendors: ['Microsoft Purview DLP', 'Symantec DLP', 'Forcepoint DLP', 'Digital Guardian', 'Proofpoint'],
      timeline: '4-8 months',
      estimatedCost: '$200K-$800K',
      expectedROI: '250% through prevented data breaches, compliance fines avoided, and intellectual property protection'
    }
  ),

  createGap(
    'G027',
    'No vulnerability management program',
    6, // Security Layer
    '6.7', // Vulnerability Management
    4,
    4,
    2,
    {
      title: 'Implement Vulnerability Management Program',
      description: 'Deploy vulnerability scanning (Tenable, Qualys) with automated patch management. Reduces attack surface and ensures compliance with PCI-DSS, NIST frameworks.',
      suggestedVendors: ['Tenable.io', 'Qualys', 'Rapid7', 'CrowdStrike Spotlight', 'Microsoft Defender'],
      timeline: '3-6 months',
      estimatedCost: '$100K-$400K',
      expectedROI: '300% through reduced breach risk (80% of breaches exploit known vulnerabilities) and compliance'
    }
  ),

  // ========================================
  // DEVOPS & DELIVERY GAPS (G028-G035)
  // ========================================

  createGap(
    'G028',
    'No CI/CD pipeline',
    7, // DevOps Layer
    '7.2', // CI/CD
    4,
    4,
    2,
    {
      title: 'Implement CI/CD Pipeline',
      description: 'Deploy automated CI/CD (GitHub Actions, GitLab CI, Jenkins) for code testing, security scanning, and deployment automation. Reduces deployment time from days to minutes.',
      suggestedVendors: ['GitHub Actions', 'GitLab CI', 'CircleCI', 'Jenkins', 'Azure DevOps Pipelines'],
      timeline: '3-6 months',
      estimatedCost: '$100K-$400K',
      expectedROI: '400% through 90% faster deployments, 80% fewer production defects, and improved developer productivity'
    }
  ),

  createGap(
    'G029',
    'Manual deployments (no automation)',
    7, // DevOps Layer
    '7.3', // Deployment Automation
    4,
    3,
    2,
    {
      title: 'Automate Deployment Process',
      description: 'Implement deployment automation with blue/green or canary deployments, automated rollback, and infrastructure as code. Eliminates manual errors and downtime.',
      suggestedVendors: ['Terraform', 'Ansible', 'Octopus Deploy', 'Spinnaker', 'AWS CodeDeploy'],
      timeline: '4-8 months',
      estimatedCost: '$150K-$500K',
      expectedROI: '300% through 95% reduction in deployment failures, zero-downtime deployments, and faster rollback'
    }
  ),

  createGap(
    'G030',
    'No automated testing or test coverage <50%',
    7, // DevOps Layer
    '7.4', // Testing Automation
    3,
    4,
    2,
    {
      title: 'Implement Test Automation Framework',
      description: 'Build automated testing pyramid (unit, integration, E2E) with test coverage monitoring. Target 80% code coverage for critical paths. Reduces regression testing from weeks to hours.',
      suggestedVendors: ['Selenium', 'Cypress', 'Playwright', 'JUnit/TestNG', 'Postman', 'SonarQube'],
      timeline: '4-8 months',
      estimatedCost: '$150K-$600K',
      expectedROI: '350% through 90% faster testing cycles, 70% fewer production defects, and improved release confidence'
    }
  ),

  createGap(
    'G031',
    'No monitoring or observability platform',
    7, // DevOps Layer
    '7.5', // Monitoring
    4,
    4,
    3,
    {
      title: 'Implement Full-Stack Observability Platform',
      description: 'Deploy observability solution (Datadog, New Relic, Dynatrace) for metrics, logs, traces, and APM. Enables proactive issue detection and <5 minute MTTR.',
      suggestedVendors: ['Datadog', 'New Relic', 'Dynatrace', 'Splunk', 'Grafana + Prometheus'],
      timeline: '3-6 months',
      estimatedCost: '$150K-$600K',
      expectedROI: '300% through 80% faster incident resolution, reduced downtime (99.9% → 99.99%), and improved customer experience'
    }
  ),

  createGap(
    'G032',
    'No incident management or on-call rotation',
    7, // DevOps Layer
    '7.6', // Incident Management
    3,
    4,
    2,
    {
      title: 'Implement Incident Management Framework',
      description: 'Deploy incident management platform (PagerDuty, Opsgenie) with on-call rotations, escalation policies, and post-incident reviews. Reduces MTTR by 70%.',
      suggestedVendors: ['PagerDuty', 'Opsgenie', 'VictorOps', 'ServiceNow ITSM', 'Jira Service Management'],
      timeline: '2-4 months',
      estimatedCost: '$50K-$200K',
      expectedROI: '400% through faster incident response (60 min → 15 min MTTR), reduced downtime, and improved SLAs'
    }
  ),

  // ========================================
  // UX & IMPLEMENTATION GAPS (G033-G041)
  // ========================================

  createGap(
    'G033',
    'No mobile apps or mobile-first strategy',
    8, // UX Layer
    '8.3', // Mobile Apps
    3,
    4,
    3,
    {
      title: 'Develop Mobile-First Strategy',
      description: 'Build native or React Native/Flutter mobile apps for key customer/employee workflows. Mobile commerce grows 25% YoY - critical for customer engagement.',
      suggestedVendors: ['React Native', 'Flutter', 'Ionic', 'Native iOS/Android', 'Progressive Web Apps'],
      timeline: '6-12 months',
      estimatedCost: '$200K-$1M',
      expectedROI: '250% through increased customer engagement (+40%), mobile revenue growth, and competitive advantage'
    }
  ),

  createGap(
    'G034',
    'No API documentation or developer portal',
    4, // Integration Layer
    '4.2', // API Management
    2,
    3,
    2,
    {
      title: 'Build API Developer Portal',
      description: 'Create self-service API portal with interactive documentation (OpenAPI/Swagger), sandbox environment, and API keys. Accelerates partner onboarding from weeks to hours.',
      suggestedVendors: ['Stoplight', 'ReadMe.io', 'SwaggerHub', 'Postman', 'Apigee Portal'],
      timeline: '2-4 months',
      estimatedCost: '$50K-$200K',
      expectedROI: '300% through 90% faster partner onboarding, reduced support tickets, and increased API adoption'
    }
  ),

  createGap(
    'G035',
    'No design system or UI component library',
    8, // UX Layer
    '8.1', // Design System
    2,
    3,
    2,
    {
      title: 'Build Design System & Component Library',
      description: 'Create centralized design system (Figma + Storybook) with reusable components, design tokens, and accessibility guidelines. Accelerates UI development by 60%.',
      suggestedVendors: ['Figma', 'Storybook', 'Material-UI', 'Ant Design', 'Chakra UI'],
      timeline: '4-8 months',
      estimatedCost: '$150K-$500K',
      expectedROI: '250% through 60% faster UI development, consistent brand, and reduced design debt'
    }
  ),

  createGap(
    'G036',
    'Agile maturity <3 or still waterfall',
    9, // Implementation Layer
    '9.1', // SDLC
    3,
    3,
    2,
    {
      title: 'Agile Transformation Program',
      description: 'Transition from waterfall to agile/SAFe with cross-functional teams, 2-week sprints, and continuous delivery. Improves time-to-market by 50%.',
      suggestedVendors: ['Scaled Agile (SAFe)', 'Scrum.org', 'Atlassian Jira/Confluence', 'Azure DevOps', 'Version One'],
      timeline: '6-12 months',
      estimatedCost: '$200K-$800K',
      expectedROI: '200% through 50% faster feature delivery, improved quality, and better stakeholder satisfaction'
    }
  ),

  createGap(
    'G037',
    'No change management or communication plan',
    9, // Implementation Layer
    '9.2', // Change Management
    3,
    4,
    2,
    {
      title: 'Establish Change Management Framework',
      description: 'Implement structured change management (Prosci ADKAR, Kotter) with stakeholder engagement, training programs, and adoption metrics. Increases project success rate from 35% to 75%.',
      suggestedVendors: ['Prosci', 'Kotter Consulting', 'McKinsey Change Management', 'WalkMe', 'Pendo'],
      timeline: '3-6 months',
      estimatedCost: '$100K-$400K',
      expectedROI: '300% through 2x higher adoption rates, reduced resistance, and faster ROI realization'
    }
  ),

  createGap(
    'G038',
    'No technical debt management or refactoring plan',
    9, // Implementation Layer
    '9.4', // Technical Debt
    4,
    3,
    3,
    {
      title: 'Technical Debt Reduction Program',
      description: 'Establish tech debt tracking with SonarQube, allocate 20% sprint capacity for refactoring, and create modernization roadmap. Prevents compound interest on tech debt.',
      suggestedVendors: ['SonarQube', 'CodeScene', 'NDepend', 'Structure101', 'Understand'],
      timeline: 'Ongoing (6-18 month roadmap)',
      estimatedCost: '$200K-$800K',
      expectedROI: '200% through 40% faster feature development, reduced bugs (-50%), and improved maintainability'
    }
  ),

  createGap(
    'G039',
    'No disaster recovery or business continuity plan',
    5, // Platform Layer
    '5.6', // Disaster Recovery
    5,
    5,
    4,
    {
      title: 'Implement Disaster Recovery & Business Continuity',
      description: 'Build DR plan with RTO <4 hours, RPO <1 hour. Implement multi-region cloud deployment, automated backups, and annual DR testing. Critical for business resilience.',
      suggestedVendors: ['AWS Backup', 'Azure Site Recovery', 'Veeam', 'Zerto', 'Druva'],
      timeline: '6-12 months',
      estimatedCost: '$300K-$1.5M',
      expectedROI: '250% through business continuity assurance - average downtime cost is $300K/hour vs. DR investment'
    }
  ),

  createGap(
    'G040',
    'No cost optimization or FinOps practice',
    5, // Platform Layer
    '5.7', // Cost Management
    3,
    3,
    2,
    {
      title: 'Implement FinOps & Cloud Cost Optimization',
      description: 'Deploy cloud cost management platform (CloudHealth, Kubecost) with automated rightsizing, reserved instances, and showback/chargeback. Typical 30% savings.',
      suggestedVendors: ['CloudHealth', 'Kubecost', 'Spot.io', 'AWS Cost Explorer', 'Azure Cost Management'],
      timeline: '3-6 months',
      estimatedCost: '$100K-$400K',
      expectedROI: '400%+ through 30-40% cloud cost reduction - typical $1M cloud spend → $300K-$400K annual savings'
    }
  ),

  createGap(
    'G041',
    'No API versioning or backward compatibility strategy',
    4, // Integration Layer
    '4.2', // API Management
    3,
    3,
    2,
    {
      title: 'Implement API Versioning & Lifecycle Management',
      description: 'Establish API versioning standards (semantic versioning), deprecation policies, and backward compatibility testing. Prevents breaking changes that disrupt partners/apps.',
      suggestedVendors: ['Apigee', 'Kong', 'AWS API Gateway', 'Postman', 'SwaggerHub'],
      timeline: '2-4 months',
      estimatedCost: '$75K-$250K',
      expectedROI: '250% through reduced integration breakages (90% reduction), improved partner satisfaction, and faster API evolution'
    }
  ),
];

/**
 * UTILITY FUNCTIONS
 */

// Get gap by ID
export function getGapById(gapId: string): Gap | undefined {
  return gapRules.find(gap => gap.id === gapId);
}

// Get all gaps for a specific layer
export function getGapsByLayer(layerId: number): Gap[] {
  return gapRules.filter(gap => gap.layer === layerId);
}

// Get all gaps for a specific component
export function getGapsByComponent(componentId: string): Gap[] {
  return gapRules.filter(gap => gap.componentId === componentId);
}

// Get gaps by priority band
export function getGapsByPriority(priorityBand: 'Critical' | 'High' | 'Medium' | 'Low'): Gap[] {
  return gapRules.filter(gap => gap.priorityBand === priorityBand);
}

// Get top N gaps by priority score
export function getTopGaps(count: number = 10): Gap[] {
  return [...gapRules]
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, count);
}

/**
 * GAP STATISTICS
 */
export const gapStats = {
  total: gapRules.length,
  byPriority: {
    critical: gapRules.filter(g => g.priorityBand === 'Critical').length,
    high: gapRules.filter(g => g.priorityBand === 'High').length,
    medium: gapRules.filter(g => g.priorityBand === 'Medium').length,
    low: gapRules.filter(g => g.priorityBand === 'Low').length,
  },
  byLayer: {
    strategy: gapRules.filter(g => g.layer === 0).length,
    business: gapRules.filter(g => g.layer === 1).length,
    application: gapRules.filter(g => g.layer === 2).length,
    data: gapRules.filter(g => g.layer === 3).length,
    integration: gapRules.filter(g => g.layer === 4).length,
    platform: gapRules.filter(g => g.layer === 5).length,
    security: gapRules.filter(g => g.layer === 6).length,
    devops: gapRules.filter(g => g.layer === 7).length,
    ux: gapRules.filter(g => g.layer === 8).length,
    implementation: gapRules.filter(g => g.layer === 9).length,
  }
};
