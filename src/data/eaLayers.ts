import { EALayer } from '../types';

/**
 * Complete Enterprise Architecture Map - 10 Layers
 * Based on TOGAF 10 + ArchiMate 3.2 + Best Practices
 * Source: Complete Enterprise Architecture Consultancy Pack
 */

export const eaLayers: EALayer[] = [
  // ============================================================================
  // LAYER 0: STRATEGY & MOTIVATION
  // ============================================================================
  {
    id: 0,
    name: 'Strategy & Motivation',
    description: 'Why we do what we do; strategic goals, regulatory drivers, value streams',
    icon: 'Target',
    components: [
      {
        id: '0.1',
        name: 'Business Strategy & Goals',
        description: 'Define strategic objectives, growth targets, competitive positioning',
        vendors: [], // Will be populated from vendors.ts
        relatedQuestions: ['Q2.1', 'Q2.3'],
        maturityIndicators: {
          1: 'No documented strategy',
          2: 'Strategy documented but not communicated',
          3: 'Strategy documented and communicated quarterly',
          4: 'Strategy actively managed with KPIs',
          5: 'Strategy drives all IT investments, real-time dashboard'
        },
        typicalPitfalls: [
          'No documented strategy',
          'Strategy not aligned with IT',
          'No KPI tracking'
        ]
      },
      {
        id: '0.2',
        name: 'Stakeholder Requirements',
        description: 'Capture needs from customers, regulators, shareholders, employees',
        vendors: [],
        relatedQuestions: ['Q2.1'],
        maturityIndicators: {
          1: 'No stakeholder mapping',
          2: 'Basic stakeholder list exists',
          3: 'Stakeholder requirements documented',
          4: 'Regular stakeholder engagement',
          5: 'Stakeholder feedback drives continuous improvement'
        },
        typicalPitfalls: [
          'Requirements not prioritized',
          'Stakeholder map missing',
          'No regular engagement'
        ]
      },
      {
        id: '0.3',
        name: 'Drivers & Constraints',
        description: 'Regulatory mandates, market forces, budget limits, technical debt',
        vendors: [],
        relatedQuestions: ['Q2.2', 'Q2.4'],
        maturityIndicators: {
          1: 'Reactive compliance only',
          2: 'Basic regulatory tracking',
          3: 'Compliance roadmap exists',
          4: 'Proactive regulatory monitoring',
          5: 'Integrated GRC platform with continuous compliance'
        },
        typicalPitfalls: [
          'Reactive compliance',
          'No regulatory roadmap',
          'Budget constraints not documented'
        ]
      },
      {
        id: '0.4',
        name: 'Value Streams',
        description: 'End-to-end flows that deliver customer/stakeholder value',
        vendors: [],
        relatedQuestions: ['Q2.1'],
        maturityIndicators: {
          1: 'Value streams not identified',
          2: 'High-level value streams documented',
          3: 'Value streams mapped with pain points',
          4: 'Value stream metrics tracked',
          5: 'Value stream optimization continuous'
        },
        typicalPitfalls: [
          'Value streams not mapped',
          'Handoff delays not measured',
          'No end-to-end ownership'
        ]
      },
      {
        id: '0.5',
        name: 'Architecture Principles',
        description: 'Guiding rules (Cloud First, API First, Security by Design, Buy Before Build)',
        vendors: [],
        relatedQuestions: ['Q2.3'],
        maturityIndicators: {
          1: 'No principles defined',
          2: 'Principles documented but not followed',
          3: 'Principles enforced on major projects',
          4: 'Principles enforced with governance',
          5: 'Principles embedded in all decisions, automated checks'
        },
        typicalPitfalls: [
          'Principles exist but not enforced',
          'Exceptions granted too easily',
          'No architecture review board'
        ]
      },
      {
        id: '0.6',
        name: 'Risk Assessment',
        description: 'Strategic risks and mitigations',
        vendors: [],
        relatedQuestions: ['Q2.2', 'Q7.6'],
        maturityIndicators: {
          1: 'No enterprise risk register',
          2: 'Basic risk list maintained',
          3: 'Risk register with mitigation plans',
          4: 'Risks actively monitored and reported',
          5: 'Integrated risk management with real-time monitoring'
        },
        typicalPitfalls: [
          'No enterprise risk register',
          'Risks not quantified',
          'No mitigation tracking'
        ]
      },
      {
        id: '0.7',
        name: 'Innovation Roadmap',
        description: 'Future-oriented initiatives (AI/ML, IoT, blockchain)',
        vendors: [],
        relatedQuestions: ['Q2.1', 'Q2.4'],
        maturityIndicators: {
          1: 'No innovation initiatives',
          2: 'Ad-hoc innovation projects',
          3: 'Innovation roadmap exists',
          4: 'Systematic innovation with budget allocation',
          5: 'Innovation culture with continuous experimentation'
        },
        typicalPitfalls: [
          'Innovation ad-hoc, no systematic approach',
          'No innovation budget',
          'Pilot projects never scale'
        ]
      },
      {
        id: '0.8',
        name: 'Sustainability Goals (ESG)',
        description: 'Environmental, social, governance considerations',
        vendors: [],
        relatedQuestions: ['Q2.1', 'Q2.2'],
        maturityIndicators: {
          1: 'No ESG tracking',
          2: 'Basic ESG awareness',
          3: 'ESG goals defined',
          4: 'ESG metrics tracked and reported',
          5: 'ESG integrated into all strategic decisions'
        },
        typicalPitfalls: [
          'No carbon tracking',
          'No ESG reporting',
          'Green washing without metrics'
        ]
      },
      {
        id: '0.9',
        name: 'Standards & Roadmaps',
        description: 'Prescribed technologies and future state plans',
        vendors: [],
        relatedQuestions: ['Q2.3', 'Q3.4'],
        maturityIndicators: {
          1: 'No technology standards',
          2: 'Informal standards, not enforced',
          3: 'Standards documented and communicated',
          4: 'Standards enforced with exceptions process',
          5: 'Standards automated with continuous compliance checking'
        },
        typicalPitfalls: [
          'No standards enforcement',
          'Shadow IT prevalent',
          'Technology sprawl'
        ]
      },
      {
        id: '0.10',
        name: 'Portfolio Management',
        description: 'Prioritizing initiatives, resource allocation',
        vendors: [],
        relatedQuestions: ['Q2.1', 'Q2.3'],
        maturityIndicators: {
          1: 'No portfolio visibility',
          2: 'Project list maintained manually',
          3: 'Portfolio tracked with dependencies',
          4: 'Portfolio management tool with benefits tracking',
          5: 'Portfolio optimization with real-time resource allocation'
        },
        typicalPitfalls: [
          'Projects not linked to strategy',
          'No benefits tracking',
          'Resource conflicts not visible'
        ]
      }
    ]
  },

  // ============================================================================
  // LAYER 1: BUSINESS ARCHITECTURE
  // ============================================================================
  {
    id: 1,
    name: 'Business Architecture',
    description: 'What the business does; capabilities, processes, org structure',
    icon: 'Building2',
    components: [
      {
        id: '1.1',
        name: 'Business Capabilities',
        description: 'What the business does (Finance, HR, Sales, Operations)',
        vendors: [],
        relatedQuestions: ['Q1.3'],
        maturityIndicators: {
          1: 'No capability model',
          2: 'Basic capability list',
          3: 'Capability map with heat mapping',
          4: 'Capabilities linked to applications and processes',
          5: 'Dynamic capability management with continuous assessment'
        },
        typicalPitfalls: [
          'Capabilities not mapped to applications',
          'Redundant capabilities',
          'No capability ownership'
        ]
      },
      {
        id: '1.2',
        name: 'Business Processes (BPMN)',
        description: 'How work gets done (Order-to-Cash, Procure-to-Pay, Hire-to-Retire)',
        vendors: [],
        relatedQuestions: ['Q9.2'],
        maturityIndicators: {
          1: 'No process documentation',
          2: 'Basic process maps (outdated)',
          3: 'Current process documentation with ownership',
          4: 'Process automation and monitoring',
          5: 'Continuous process mining and optimization'
        },
        typicalPitfalls: [
          'Process documentation outdated (>2 years)',
          'No process owners',
          'Processes not linked to systems'
        ]
      },
      {
        id: '1.3',
        name: 'Organisational Structure',
        description: 'Divisions, departments, roles, reporting lines',
        vendors: [],
        relatedQuestions: ['Q1.2'],
        maturityIndicators: {
          1: 'Org chart out of date',
          2: 'Basic org chart maintained',
          3: 'Org structure documented with role definitions',
          4: 'Org structure integrated with HRIS and IAM',
          5: 'Dynamic org modeling with scenario planning'
        },
        typicalPitfalls: [
          'Org structure in IAM doesn\'t match HRIS',
          'Orphaned accounts after restructures',
          'No clear ownership model'
        ]
      },
      {
        id: '1.4',
        name: 'Products & Services',
        description: 'What the business sells or delivers',
        vendors: [],
        relatedQuestions: ['Q1.3'],
        maturityIndicators: {
          1: 'Product data in spreadsheets',
          2: 'Basic product catalog',
          3: 'Product master data managed',
          4: 'Product information management (PIM) system',
          5: 'Real-time product catalog with AI-powered recommendations'
        },
        typicalPitfalls: [
          'Product master data duplicated across systems',
          'No single source of truth',
          'Product launches delayed by data issues'
        ]
      },
      {
        id: '1.5',
        name: 'Information Concepts (Business Data)',
        description: 'Business entities (Customer, Order, Asset) before technical implementation',
        vendors: [],
        relatedQuestions: ['Q4.2'],
        maturityIndicators: {
          1: 'No business glossary',
          2: 'Informal data definitions',
          3: 'Business glossary documented',
          4: 'Business glossary integrated with data catalog',
          5: 'Semantic layer with automated business term mapping'
        },
        typicalPitfalls: [
          'No business glossary',
          'IT and business use different terms',
          'Data definitions inconsistent'
        ]
      },
      {
        id: '1.6',
        name: 'Business Events & Policies',
        description: 'Triggers and rules that govern business decisions',
        vendors: [],
        relatedQuestions: ['Q2.2'],
        maturityIndicators: {
          1: 'Business rules hardcoded',
          2: 'Rules documented in Word/Excel',
          3: 'Rules engine for critical decisions',
          4: 'Comprehensive business rules management',
          5: 'AI-augmented decision making with continuous learning'
        },
        typicalPitfalls: [
          'Business rules hardcoded in applications',
          'Rules change requires development',
          'Inconsistent rule application'
        ]
      },
      {
        id: '1.7',
        name: 'Customer Journeys & Personas',
        description: 'Experience mapping from awareness to post-purchase',
        vendors: [],
        relatedQuestions: ['Q2.1'],
        maturityIndicators: {
          1: 'No journey mapping',
          2: 'Basic customer personas',
          3: 'Customer journeys mapped',
          4: 'Journey analytics with pain point identification',
          5: 'Real-time journey orchestration and optimization'
        },
        typicalPitfalls: [
          'Journeys not mapped',
          'No voice of customer program',
          'Journey maps not linked to systems'
        ]
      },
      {
        id: '1.8',
        name: 'Performance Metrics (KPIs)',
        description: 'Measure business performance',
        vendors: [],
        relatedQuestions: ['Q2.1', 'Q4.3'],
        maturityIndicators: {
          1: 'No defined KPIs',
          2: 'Basic KPIs tracked manually in Excel',
          3: 'KPIs tracked in BI tool',
          4: 'Real-time KPI dashboards with alerts',
          5: 'Predictive analytics with automated insights'
        },
        typicalPitfalls: [
          'KPIs not defined',
          'Manual Excel reporting',
          'Metrics don\'t align to strategy'
        ]
      },
      {
        id: '1.9',
        name: 'Contracts & Agreements',
        description: 'Formal agreements with stakeholders',
        vendors: [],
        relatedQuestions: ['Q3.7'],
        maturityIndicators: {
          1: 'Contracts in file cabinets',
          2: 'Contracts scanned but not searchable',
          3: 'Contract management system',
          4: 'Contract lifecycle management with workflows',
          5: 'AI-powered contract analysis and risk detection'
        },
        typicalPitfalls: [
          'Contract data siloed',
          'Renewal dates not tracked',
          'Contract terms not enforceable (no visibility)'
        ]
      },
      {
        id: '1.10',
        name: 'Collaboration & Partner Ecosystems',
        description: 'B2B touchpoints, partner portals',
        vendors: [],
        relatedQuestions: ['Q5.1'],
        maturityIndicators: {
          1: 'Email-based partner communication',
          2: 'Basic partner portal',
          3: 'Partner ecosystem with self-service',
          4: 'API-enabled partner integration',
          5: 'Platform-based ecosystem with real-time collaboration'
        },
        typicalPitfalls: [
          'Manual partner onboarding',
          'No API for partners',
          'Partner data not synchronized'
        ]
      }
    ]
  },

  // ============================================================================
  // LAYER 2: APPLICATION & SERVICES
  // ============================================================================
  {
    id: 2,
    name: 'Application & Services',
    description: 'Systems that run the business; ERP, CRM, HCM, industry apps',
    icon: 'Layers',
    components: [
      {
        id: '2.1',
        name: 'ERP (Enterprise Resource Planning)',
        description: 'Core transactional systems for finance, HR, procurement, manufacturing',
        vendors: [],
        relatedQuestions: ['Q3.1'],
        maturityIndicators: {
          1: 'Spreadsheet-based or legacy ERP (pre-2010)',
          2: 'Modern ERP but heavily customized',
          3: 'Modern ERP, standard configuration',
          4: 'Cloud ERP with API integrations',
          5: 'Real-time ERP with embedded analytics'
        },
        typicalPitfalls: [
          'Monolithic customizations',
          'Version lock-in',
          'Expensive upgrades',
          'Poor API exposure',
          'EOL approaching (SAP ECC 2027)'
        ]
      },
      {
        id: '2.2',
        name: 'CRM (Customer Relationship Management)',
        description: 'Sales, marketing, service management; 360° customer view',
        vendors: [],
        relatedQuestions: ['Q3.2'],
        maturityIndicators: {
          1: 'Excel or Access database',
          2: 'CRM deployed but <50% user adoption',
          3: 'CRM with >75% adoption, basic automation',
          4: 'CRM with marketing automation, integrated with ERP',
          5: 'AI-powered CRM, predictive analytics, real-time customer 360'
        },
        typicalPitfalls: [
          'Data silos',
          'Duplicate customer records (18-30% typical)',
          'Weak integration with ERP/billing',
          'Shadow CRM in Excel'
        ]
      },
      {
        id: '2.3',
        name: 'HCM / Workforce Management',
        description: 'Payroll, talent, recruitment, learning, time & attendance',
        vendors: [],
        relatedQuestions: ['Q3.3'],
        maturityIndicators: {
          1: 'Spreadsheets for HR data',
          2: 'Payroll service only, no HRIS',
          3: 'Basic HRIS with core HR functions',
          4: 'Integrated HCM with talent management',
          5: 'AI-powered talent marketplace with skills intelligence'
        },
        typicalPitfalls: [
          'Manual data sync with finance',
          'Compliance gaps (Fair Work Act)',
          'Poor employee self-service',
          'Orphaned accounts'
        ]
      },
      {
        id: '2.4',
        name: 'Supply Chain & Logistics',
        description: 'Planning, procurement, warehousing, transport, inventory',
        vendors: [],
        relatedQuestions: ['Q1.3'],
        maturityIndicators: {
          1: 'Manual spreadsheet planning',
          2: 'Basic inventory system',
          3: 'Supply chain planning tool',
          4: 'Integrated supply chain with real-time visibility',
          5: 'AI-powered supply chain with predictive analytics'
        },
        typicalPitfalls: [
          'Real-time visibility gaps',
          'Poor IoT integration',
          'Forecast inaccuracy'
        ]
      },
      {
        id: '2.5',
        name: 'Finance & Accounting',
        description: 'GL, AP, AR, tax, financial reporting, consolidation',
        vendors: [],
        relatedQuestions: ['Q3.1', 'Q9.2'],
        maturityIndicators: {
          1: 'Manual processes, spreadsheet-based',
          2: 'Basic accounting system',
          3: 'Modern finance system with automation',
          4: 'Real-time financial consolidation',
          5: 'Continuous accounting with AI-powered insights'
        },
        typicalPitfalls: [
          'Manual reconciliations',
          'No real-time P&L',
          'Multi-currency complexity',
          'Month-end close >10 days'
        ]
      },
      {
        id: '2.6',
        name: 'Industry-Specific Applications',
        description: 'Vertical solutions for mining, healthcare, retail, finance',
        vendors: [],
        relatedQuestions: ['Q1.3', 'Q3.7'],
        maturityIndicators: {
          1: 'No industry-specific tools',
          2: 'Legacy industry apps',
          3: 'Modern industry apps but siloed',
          4: 'Industry apps integrated with core systems',
          5: 'Industry-specific platform with ecosystem'
        },
        typicalPitfalls: [
          'Vendor lock-in',
          'Difficult upgrades',
          'Limited ecosystems'
        ]
      },
      {
        id: '2.7',
        name: 'Collaboration & Productivity',
        description: 'Email, document management, intranet, teams',
        vendors: [],
        relatedQuestions: ['Q3.4'],
        maturityIndicators: {
          1: 'Basic email only',
          2: 'Email and file shares',
          3: 'Collaboration platform (Teams/Slack)',
          4: 'Integrated productivity suite with governance',
          5: 'AI-powered collaboration with knowledge management'
        },
        typicalPitfalls: [
          'Sprawl of channels',
          'Poor governance',
          'Shadow IT file shares',
          'No DLP'
        ]
      },
      {
        id: '2.8',
        name: 'Point Solutions & SaaS Tools',
        description: 'Niche apps (expense, travel, procurement cards, eSignature)',
        vendors: [],
        relatedQuestions: ['Q3.4'],
        maturityIndicators: {
          1: 'Unmanaged SaaS sprawl',
          2: 'SaaS inventory exists',
          3: 'SaaS governance with approved list',
          4: 'SaaS management platform with SSO',
          5: 'Integrated SaaS ecosystem with unified identity'
        },
        typicalPitfalls: [
          'Integration spaghetti',
          'Duplicate masters',
          'Licensing waste',
          'No SSO'
        ]
      },
      {
        id: '2.9',
        name: 'Custom-Built Applications',
        description: 'Bespoke systems for unique business processes',
        vendors: [],
        relatedQuestions: ['Q3.5', 'Q3.8'],
        maturityIndicators: {
          1: 'Legacy custom apps with no documentation',
          2: 'Custom apps with basic documentation',
          3: 'Modern custom apps with proper architecture',
          4: 'API-enabled custom apps with DevOps',
          5: 'Low-code/no-code platform reducing custom development'
        },
        typicalPitfalls: [
          'No documentation',
          'Key-person risk',
          'Unsupported frameworks',
          'No API layer'
        ]
      },
      {
        id: '2.10',
        name: 'Application Services (APIs, Microservices)',
        description: 'Composable services exposing business logic via REST/GraphQL',
        vendors: [],
        relatedQuestions: ['Q3.9', 'Q5.3'],
        maturityIndicators: {
          1: 'No API strategy',
          2: 'Few APIs, no standards',
          3: 'API-first approach for new development',
          4: 'Comprehensive API catalog with governance',
          5: 'API product strategy with developer ecosystem'
        },
        typicalPitfalls: [
          'API sprawl',
          'No versioning strategy',
          'Poor service discovery',
          'No API gateway'
        ]
      }
    ]
  },

  // ============================================================================
  // LAYER 3: DATA & ANALYTICS
  // ============================================================================
  {
    id: 3,
    name: 'Data & Analytics',
    description: 'How we store, govern, move, and analyze data; MDM, warehouses, BI, ML',
    icon: 'Database',
    components: [
      {
        id: '3.1',
        name: 'Master Data Management (MDM)',
        description: 'Golden records for customers, products, suppliers, assets',
        vendors: [],
        relatedQuestions: ['Q4.2'],
        maturityIndicators: {
          1: 'No MDM',
          2: 'Basic data quality checks',
          3: 'MDM for one domain (e.g., customer)',
          4: 'Multi-domain MDM with stewardship',
          5: 'Real-time MDM with AI-powered matching'
        },
        typicalPitfalls: [
          'Incomplete stewardship',
          'Poor data quality (15-30% duplicates)',
          'Batch-only sync',
          'No business buy-in'
        ]
      },
      {
        id: '3.2',
        name: 'Data Warehousing (Traditional)',
        description: 'Structured, dimensional models for historical BI',
        vendors: [],
        relatedQuestions: ['Q4.1'],
        maturityIndicators: {
          1: 'No data warehouse',
          2: 'Legacy on-prem warehouse',
          3: 'Modern on-prem or cloud warehouse',
          4: 'Cloud data warehouse with elastic scaling',
          5: 'Data lakehouse combining warehouse and lake'
        },
        typicalPitfalls: [
          'Expensive scaling',
          'Rigid schemas',
          'Slow to add sources',
          'Can\'t handle unstructured data'
        ]
      },
      {
        id: '3.3',
        name: 'Cloud Data Warehouses',
        description: 'Elastic, SQL-based analytics storage',
        vendors: [],
        relatedQuestions: ['Q4.1'],
        maturityIndicators: {
          1: 'No cloud warehouse',
          2: 'Cloud warehouse pilot',
          3: 'Cloud warehouse for some workloads',
          4: 'Primary cloud warehouse with cost controls',
          5: 'Multi-cloud data strategy with federated queries'
        },
        typicalPitfalls: [
          'Runaway compute costs',
          'Poor workload management',
          'Data egress fees',
          'No cost controls'
        ]
      },
      {
        id: '3.4',
        name: 'Data Lakes',
        description: 'Store raw/semi-structured data at scale (logs, IoT, media)',
        vendors: [],
        relatedQuestions: ['Q4.1'],
        maturityIndicators: {
          1: 'No data lake',
          2: 'Data lake becoming data swamp',
          3: 'Data lake with basic cataloging',
          4: 'Well-governed data lake with zones',
          5: 'Data lakehouse with ACID transactions'
        },
        typicalPitfalls: [
          'Data swamps (no cataloging)',
          'Security gaps (open S3 buckets)',
          'Poor lifecycle management',
          'No data quality'
        ]
      },
      {
        id: '3.5',
        name: 'Data Catalogues & Governance',
        description: 'Metadata management, lineage, data discovery, glossaries',
        vendors: [],
        relatedQuestions: ['Q4.2'],
        maturityIndicators: {
          1: 'No data catalog',
          2: 'Manual data documentation',
          3: 'Data catalog with basic metadata',
          4: 'Active data catalog with lineage',
          5: 'AI-powered data catalog with automated discovery'
        },
        typicalPitfalls: [
          'Manual curation',
          'Stale metadata',
          'Low adoption',
          'No lineage tracking'
        ]
      },
      {
        id: '3.6',
        name: 'ETL / ELT Pipelines',
        description: 'Extract, transform, load data between systems',
        vendors: [],
        relatedQuestions: ['Q4.1', 'Q9.4'],
        maturityIndicators: {
          1: 'Manual data exports',
          2: 'Basic ETL scripts',
          3: 'ETL tool with scheduling',
          4: 'Automated ELT with orchestration',
          5: 'Real-time data pipelines with DataOps'
        },
        typicalPitfalls: [
          'Brittle scripts',
          'No orchestration',
          'Failure handling gaps',
          'No monitoring'
        ]
      },
      {
        id: '3.7',
        name: 'Real-Time Streaming & Event Processing',
        description: 'Ingest and process data in motion (IoT, clickstreams, transactions)',
        vendors: [],
        relatedQuestions: ['Q4.1'],
        maturityIndicators: {
          1: 'Batch only',
          2: 'Basic message queue',
          3: 'Event streaming for some use cases',
          4: 'Event-driven architecture with Kafka',
          5: 'Real-time data fabric with stream processing'
        },
        typicalPitfalls: [
          'Operational complexity',
          'Schema registry issues',
          'Consumer lag'
        ]
      },
      {
        id: '3.8',
        name: 'Business Intelligence (BI) Platforms',
        description: 'Reporting, dashboards, self-service analytics',
        vendors: [],
        relatedQuestions: ['Q4.3'],
        maturityIndicators: {
          1: 'Excel only',
          2: 'Basic BI tool, limited adoption',
          3: 'BI platform with good adoption',
          4: 'Self-service BI with governance',
          5: 'Augmented analytics with AI-powered insights'
        },
        typicalPitfalls: [
          'Report sprawl (100s of reports, unused)',
          'Inconsistent metrics',
          'Slow performance',
          'Excel still used as "real" tool'
        ]
      },
      {
        id: '3.9',
        name: 'Machine Learning (ML) Platforms',
        description: 'Data science, predictive models, AutoML, model deployment',
        vendors: [],
        relatedQuestions: ['Q4.4'],
        maturityIndicators: {
          1: 'No ML capability',
          2: 'Data scientists with local tools',
          3: 'ML platform for experimentation',
          4: 'MLOps with model deployment',
          5: 'Production ML at scale with continuous learning'
        },
        typicalPitfalls: [
          'Models never productionized',
          'Data scientists can\'t deploy',
          'No MLOps',
          'Model drift not monitored'
        ]
      },
      {
        id: '3.10',
        name: 'Operational Analytics (Embedded)',
        description: 'Dashboards inside operational apps',
        vendors: [],
        relatedQuestions: ['Q4.3'],
        maturityIndicators: {
          1: 'No embedded analytics',
          2: 'Basic reports in apps',
          3: 'Embedded dashboards',
          4: 'Real-time analytics in apps',
          5: 'AI-powered insights embedded everywhere'
        },
        typicalPitfalls: [
          'Limited to single app\'s data',
          'Can\'t cross-correlate',
          'Performance issues'
        ]
      },
      {
        id: '3.11',
        name: 'Data Quality & Profiling',
        description: 'Detect duplicates, validate formats, measure completeness',
        vendors: [],
        relatedQuestions: ['Q4.5'],
        maturityIndicators: {
          1: 'No data quality checks',
          2: 'Manual data quality spot checks',
          3: 'Automated data profiling',
          4: 'Continuous data quality monitoring',
          5: 'AI-powered data quality with auto-remediation'
        },
        typicalPitfalls: [
          'Quality issues found but not fixed',
          'No data ownership',
          'Reactive approach'
        ]
      },
      {
        id: '3.12',
        name: 'Data Privacy & Compliance',
        description: 'GDPR consent, data retention, right to be forgotten, audit trails',
        vendors: [],
        relatedQuestions: ['Q2.2', 'Q4.6'],
        maturityIndicators: {
          1: 'No privacy controls',
          2: 'Basic privacy policy',
          3: 'Privacy controls implemented',
          4: 'Automated privacy compliance',
          5: 'Privacy by design with continuous compliance'
        },
        typicalPitfalls: [
          'Manual tracking',
          'No automated data deletion',
          'Non-compliance fines (up to $2.5M AUD Privacy Act)'
        ]
      },
      {
        id: '3.13',
        name: 'Data Lakehouse',
        description: 'Combines lake scalability with warehouse ACID transactions',
        vendors: [],
        relatedQuestions: ['Q4.1'],
        maturityIndicators: {
          1: 'Separate lake and warehouse',
          2: 'Pilot lakehouse project',
          3: 'Lakehouse for analytics workloads',
          4: 'Lakehouse as primary analytics platform',
          5: 'Multi-cloud lakehouse with unified governance'
        },
        typicalPitfalls: [
          'Vendor lock-in',
          'Cost surprises',
          'Complexity in migration'
        ]
      }
    ]
  },

  // ============================================================================
  // LAYER 4: INTEGRATION & MIDDLEWARE
  // ============================================================================
  {
    id: 4,
    name: 'Integration & Middleware',
    description: 'Glue between systems; APIs, ESBs, messaging, orchestration',
    icon: 'Network',
    components: [
      {
        id: '4.1',
        name: 'API Management / Gateway',
        description: 'Publish, secure, throttle, monitor APIs; centralised policy enforcement',
        vendors: [],
        relatedQuestions: ['Q5.3'],
        maturityIndicators: {
          1: 'No API gateway',
          2: 'Basic reverse proxy',
          3: 'API gateway for some APIs',
          4: 'Comprehensive API management with developer portal',
          5: 'API product strategy with monetization'
        },
        typicalPitfalls: [
          'Gateway becomes bottleneck',
          'Complex policies hard to debug',
          'No API versioning strategy',
          'No developer portal'
        ]
      },
      {
        id: '4.2',
        name: 'Enterprise Service Bus (ESB) / iPaaS',
        description: 'Centralised messaging and integration hub; orchestrate complex flows',
        vendors: [],
        relatedQuestions: ['Q5.2', 'Q5.3'],
        maturityIndicators: {
          1: 'Point-to-point integrations',
          2: 'Basic ESB with few integrations',
          3: 'ESB for core integrations',
          4: 'iPaaS with comprehensive integration catalog',
          5: 'Event-driven integration fabric'
        },
        typicalPitfalls: [
          'Over-architected (ESB for simple P2P)',
          'Vendor lock-in',
          'Cost per connector',
          'Complex licensing'
        ]
      },
      {
        id: '4.3',
        name: 'Message Broker / Queue',
        description: 'Asynchronous messaging, guaranteed delivery, decoupling',
        vendors: [],
        relatedQuestions: ['Q5.2'],
        maturityIndicators: {
          1: 'No message queue',
          2: 'Basic queuing for some workflows',
          3: 'Message broker for asynchronous processes',
          4: 'Enterprise messaging with high availability',
          5: 'Event mesh with global distribution'
        },
        typicalPitfalls: [
          'Poison messages (never processed)',
          'Queue depth explosion',
          'No dead-letter handling'
        ]
      },
      {
        id: '4.4',
        name: 'Event Streaming Platform',
        description: 'Real-time event backbone, publish-subscribe at scale',
        vendors: [],
        relatedQuestions: ['Q5.2'],
        maturityIndicators: {
          1: 'No event streaming',
          2: 'Basic message queue',
          3: 'Kafka for some use cases',
          4: 'Event streaming as primary integration pattern',
          5: 'Event-driven architecture across enterprise'
        },
        typicalPitfalls: [
          'Schema mismatches',
          'Consumer lag',
          'Cluster management complexity',
          'No Schema Registry'
        ]
      },
      {
        id: '4.5',
        name: 'File Transfer (MFT/SFTP)',
        description: 'Secure bulk file exchange (EDI, bank files, payroll)',
        vendors: [],
        relatedQuestions: ['Q5.2'],
        maturityIndicators: {
          1: 'Manual file transfers',
          2: 'Basic SFTP',
          3: 'Managed file transfer with scheduling',
          4: 'Enterprise MFT with automation',
          5: 'API-first, files as last resort'
        },
        typicalPitfalls: [
          'Unencrypted files',
          'No audit trail',
          'Manual error handling',
          'Batch windows'
        ]
      },
      {
        id: '4.6',
        name: 'RPA (Robotic Process Automation)',
        description: 'Automate UI-based tasks where APIs not available',
        vendors: [],
        relatedQuestions: ['Q8.1'],
        maturityIndicators: {
          1: 'No automation',
          2: 'Attended bots (desktop automation)',
          3: 'Unattended bots with scheduling',
          4: 'Enterprise RPA with CoE',
          5: 'Intelligent automation with AI/ML'
        },
        typicalPitfalls: [
          'Brittle (breaks on UI changes)',
          'No governance',
          '"Shadow IT" bots'
        ]
      },
      {
        id: '4.7',
        name: 'API Development & Mocking',
        description: 'Design-first APIs, testing, documentation',
        vendors: [],
        relatedQuestions: ['Q3.9'],
        maturityIndicators: {
          1: 'No API standards',
          2: 'Informal API development',
          3: 'API design-first approach',
          4: 'API catalog with testing',
          5: 'API-as-a-product with full lifecycle'
        },
        typicalPitfalls: [
          'Spec drift from implementation',
          'No versioning',
          'Poor documentation'
        ]
      },
      {
        id: '4.8',
        name: 'Service Mesh',
        description: 'Service-to-service comms, observability, circuit breakers',
        vendors: [],
        relatedQuestions: ['Q6.3'],
        maturityIndicators: {
          1: 'No service mesh',
          2: 'Point-to-point microservice comms',
          3: 'Service mesh pilot',
          4: 'Service mesh for microservices',
          5: 'Multi-cluster service mesh'
        },
        typicalPitfalls: [
          'Complexity overhead',
          'Debugging distributed tracing hard',
          'Performance impact'
        ]
      },
      {
        id: '4.9',
        name: 'EDI / B2B Integration',
        description: 'Standards-based document exchange (X12, EDIFACT, HL7, FHIR)',
        vendors: [],
        relatedQuestions: ['Q5.2'],
        maturityIndicators: {
          1: 'No B2B integration',
          2: 'Manual EDI processing',
          3: 'Automated EDI with trading partners',
          4: 'B2B integration platform',
          5: 'API-first B2B with real-time exchange'
        },
        typicalPitfalls: [
          'Complex mapping',
          'Partner onboarding delays',
          'No testing environment'
        ]
      },
      {
        id: '4.10',
        name: 'Integration Failure Rate',
        description: 'Monitoring and alerting on integration health',
        vendors: [],
        relatedQuestions: ['Q5.4'],
        maturityIndicators: {
          1: 'No integration monitoring',
          2: 'Basic error logging',
          3: 'Integration monitoring with alerts',
          4: 'Proactive integration health monitoring',
          5: 'Predictive integration failure prevention'
        },
        typicalPitfalls: [
          'High failure rates (>5%)',
          'No automated retry',
          'Manual troubleshooting'
        ]
      }
    ]
  },

  // ============================================================================
  // LAYER 5: PLATFORM & INFRASTRUCTURE
  // ============================================================================
  {
    id: 5,
    name: 'Platform & Infrastructure',
    description: 'Where apps and data run; cloud, on-prem, containers, databases',
    icon: 'Server',
    components: [
      {
        id: '5.1',
        name: 'Cloud IaaS (Infrastructure-as-a-Service)',
        description: 'Virtual machines, block storage, virtual networks',
        vendors: [],
        relatedQuestions: ['Q6.1', 'Q6.2'],
        maturityIndicators: {
          1: 'All on-premises',
          2: 'Basic cloud usage (lift-and-shift)',
          3: 'Cloud-first for new workloads',
          4: 'Cloud-optimized architecture',
          5: 'Cloud-native with multi-cloud strategy'
        },
        typicalPitfalls: [
          'Over-provisioned VMs',
          'Unused instances 24/7',
          'No auto-scaling',
          'No tagging (can\'t chargeback)'
        ]
      },
      {
        id: '5.2',
        name: 'Cloud PaaS (Platform-as-a-Service)',
        description: 'Managed app hosting (no OS management), auto-scaling',
        vendors: [],
        relatedQuestions: ['Q6.2'],
        maturityIndicators: {
          1: 'No PaaS usage',
          2: 'Basic PaaS for simple apps',
          3: 'PaaS for new applications',
          4: 'PaaS-first strategy',
          5: 'Serverless-first with PaaS fallback'
        },
        typicalPitfalls: [
          'Vendor lock-in (proprietary configs)',
          'Limited runtime customization',
          'Cost unpredictability'
        ]
      },
      {
        id: '5.3',
        name: 'Container Orchestration (Kubernetes)',
        description: 'Run microservices at scale, declarative deployments, self-healing',
        vendors: [],
        relatedQuestions: ['Q6.3'],
        maturityIndicators: {
          1: 'No containers',
          2: 'Containers in development',
          3: 'Kubernetes for some workloads',
          4: 'Kubernetes as primary container platform',
          5: 'Multi-cluster Kubernetes with service mesh'
        },
        typicalPitfalls: [
          'Steep learning curve',
          'Complex networking (CNI)',
          'Security (RBAC, pod policies)',
          'Cost management'
        ]
      },
      {
        id: '5.4',
        name: 'Serverless / FaaS',
        description: 'Event-driven code execution, no server management, pay-per-invocation',
        vendors: [],
        relatedQuestions: ['Q6.2'],
        maturityIndicators: {
          1: 'No serverless',
          2: 'Serverless for simple functions',
          3: 'Serverless for event-driven workloads',
          4: 'Serverless-first architecture',
          5: 'Full serverless application platform'
        },
        typicalPitfalls: [
          'Cold starts',
          'Timeout limits (15 min)',
          'Debugging challenges',
          'Cost surprises (millions of invocations)'
        ]
      },
      {
        id: '5.5',
        name: 'Storage (Block, File, Object)',
        description: 'Persistent storage for apps, backups, archives',
        vendors: [],
        relatedQuestions: ['Q6.1'],
        maturityIndicators: {
          1: 'Local disk only',
          2: 'Basic cloud storage',
          3: 'Tiered storage strategy',
          4: 'Automated lifecycle policies',
          5: 'Intelligent tiering with cost optimization'
        },
        typicalPitfalls: [
          'Wrong storage tier (hot data on archive = slow)',
          'No lifecycle policies',
          'Data egress fees'
        ]
      },
      {
        id: '5.6',
        name: 'Database-as-a-Service (DBaaS)',
        description: 'Managed relational/NoSQL databases, automated backups, HA',
        vendors: [],
        relatedQuestions: ['Q6.1'],
        maturityIndicators: {
          1: 'Self-managed databases',
          2: 'Basic DBaaS usage',
          3: 'DBaaS for most databases',
          4: 'Multi-region DBaaS with HA',
          5: 'Global database with automatic failover'
        },
        typicalPitfalls: [
          'Vendor-specific features (hard to migrate)',
          'Cost (IOPS charges)',
          'Connection limits'
        ]
      },
      {
        id: '5.7',
        name: 'Network (Load Balancer, CDN, VPN, DNS)',
        description: 'Connectivity, traffic routing, DDoS protection, content delivery',
        vendors: [],
        relatedQuestions: ['Q6.1'],
        maturityIndicators: {
          1: 'Basic networking',
          2: 'Load balancer and basic CDN',
          3: 'Global load balancing with CDN',
          4: 'Advanced networking with WAF',
          5: 'Zero-trust network architecture'
        },
        typicalPitfalls: [
          'Network bottlenecks',
          'No redundancy',
          'Misconfigured firewall rules (too open)'
        ]
      },
      {
        id: '5.8',
        name: 'Backup & Disaster Recovery (DR)',
        description: 'Protect against data loss, meet RTO/RPO requirements',
        vendors: [],
        relatedQuestions: ['Q6.7'],
        maturityIndicators: {
          1: 'No backup strategy',
          2: 'Basic backups, untested',
          3: 'Regular backups with testing',
          4: 'Automated DR with documented runbooks',
          5: 'Continuous data protection with instant recovery'
        },
        typicalPitfalls: [
          'Backup testing neglected (restores fail)',
          'No documented runbooks',
          'Expensive DR environment idle'
        ]
      },
      {
        id: '5.9',
        name: 'Hybrid Cloud / Multi-Cloud',
        description: 'Run workloads across on-prem + multiple cloud providers',
        vendors: [],
        relatedQuestions: ['Q6.1', 'Q6.2'],
        maturityIndicators: {
          1: 'Single cloud or on-prem only',
          2: 'Multi-cloud but uncoordinated',
          3: 'Deliberate multi-cloud strategy',
          4: 'Hybrid cloud with unified management',
          5: 'Cloud-agnostic architecture'
        },
        typicalPitfalls: [
          'Increased complexity',
          'Multiple skillsets required',
          'Data gravity (costly egress)'
        ]
      },
      {
        id: '5.10',
        name: 'On-Premises Datacentre',
        description: 'Owned/leased servers, storage arrays, network equipment',
        vendors: [],
        relatedQuestions: ['Q6.1'],
        maturityIndicators: {
          1: 'Aging on-prem infrastructure (>7 years)',
          2: 'Maintained on-prem with refresh cycles',
          3: 'Hybrid (on-prem + cloud)',
          4: 'Cloud-first, on-prem for specific workloads',
          5: 'Cloud-only (no on-prem)'
        },
        typicalPitfalls: [
          'Capex-heavy',
          'Long procurement cycles',
          'Over-provisioned',
          'EOL hardware',
          'Cooling/power costs high'
        ]
      },
      {
        id: '5.11',
        name: 'Edge Computing',
        description: 'Process data near the source (IoT gateways, retail stores, remote sites)',
        vendors: [],
        relatedQuestions: ['Q6.3'],
        maturityIndicators: {
          1: 'No edge computing',
          2: 'Basic edge devices',
          3: 'Edge computing for specific use cases',
          4: 'Edge computing strategy',
          5: 'Distributed edge with centralized management'
        },
        typicalPitfalls: [
          'Device management complexity',
          'Security patches',
          'Intermittent connectivity'
        ]
      }
    ]
  },

  // ============================================================================
  // LAYER 6: SECURITY, IDENTITY & GOVERNANCE
  // ============================================================================
  {
    id: 6,
    name: 'Security, Identity & Governance',
    description: 'Who can do what, and how we stay safe; IAM, encryption, SIEM, GRC',
    icon: 'Shield',
    components: [
      {
        id: '6.1',
        name: 'Identity & Access Management (IAM)',
        description: 'Centralised user authentication, SSO, MFA, lifecycle (joiner/mover/leaver)',
        vendors: [],
        relatedQuestions: ['Q7.1'],
        maturityIndicators: {
          1: 'Local accounts, no SSO',
          2: 'Basic Active Directory',
          3: 'SSO for most applications',
          4: 'Cloud IAM with automated provisioning',
          5: 'Zero-trust identity with continuous authentication'
        },
        typicalPitfalls: [
          'Licensing tiers confusion (P1/P2)',
          'Conditional Access setup complex',
          'Orphaned accounts (leavers still active avg 7-14 days)',
          'No MFA (30-50% typical)',
          'Privilege creep'
        ]
      },
      {
        id: '6.2',
        name: 'Privileged Access Management (PAM)',
        description: 'Control/monitor admin access, session recording, just-in-time elevation',
        vendors: [],
        relatedQuestions: ['Q7.1'],
        maturityIndicators: {
          1: 'Shared admin passwords',
          2: 'Basic password vault',
          3: 'PAM for critical systems',
          4: 'Comprehensive PAM with session recording',
          5: 'Zero standing privileges with JIT access'
        },
        typicalPitfalls: [
          'Shared admin passwords',
          'No break-glass procedures',
          'Unmonitored privileged sessions'
        ]
      },
      {
        id: '6.3',
        name: 'Endpoint Security (EDR/XDR)',
        description: 'Detect/respond to threats on laptops, servers (malware, ransomware)',
        vendors: [],
        relatedQuestions: ['Q7.2'],
        maturityIndicators: {
          1: 'Antivirus only',
          2: 'Basic EDR deployment',
          3: 'EDR with threat hunting',
          4: 'XDR with integrated threat response',
          5: 'AI-powered threat prevention'
        },
        typicalPitfalls: [
          'Agents not deployed to all endpoints (85% typical)',
          'Alerts ignored (fatigue)',
          'Slow patching (30+ days for critical)'
        ]
      },
      {
        id: '6.4',
        name: 'Network Security (Firewall, IDS/IPS, ZTNA)',
        description: 'Segment networks, block malicious traffic, zero trust access',
        vendors: [],
        relatedQuestions: ['Q7.2'],
        maturityIndicators: {
          1: 'Basic firewall',
          2: 'Next-gen firewall',
          3: 'Network segmentation',
          4: 'Zero-trust network architecture (ZTNA)',
          5: 'AI-powered network security'
        },
        typicalPitfalls: [
          'Flat network (lateral movement easy)',
          'Outdated firewall rules',
          'No segmentation'
        ]
      },
      {
        id: '6.5',
        name: 'Email & Web Security',
        description: 'Block phishing, malware, data exfiltration via email/web',
        vendors: [],
        relatedQuestions: ['Q7.2'],
        maturityIndicators: {
          1: 'Basic email filtering',
          2: 'Email security gateway',
          3: 'Advanced threat protection',
          4: 'Integrated email and web security',
          5: 'AI-powered phishing prevention'
        },
        typicalPitfalls: [
          'Users bypass security (personal email for work)',
          'No URL rewriting',
          'No DMARC'
        ]
      },
      {
        id: '6.6',
        name: 'Data Loss Prevention (DLP)',
        description: 'Prevent sensitive data (credit cards, health records) leaving the organisation',
        vendors: [],
        relatedQuestions: ['Q7.2'],
        maturityIndicators: {
          1: 'No DLP',
          2: 'Basic DLP rules',
          3: 'DLP across email and endpoints',
          4: 'Comprehensive DLP with classification',
          5: 'AI-powered DLP with contextual awareness'
        },
        typicalPitfalls: [
          'Too many false positives (users find workarounds)',
          'No classification labels',
          'DLP not enforced'
        ]
      },
      {
        id: '6.7',
        name: 'Encryption (At-Rest, In-Transit, Key Management)',
        description: 'Protect data confidentiality, meet compliance',
        vendors: [],
        relatedQuestions: ['Q7.4'],
        maturityIndicators: {
          1: 'No encryption',
          2: 'Basic encryption at rest',
          3: 'Encryption at rest and in transit',
          4: 'Centralized key management',
          5: 'Bring-your-own-key with HSM'
        },
        typicalPitfalls: [
          'Keys stored in code (hardcoded)',
          'No key rotation',
          'Weak encryption (MD5/DES)'
        ]
      },
      {
        id: '6.8',
        name: 'Security Information & Event Management (SIEM)',
        description: 'Aggregate logs, correlate events, detect threats, compliance reporting',
        vendors: [],
        relatedQuestions: ['Q7.3'],
        maturityIndicators: {
          1: 'No SIEM',
          2: 'Basic log aggregation',
          3: 'SIEM with basic correlation',
          4: 'Advanced SIEM with threat intelligence',
          5: 'AI-powered SIEM with automated response'
        },
        typicalPitfalls: [
          'Log overload (TB/day, expensive)',
          'Alert fatigue (100s/day, no tuning)',
          'High false positives',
          'Expensive licensing'
        ]
      },
      {
        id: '6.9',
        name: 'Threat Intelligence & SOAR',
        description: 'Automate incident response, enrich alerts with threat intel',
        vendors: [],
        relatedQuestions: ['Q7.3'],
        maturityIndicators: {
          1: 'No threat intelligence',
          2: 'Basic threat feeds',
          3: 'Threat intelligence integration',
          4: 'SOAR with automated playbooks',
          5: 'AI-powered threat hunting'
        },
        typicalPitfalls: [
          'No threat intel feeds',
          'Manual triage (slow MTTR)',
          'Playbooks not maintained'
        ]
      },
      {
        id: '6.10',
        name: 'Vulnerability Management',
        description: 'Scan for CVEs, misconfigurations, prioritize patching',
        vendors: [],
        relatedQuestions: ['Q7.5'],
        maturityIndicators: {
          1: 'No vulnerability scanning',
          2: 'Quarterly vulnerability scans',
          3: 'Continuous vulnerability scanning',
          4: 'Prioritized vulnerability management',
          5: 'Automated vulnerability remediation'
        },
        typicalPitfalls: [
          'Scan results ignored (thousands of CVEs)',
          'No SLA for critical patches (avg 30-60 days)',
          'Patch management chaos'
        ]
      },
      {
        id: '6.11',
        name: 'Cloud Security Posture Management (CSPM)',
        description: 'Detect cloud misconfigurations (open S3 buckets, weak IAM policies)',
        vendors: [],
        relatedQuestions: ['Q7.2'],
        maturityIndicators: {
          1: 'No cloud security monitoring',
          2: 'Basic cloud security checks',
          3: 'CSPM for misconfigurations',
          4: 'Integrated CSPM with remediation',
          5: 'AI-powered cloud security with prevention'
        },
        typicalPitfalls: [
          'No baseline policies',
          'Findings not tracked',
          'Developers bypass (shadow cloud accounts)'
        ]
      },
      {
        id: '6.12',
        name: 'Governance, Risk & Compliance (GRC)',
        description: 'Policy management, audit readiness, risk register, attestations',
        vendors: [],
        relatedQuestions: ['Q2.2'],
        maturityIndicators: {
          1: 'Manual spreadsheets',
          2: 'Basic GRC tool',
          3: 'Integrated GRC platform',
          4: 'Automated compliance monitoring',
          5: 'Continuous compliance with AI insights'
        },
        typicalPitfalls: [
          'Manual spreadsheets',
          'Audit findings not remediated',
          'No continuous compliance'
        ]
      },
      {
        id: '6.13',
        name: 'Application Security (SAST, DAST, SCA)',
        description: 'Find vulnerabilities in code before production',
        vendors: [],
        relatedQuestions: ['Q8.2'],
        maturityIndicators: {
          1: 'No application security testing',
          2: 'Basic code scanning',
          3: 'SAST and DAST in CI/CD',
          4: 'Comprehensive AppSec with SCA',
          5: 'Shift-left security with automated remediation'
        },
        typicalPitfalls: [
          'Scan results not integrated to CI/CD',
          'False positives ignored',
          'No remediation SLA'
        ]
      },
      {
        id: '6.14',
        name: 'Compliance (Australian-Specific)',
        description: 'ACSC Essential Eight, Privacy Act, Fair Work Act',
        vendors: [],
        relatedQuestions: ['Q2.2'],
        maturityIndicators: {
          1: 'No compliance framework',
          2: 'Basic compliance awareness',
          3: 'Compliance program established',
          4: 'Continuous compliance monitoring',
          5: 'Integrated compliance with automation'
        },
        typicalPitfalls: [
          'No compliance roadmap',
          'Reactive approach',
          'Fines for non-compliance'
        ]
      }
    ]
  },

  // ============================================================================
  // LAYER 7: DEVOPS, CI/CD & OBSERVABILITY
  // ============================================================================
  {
    id: 7,
    name: 'DevOps, CI/CD & Observability',
    description: 'How we build, deploy, monitor code; source control, pipelines, APM',
    icon: 'GitBranch',
    components: [
      {
        id: '7.1',
        name: 'Source Control & Version Management',
        description: 'Track code changes, branching, pull requests, code reviews',
        vendors: [],
        relatedQuestions: ['Q8.3'],
        maturityIndicators: {
          1: 'No source control',
          2: 'Basic Git usage',
          3: 'Git with branching strategy',
          4: 'Git with code reviews and policies',
          5: 'GitOps with automated deployment'
        },
        typicalPitfalls: [
          'No branching strategy (direct commits to main)',
          'Large monorepo (slow clones)',
          'No code owners'
        ]
      },
      {
        id: '7.2',
        name: 'CI/CD (Continuous Integration/Deployment)',
        description: 'Automate build, test, deploy; fast feedback loops',
        vendors: [],
        relatedQuestions: ['Q8.1', 'Q8.2'],
        maturityIndicators: {
          1: 'Manual deployments',
          2: 'Basic CI (build automation)',
          3: 'CI/CD for some applications',
          4: 'Comprehensive CI/CD with automated testing',
          5: 'Continuous deployment with feature flags'
        },
        typicalPitfalls: [
          'Manual deployments (slow, error-prone)',
          'No rollback strategy',
          'Flaky tests break pipeline',
          'No automated testing'
        ]
      },
      {
        id: '7.3',
        name: 'Artifact & Container Registries',
        description: 'Store build outputs (JARs, Docker images, Helm charts)',
        vendors: [],
        relatedQuestions: ['Q6.3'],
        maturityIndicators: {
          1: 'No artifact management',
          2: 'Basic artifact storage',
          3: 'Container registry with scanning',
          4: 'Comprehensive artifact management',
          5: 'Immutable infrastructure with signed artifacts'
        },
        typicalPitfalls: [
          'No image scanning (vulnerabilities in production)',
          'No retention policy (registry bloat)',
          'Unsigned images'
        ]
      },
      {
        id: '7.4',
        name: 'Infrastructure-as-Code (IaC)',
        description: 'Define infra declaratively (version control, repeatability, DR)',
        vendors: [],
        relatedQuestions: ['Q6.4'],
        maturityIndicators: {
          1: 'Manual infrastructure provisioning',
          2: 'Basic scripts',
          3: 'IaC for some infrastructure',
          4: 'Comprehensive IaC with state management',
          5: 'GitOps-driven infrastructure'
        },
        typicalPitfalls: [
          'Manual changes (state drift)',
          'No remote state locking',
          'Secrets in code'
        ]
      },
      {
        id: '7.5',
        name: 'Configuration Management',
        description: 'Install software, configure OS, enforce desired state',
        vendors: [],
        relatedQuestions: ['Q6.4'],
        maturityIndicators: {
          1: 'Manual server configuration',
          2: 'Basic configuration scripts',
          3: 'Configuration management tool',
          4: 'Automated configuration with compliance',
          5: 'Immutable infrastructure (no config mgmt needed)'
        },
        typicalPitfalls: [
          'Config drift (snowflake servers)',
          'No secrets management',
          'Manual changes break automation'
        ]
      },
      {
        id: '7.6',
        name: 'Application Performance Monitoring (APM)',
        description: 'Trace requests end-to-end, identify slow queries, profiling',
        vendors: [],
        relatedQuestions: ['Q8.4'],
        maturityIndicators: {
          1: 'No APM',
          2: 'Basic logging',
          3: 'APM for critical applications',
          4: 'Comprehensive APM with distributed tracing',
          5: 'AI-powered AIOps with auto-remediation'
        },
        typicalPitfalls: [
          'Agent overhead (performance impact)',
          'Missing instrumentation (blind spots)',
          'Alerts not actionable'
        ]
      },
      {
        id: '7.7',
        name: 'Logging & Log Aggregation',
        description: 'Centralise logs from all systems, search/filter, retention',
        vendors: [],
        relatedQuestions: ['Q8.4'],
        maturityIndicators: {
          1: 'Local logs only',
          2: 'Basic log aggregation',
          3: 'Centralized logging with search',
          4: 'Structured logging with retention policies',
          5: 'AI-powered log analysis'
        },
        typicalPitfalls: [
          'Unstructured logs (hard to parse)',
          'Log retention too short',
          'No log forwarding from ephemeral containers'
        ]
      },
      {
        id: '7.8',
        name: 'Metrics & Time-Series Databases',
        description: 'Collect numeric metrics (CPU, memory, request rate), visualize trends',
        vendors: [],
        relatedQuestions: ['Q8.4'],
        maturityIndicators: {
          1: 'No metrics collection',
          2: 'Basic infrastructure metrics',
          3: 'Application and infrastructure metrics',
          4: 'Comprehensive metrics with dashboards',
          5: 'Metrics-driven with SLO tracking'
        },
        typicalPitfalls: [
          'Cardinality explosion (too many metric labels)',
          'No alerting thresholds',
          'Dashboards unused'
        ]
      },
      {
        id: '7.9',
        name: 'Distributed Tracing',
        description: 'Track a single request across microservices, identify latency',
        vendors: [],
        relatedQuestions: ['Q8.4'],
        maturityIndicators: {
          1: 'No distributed tracing',
          2: 'Basic request logging',
          3: 'Distributed tracing for some services',
          4: 'Comprehensive distributed tracing',
          5: 'Full observability with context propagation'
        },
        typicalPitfalls: [
          'Inconsistent trace IDs (broken traces)',
          'Sampling too aggressive',
          'Missing rare issues'
        ]
      },
      {
        id: '7.10',
        name: 'Incident Management & On-Call',
        description: 'Alert routing, escalation, post-incident reviews',
        vendors: [],
        relatedQuestions: ['Q8.5'],
        maturityIndicators: {
          1: 'No incident management',
          2: 'Email alerts only',
          3: 'Incident management tool',
          4: 'Automated incident response',
          5: 'AI-powered incident prediction and prevention'
        },
        typicalPitfalls: [
          'Alert fatigue (too many pages)',
          'No runbooks',
          'Blame culture (no blameless postmortems)'
        ]
      },
      {
        id: '7.11',
        name: 'Chaos Engineering & Resilience Testing',
        description: 'Inject failures to test system robustness',
        vendors: [],
        relatedQuestions: ['Q8.2'],
        maturityIndicators: {
          1: 'No resilience testing',
          2: 'Basic disaster recovery drills',
          3: 'Chaos engineering experiments',
          4: 'Continuous chaos engineering',
          5: 'Automated resilience with self-healing'
        },
        typicalPitfalls: [
          'No game days',
          'Insufficient blast radius controls',
          'Chaos in production without approval'
        ]
      },
      {
        id: '7.12',
        name: 'Service Level Management (SLI/SLO/SLA)',
        description: 'Define reliability targets, error budgets, track availability',
        vendors: [],
        relatedQuestions: ['Q8.5'],
        maturityIndicators: {
          1: 'No SLOs defined',
          2: 'Basic uptime tracking',
          3: 'SLOs for critical services',
          4: 'Comprehensive SLO program',
          5: 'Error budget-driven development'
        },
        typicalPitfalls: [
          'No SLOs defined',
          'SLAs with penalties but no internal tracking',
          'No consequences when error budget exhausted'
        ]
      }
    ]
  },

  // ============================================================================
  // LAYER 8: UX & PRESENTATION
  // ============================================================================
  {
    id: 8,
    name: 'UX & Presentation',
    description: 'How users interact; web portals, mobile apps, dashboards',
    icon: 'Monitor',
    components: [
      {
        id: '8.1',
        name: 'Web Portals & Customer Interfaces',
        description: 'Public-facing or customer self-service sites',
        vendors: [],
        relatedQuestions: ['Q2.1'],
        maturityIndicators: {
          1: 'No web portal',
          2: 'Basic website',
          3: 'Modern web portal',
          4: 'Personalized customer portal',
          5: 'AI-powered omnichannel experience'
        },
        typicalPitfalls: [
          'Slow page loads',
          'Poor mobile UX',
          'Accessibility gaps (WCAG)'
        ]
      },
      {
        id: '8.2',
        name: 'Mobile Applications (Native & Cross-Platform)',
        description: 'iOS/Android apps for customers or workforce',
        vendors: [],
        relatedQuestions: ['Q2.1'],
        maturityIndicators: {
          1: 'No mobile app',
          2: 'Basic mobile app',
          3: 'Native mobile apps',
          4: 'Cross-platform mobile strategy',
          5: 'Progressive web apps with offline support'
        },
        typicalPitfalls: [
          'Platform fragmentation',
          'App store delays',
          'Offline-mode gaps'
        ]
      },
      {
        id: '8.3',
        name: 'Progressive Web Apps (PWA)',
        description: 'Web apps with native-like experience (offline, push)',
        vendors: [],
        relatedQuestions: ['Q2.1'],
        maturityIndicators: {
          1: 'Traditional web only',
          2: 'Responsive web design',
          3: 'PWA for some features',
          4: 'Full PWA experience',
          5: 'PWA-first strategy'
        },
        typicalPitfalls: [
          'Limited iOS support',
          'Cache invalidation',
          'Notification fatigue'
        ]
      },
      {
        id: '8.4',
        name: 'Dashboards & Embedded Analytics',
        description: 'Visualizations embedded in apps',
        vendors: [],
        relatedQuestions: ['Q4.3'],
        maturityIndicators: {
          1: 'No embedded analytics',
          2: 'Basic charts',
          3: 'Interactive dashboards',
          4: 'Real-time embedded analytics',
          5: 'AI-powered insights in applications'
        },
        typicalPitfalls: [
          'Performance on large datasets',
          'Licensing per-user costs',
          'No drill-down'
        ]
      },
      {
        id: '8.5',
        name: 'Design Systems & Component Libraries',
        description: 'Consistent UI patterns, accessibility compliance',
        vendors: [],
        relatedQuestions: [],
        maturityIndicators: {
          1: 'No design system',
          2: 'Basic style guide',
          3: 'Component library',
          4: 'Comprehensive design system',
          5: 'AI-assisted design system'
        },
        typicalPitfalls: [
          'Divergent implementations',
          'No version control',
          'Poor documentation'
        ]
      },
      {
        id: '8.6',
        name: 'Accessibility & Compliance',
        description: 'WCAG 2.1 AA/AAA, screen reader support, keyboard nav',
        vendors: [],
        relatedQuestions: [],
        maturityIndicators: {
          1: 'No accessibility considerations',
          2: 'Basic accessibility',
          3: 'WCAG 2.1 A compliance',
          4: 'WCAG 2.1 AA compliance',
          5: 'WCAG 2.1 AAA with continuous testing'
        },
        typicalPitfalls: [
          'Retrofitting accessibility',
          'No automated testing',
          'Missing alt-text'
        ]
      },
      {
        id: '8.7',
        name: 'Personalisation & A/B Testing',
        description: 'Dynamic content, experimentation, optimization',
        vendors: [],
        relatedQuestions: ['Q2.1'],
        maturityIndicators: {
          1: 'Static content',
          2: 'Basic personalization',
          3: 'A/B testing platform',
          4: 'Advanced personalization',
          5: 'AI-powered 1:1 personalization'
        },
        typicalPitfalls: [
          'No statistical rigor',
          'Test interference',
          'Privacy concerns'
        ]
      },
      {
        id: '8.8',
        name: 'Digital Experience Platform (DXP)',
        description: 'Manages content and user journeys',
        vendors: [],
        relatedQuestions: ['Q2.1'],
        maturityIndicators: {
          1: 'No DXP',
          2: 'Basic CMS',
          3: 'Headless CMS',
          4: 'Digital experience platform',
          5: 'Composable DXP with AI'
        },
        typicalPitfalls: [
          'Expensive',
          'Complex implementations',
          'Vendor lock-in'
        ]
      },
      {
        id: '8.9',
        name: 'Single Sign-On (SSO) User Experience',
        description: 'Provides unified authentication experience',
        vendors: [],
        relatedQuestions: ['Q7.1'],
        maturityIndicators: {
          1: 'Multiple logins',
          2: 'SSO for some apps',
          3: 'SSO for most apps',
          4: 'Universal SSO',
          5: 'Passwordless authentication'
        },
        typicalPitfalls: [
          'SSO not covering all apps',
          'Poor user experience',
          'Password fatigue'
        ]
      }
    ]
  },

  // ============================================================================
  // LAYER 9: IMPLEMENTATION & MIGRATION
  // ============================================================================
  {
    id: 9,
    name: 'Implementation & Migration',
    description: 'How we deliver change; program management, agile, testing, cutover',
    icon: 'Rocket',
    components: [
      {
        id: '9.1',
        name: 'Program & Portfolio Management',
        description: 'Track initiatives, dependencies, budgets, benefits realization',
        vendors: [],
        relatedQuestions: ['Q2.3'],
        maturityIndicators: {
          1: 'No portfolio visibility',
          2: 'Project list in spreadsheet',
          3: 'Portfolio management tool',
          4: 'Integrated portfolio with benefits tracking',
          5: 'AI-powered portfolio optimization'
        },
        typicalPitfalls: [
          'Disconnected from delivery',
          'Stale roadmaps',
          'No retrospectives'
        ]
      },
      {
        id: '9.2',
        name: 'Agile Delivery & Scrum/Kanban',
        description: 'Iterative development, sprint planning, retrospectives',
        vendors: [],
        relatedQuestions: ['Q8.2'],
        maturityIndicators: {
          1: 'Waterfall only',
          2: 'Basic Scrum',
          3: 'Mature agile practices',
          4: 'Scaled agile (SAFe/LeSS)',
          5: 'DevOps culture with continuous delivery'
        },
        typicalPitfalls: [
          'Agile theatre',
          'No definition of done',
          'Burnout from velocity pressure'
        ]
      },
      {
        id: '9.3',
        name: 'Change Management & Training',
        description: 'Stakeholder engagement, comms, training materials, adoption',
        vendors: [],
        relatedQuestions: ['Q9.3'],
        maturityIndicators: {
          1: 'No change management',
          2: 'Basic communication plan',
          3: 'Structured change management',
          4: 'Change management with digital adoption',
          5: 'Continuous change enablement'
        },
        typicalPitfalls: [
          'Late engagement',
          'Generic training',
          'No super-user network'
        ]
      },
      {
        id: '9.4',
        name: 'Data Migration & Cutover',
        description: 'Extract, transform, validate, load legacy data; go-live planning',
        vendors: [],
        relatedQuestions: ['Q9.4'],
        maturityIndicators: {
          1: 'Manual data migration',
          2: 'Basic ETL scripts',
          3: 'Automated data migration with validation',
          4: 'Comprehensive migration factory',
          5: 'Zero-downtime migration'
        },
        typicalPitfalls: [
          'Data quality issues (15-30% errors typical)',
          'Incomplete reconciliation',
          'Rollback plan missing'
        ]
      },
      {
        id: '9.5',
        name: 'Testing & Quality Assurance',
        description: 'Functional, performance, security, UAT',
        vendors: [],
        relatedQuestions: ['Q8.2'],
        maturityIndicators: {
          1: 'Manual testing only',
          2: 'Basic test automation',
          3: 'Comprehensive test automation',
          4: 'Shift-left testing',
          5: 'AI-powered test generation'
        },
        typicalPitfalls: [
          'No test data management',
          'Environment unavailability',
          'Late defect discovery'
        ]
      },
      {
        id: '9.6',
        name: 'Deployment & Cutover Management',
        description: 'Go-live orchestration, rollback procedures, hypercare',
        vendors: [],
        relatedQuestions: ['Q8.1'],
        maturityIndicators: {
          1: 'Big bang deployment',
          2: 'Basic deployment plan',
          3: 'Phased deployment with rollback',
          4: 'Blue-green deployment',
          5: 'Canary deployment with automated rollback'
        },
        typicalPitfalls: [
          'No dress rehearsal',
          'Missing rollback scripts',
          'Poor coordination'
        ]
      },
      {
        id: '9.7',
        name: 'Hypercare & Stabilisation',
        description: 'Post-go-live support, defect triage, user support, tuning',
        vendors: [],
        relatedQuestions: ['Q9.5'],
        maturityIndicators: {
          1: 'No hypercare plan',
          2: 'Basic post-go-live support',
          3: 'Structured hypercare period',
          4: 'Proactive hypercare with monitoring',
          5: 'AI-powered incident prediction'
        },
        typicalPitfalls: [
          'Premature handover',
          'Insufficient knowledge transfer',
          'Unresolved defects'
        ]
      },
      {
        id: '9.8',
        name: 'Architecture Plateau',
        description: 'A stable, temporary state of the architecture during a transition',
        vendors: [],
        relatedQuestions: [],
        maturityIndicators: {
          1: 'No transition states defined',
          2: 'Basic phasing',
          3: 'Architecture plateaus defined',
          4: 'Incremental architecture transitions',
          5: 'Continuous architecture evolution'
        },
        typicalPitfalls: [
          'Big bang transitions',
          'No interim states',
          'Complexity explosion'
        ]
      },
      {
        id: '9.9',
        name: 'Migration Factories',
        description: 'Structured teams for executing bulk transitions',
        vendors: [],
        relatedQuestions: [],
        maturityIndicators: {
          1: 'Ad-hoc migration',
          2: 'Basic migration team',
          3: 'Migration factory for large initiatives',
          4: 'Scaled migration with offshore capability',
          5: 'Automated migration with AI'
        },
        typicalPitfalls: [
          'Factory loses context',
          'Poor handoff to support',
          'Quality issues at scale'
        ]
      },
      {
        id: '9.10',
        name: 'Benefits Realisation',
        description: 'Track if expected benefits achieved (cost savings, productivity, revenue)',
        vendors: [],
        relatedQuestions: ['Q2.1'],
        maturityIndicators: {
          1: 'No benefits tracking',
          2: 'Basic benefits statement',
          3: 'Benefits tracked post-implementation',
          4: 'Benefits realization framework',
          5: 'Value-driven delivery with continuous measurement'
        },
        typicalPitfalls: [
          'No baseline metrics',
          'Benefits assumed not measured',
          'No accountability'
        ]
      }
    ]
  }
];
