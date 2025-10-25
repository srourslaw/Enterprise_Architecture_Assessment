# COMPLETE ENTERPRISE ARCHITECTURE CONSULTANCY PACK
## **THE HYBRID EDITION - Combining Best Practices from All 6 AI Frameworks**

**Version:** 1.0 Hybrid  
**Framework Basis:** TOGAF 10 + ArchiMate 3.2  
**Language:** Australian English  
**Sources:** Claude Pro, Claude Free, Manus, Grok, DeepSeek, Gemini (Best-of-All)

---

## EXECUTIVE SUMMARY

This comprehensive EA consultancy pack combines the strengths of six leading AI frameworks to create the most complete enterprise architecture assessment and remediation toolkit available. Use this as your single source of truth for client assessments, gap analysis, and strategic roadmapping.

**What's Inside:**
- 10-Layer EA Map with 150+ vendors mapped
- 60+ Assessment Questions across 9 categories
- Maturity Scoring Framework (1-5 scale with NPV/IRR)
- Gap Detection Rules with Risk × Impact × Cost prioritization
- Cost Estimation Framework (SMB/Mid/Enterprise bands)
- Remediation Playbook with 90-day quick wins
- Export Templates (PDF, PowerPoint, CSV)

**Expected Outcomes:**
- 2-week discovery → prioritized roadmap
- 90-day quick wins: 150-300% ROI
- 12-36 month strategic initiatives: 2-3× NPV

---

## 1. COMPLETE EA MAP (10 LAYERS)

### **LAYER 0: STRATEGY & MOTIVATION**
*Purpose: Why we do what we do; strategic goals, regulatory drivers, value streams*

#### Components:

**0.1 Business Strategy & Goals**
- Purpose: Define strategic objectives, growth targets, competitive positioning
- Vendors: Balanced Scorecard (Kaplan Norton), OKR frameworks (Workboard, Perdoo), Strategy maps
- Maturity Indicators:
  - Level 1: No documented strategy
  - Level 2: Strategy documented but not communicated
  - Level 3: Strategy documented and communicated quarterly
  - Level 4: Strategy actively managed with KPIs
  - Level 5: Strategy drives all IT investments, real-time dashboard

**0.2 Stakeholder Requirements**
- Purpose: Capture needs from customers, regulators, shareholders, employees
- Vendors: JIRA/Confluence, ServiceNow CSM, Aha! Roadmaps
- Typical Gaps: Requirements not prioritized, stakeholder map missing

**0.3 Drivers & Constraints**
- Purpose: Regulatory mandates, market forces, budget limits, technical debt
- Vendors: GRC platforms (ServiceNow GRC, LogicGate, OneTrust), compliance registers
- Typical Gaps: Reactive compliance, no regulatory roadmap

**0.4 Value Streams**
- Purpose: End-to-end flows that deliver customer/stakeholder value
- Vendors: Value stream mapping tools, LeanKit, Planview, SAFe Portfolio
- Typical Gaps: Value streams not mapped, handoff delays not measured

**0.5 Architecture Principles**
- Purpose: Guiding rules (Cloud First, API First, Security by Design, Buy Before Build)
- Examples: TOGAF principles repository, custom principle catalogues
- Typical Gaps: Principles exist but not enforced

**0.6 Risk Assessment** *(from Grok)*
- Purpose: Strategic risks and mitigations
- Vendors: Splunk (threat monitoring), Azure AD (identity risks)
- Typical Gaps: No enterprise risk register

**0.7 Innovation Roadmap** *(from Grok)*
- Purpose: Future-oriented initiatives (AI/ML, IoT, blockchain)
- Vendors: GCP (AI/ML innovation), Confluent (real-time data streams)
- Typical Gaps: Innovation ad-hoc, no systematic approach

**0.8 Sustainability Goals (ESG)** *(from Grok)*
- Purpose: Environmental, social, governance considerations
- Vendors: AWS (green cloud), Cloudera (efficient data processing)
- Typical Gaps: No carbon tracking, no ESG reporting

**0.9 Standards & Roadmaps** *(from DeepSeek)*
- Purpose: Prescribed technologies and future state plans
- Examples: Technology radars (ThoughtWorks), approved vendor lists
- Typical Gaps: No standards enforcement, shadow IT

**0.10 Portfolio Management**
- Purpose: Prioritizing initiatives, resource allocation
- Vendors: Planview, ServiceNow PPM, Microsoft Project
- Typical Gaps: Projects not linked to strategy, no benefits tracking

---

### **LAYER 1: BUSINESS ARCHITECTURE**
*Purpose: What the business does; capabilities, processes, org structure*

#### Components:

**1.1 Business Capabilities**
- Purpose: What the business does (Finance, HR, Sales, Operations)
- Vendors: BiZZdesign, Ardoq, LeanIX, Excel capability heat maps
- Key Capabilities to Map: Financial Management, Customer Relationship Mgmt, Supply Chain, Product Development, HR Management, IT Management
- Typical Gaps: Capabilities not mapped to applications, redundant capabilities

**1.2 Business Processes (BPMN)**
- Purpose: How work gets done (Order-to-Cash, Procure-to-Pay, Hire-to-Retire)
- Vendors: Signavio, Camunda, Microsoft Visio, Celonis (process mining)
- Typical Gaps: Process documentation outdated (>2 years), no process owners

**1.3 Organisational Structure**
- Purpose: Divisions, departments, roles, reporting lines
- Vendors: Workday HCM, SAP SuccessFactors, org charts (Lucidchart), Azure AD org data
- Typical Gaps: Org structure in IAM doesn't match HRIS

**1.4 Products & Services**
- Purpose: What the business sells or delivers
- Vendors: Product catalogues (SAP MDM, Informatica MDM), CPQ (Salesforce CPQ, Oracle CPQ)
- Typical Gaps: Product master data duplicated across systems

**1.5 Information Concepts (Business Data)**
- Purpose: Business entities (Customer, Order, Asset) before technical implementation
- Vendors: Business glossaries (Collibra, Alation), enterprise data models
- Typical Gaps: No business glossary, IT and business use different terms

**1.6 Business Events & Policies**
- Purpose: Triggers and rules that govern business decisions
- Vendors: Decision tables, business rules engines (Red Hat Decision Manager, Drools)
- Typical Gaps: Business rules hardcoded in applications

**1.7 Customer Journeys & Personas**
- Purpose: Experience mapping from awareness to post-purchase
- Vendors: Adobe Experience Manager, Miro journey mapping, Smaply
- Typical Gaps: Journeys not mapped, no voice of customer program

**1.8 Performance Metrics (KPIs)**
- Purpose: Measure business performance
- Vendors: Microsoft Dynamics 365 (sales metrics), Salesforce (customer metrics)
- Typical Gaps: KPIs not defined, manual Excel reporting

**1.9 Contracts & Agreements** *(from Grok)*
- Purpose: Formal agreements with stakeholders
- Vendors: DocuSign, Adobe Sign, contract management systems
- Typical Gaps: Contract data siloed, renewal dates not tracked

**1.10 Collaboration & Partner Ecosystems** *(from Grok)*
- Purpose: B2B touchpoints, partner portals
- Vendors: Salesforce Partner Community, Microsoft Teams, SAP Ariba Network
- Typical Gaps: Manual partner onboarding, no API for partners

---

### **LAYER 2: APPLICATION & SERVICES**
*Purpose: Systems that run the business; ERP, CRM, HCM, industry apps*

#### Components:

**2.1 ERP (Enterprise Resource Planning)**
- Purpose: Core transactional systems for finance, HR, procurement, manufacturing
- Vendors:
  - **SAP S/4HANA** (large enterprise, on-prem/cloud/RISE) - Comprehensive, expensive, complex
  - **Oracle ERP Cloud** (cloud-native) - Strong financials, vendor lock-in
  - **Microsoft Dynamics 365 F&O** (mid-market) - Tight Microsoft stack integration
  - **NetSuite** (SMB/mid-market SaaS) - Cloud-native, limited customization
  - **Infor CloudSuite** (industry-specific) - Vertical depth, niche
  - **Workday** (HCM+Finance) - Cloud-only, no on-prem option
- Deployment: On-prem, Cloud (RISE/OCI), Hybrid
- Scale: Enterprise
- Integration Patterns: API via SAP Gateway (OData), RFC, IDoc; integrates with BI, CRM via MuleSoft/Boomi
- Typical Pitfalls: Monolithic customizations, version lock-in, expensive upgrades, poor API exposure, EOL approaching (SAP ECC 2027)
- Maturity Indicators:
  - L1: Spreadsheet-based or legacy ERP (pre-2010)
  - L2: Modern ERP but heavily customized
  - L3: Modern ERP, standard configuration
  - L4: Cloud ERP with API integrations
  - L5: Real-time ERP with embedded analytics

**2.2 CRM (Customer Relationship Management)**
- Purpose: Sales, marketing, service management; 360° customer view
- Vendors:
  - **Salesforce Sales/Service Cloud** (market leader, SaaS) - Extensive ecosystem, expensive add-ons
  - **Microsoft Dynamics 365 CE** (cloud) - Unified with ERP and Office 365
  - **HubSpot** (SMB) - Inbound marketing focus, limited enterprise features
  - **Zoho CRM** (cost-effective) - Good value, less mature
  - **SugarCRM** (open-source option) - Flexible but requires customization
- Deployment: Cloud (SaaS)
- Scale: SMB → Enterprise
- Integration Patterns: REST/SOAP APIs, MuleSoft, Azure Logic Apps, Dell Boomi; integrates with ERP, marketing automation
- Typical Pitfalls: Data silos, duplicate customer records (18-30% typical), weak integration with ERP/billing, shadow CRM in Excel
- Maturity Indicators:
  - L1: Excel or Access database
  - L2: CRM deployed but <50% user adoption
  - L3: CRM with >75% adoption, basic automation
  - L4: CRM with marketing automation, integrated with ERP
  - L5: AI-powered CRM, predictive analytics, real-time customer 360

**2.3 HCM / Workforce Management**
- Purpose: Payroll, talent, recruitment, learning, time & attendance
- Vendors:
  - **Workday HCM** (enterprise, cloud-only) - Best-in-class but expensive
  - **SAP SuccessFactors** (enterprise) - Integrated with SAP ecosystem
  - **Oracle HCM Cloud** (enterprise) - Strong talent management
  - **BambooHR** (SMB) - User-friendly, limited scale
  - **ADP Workforce Now** (mid-market) - Payroll focus, compliance strong
- Integration Patterns: REST APIs (Workday Web Services), SCIM to IAM, integrates with payroll, BI
- Typical Pitfalls: Manual data sync with finance, compliance gaps (Fair Work Act), poor employee self-service, orphaned accounts
- Maturity: L1=Spreadsheets, L5=Integrated talent marketplace

**2.4 Supply Chain & Logistics**
- Purpose: Planning, procurement, warehousing, transport, inventory
- Vendors: SAP IBP, Oracle SCM Cloud, Blue Yonder (JDA), Manhattan Associates WMS, Kinaxis RapidResponse
- Typical Pitfalls: Real-time visibility gaps, poor IoT integration, forecast inaccuracy

**2.5 Finance & Accounting**
- Purpose: GL, AP, AR, tax, financial reporting, consolidation
- Vendors: SAP S/4HANA Finance, Oracle Financials Cloud, NetSuite, Xero (small AU), MYOB (AU SMB), BlackLine (close automation), Concur (expense)
- Typical Pitfalls: Manual reconciliations, no real-time P&L, multi-currency complexity, month-end close >10 days

**2.6 Industry-Specific Applications**
- Mining: **Ellipse** (asset mgmt), **Deswik** (mine planning), **Vulcan** (geology)
- Healthcare: **Epic**, **Cerner** (EMR), **Veeva** (pharma CRM)
- Retail: **SAP for Retail**, POS systems (Square, Lightspeed)
- Finance: **Temenos** (core banking), **FIS**, **Jack Henry**
- Typical Pitfalls: Vendor lock-in, difficult upgrades, limited ecosystems

**2.7 Collaboration & Productivity**
- Purpose: Email, document management, intranet, teams
- Vendors: Microsoft 365 (Teams, SharePoint, Exchange), Google Workspace, Slack, Atlassian Confluence
- Typical Pitfalls: Sprawl of channels, poor governance, shadow IT file shares, no DLP

**2.8 Point Solutions & SaaS Tools**
- Purpose: Niche apps (expense, travel, procurement cards, eSignature)
- Vendors: Concur (SAP), Coupa, DocuSign, Adobe Sign, ApprovalMax
- Typical Pitfalls: Integration spaghetti, duplicate masters, licensing waste, no SSO

**2.9 Custom-Built Applications**
- Purpose: Bespoke systems for unique business processes
- Examples: Internal .NET/Java apps, legacy Access/FileMaker databases
- Typical Pitfalls: No documentation, key-person risk, unsupported frameworks (e.g., Windows Server 2012), no API layer

**2.10 Application Services (APIs, Microservices)**
- Purpose: Composable services exposing business logic via REST/GraphQL
- Vendors: Spring Boot, .NET Core APIs, Node.js services, Azure Functions, AWS Lambda
- Typical Pitfalls: API sprawl, no versioning strategy, poor service discovery, no API gateway

---

### **LAYER 3: DATA & ANALYTICS**
*Purpose: How we store, govern, move, and analyze data; MDM, warehouses, BI, ML*

#### Components:

**3.1 Master Data Management (MDM)**
- Purpose: Golden records for customers, products, suppliers, assets
- Vendors:
  - **Informatica MDM** (enterprise) - Comprehensive, complex
  - **SAP Master Data Governance** - Tight SAP integration
  - **Profisee** (mid-market) - Azure-native, affordable
  - **Reltio Cloud** (SaaS) - Graph-based, real-time
  - **Semarchy** - Agile MDM, low-code
- Typical Pitfalls: Incomplete stewardship, poor data quality (15-30% duplicates typical), batch-only sync, no business buy-in
- Maturity: L1=No MDM, L5=Real-time MDM with AI-powered matching

**3.2 Data Warehousing (Traditional)**
- Purpose: Structured, dimensional models for historical BI
- Vendors: Oracle Exadata, Teradata, Microsoft SQL Server (on-prem), Netezza (sunset)
- Typical Pitfalls: Expensive scaling, rigid schemas, slow to add sources, can't handle unstructured

**3.3 Cloud Data Warehouses**
- Purpose: Elastic, SQL-based analytics storage
- Vendors:
  - **Snowflake** (leader, multi-cloud) - Separate compute/storage, expensive at scale
  - **Azure Synapse Analytics** - Integrated with Azure, complex pricing
  - **Google BigQuery** - Serverless, pay-per-query, great for logs
  - **Amazon Redshift** - Mature, columnar, node-based pricing
- Deployment: Cloud (multi-cloud for Snowflake)
- Integration: REST APIs, ODBC/JDBC, integrates with Power BI, Tableau, dbt, Fivetran
- Typical Pitfalls: Runaway compute costs, poor workload management, data egress fees, no cost controls

**3.4 Data Lakes**
- Purpose: Store raw/semi-structured data at scale (logs, IoT, media)
- Vendors: Azure Data Lake Storage Gen2, AWS S3 + Glue, Google Cloud Storage, Cloudera Data Platform
- Typical Pitfalls: Data swamps (no cataloging), security gaps (open S3 buckets), poor lifecycle management, no data quality

**3.5 Data Lakehouse** *(hybrid pattern)*
- Purpose: Combines lake scalability with warehouse ACID transactions
- Vendors: **Databricks** (Delta Lake), **Snowflake**, Dremio
- Integration: Delta Lake, REST API, integrates with Azure Data Factory, AWS Glue, Kafka, MLflow
- Typical Pitfalls: Vendor lock-in, cost surprises, complexity

**3.6 Data Catalogues & Governance**
- Purpose: Metadata management, lineage, data discovery, glossaries
- Vendors:
  - **Collibra** (enterprise) - Comprehensive, expensive
  - **Alation** - User-friendly, ML-powered
  - **Azure Purview** - Azure-native, affordable
  - **AWS Glue Data Catalog** - Basic, free with Glue
  - **Atlan** - Modern, collaborative
- Typical Pitfalls: Manual curation, stale metadata, low adoption, no lineage

**3.7 ETL / ELT Pipelines**
- Purpose: Extract, transform, load data between systems
- Vendors: Informatica PowerCenter/IICS, Talend, Azure Data Factory, AWS Glue, dbt (transformation), Fivetran (ELT)
- Typical Pitfalls: Brittle scripts, no orchestration, failure handling gaps, no monitoring

**3.8 Real-Time Streaming & Event Processing**
- Purpose: Ingest and process data in motion (IoT, clickstreams, transactions)
- Vendors: **Apache Kafka** (Confluent), AWS Kinesis, Azure Event Hubs, Google Pub/Sub
- Integration: Producer/Consumer APIs, Kafka Connect, Schema Registry
- Typical Pitfalls: Operational complexity, schema registry issues, consumer lag

**3.9 Business Intelligence (BI) Platforms**
- Purpose: Reporting, dashboards, self-service analytics
- Vendors:
  - **Power BI** (Microsoft) - Tight Office integration, affordable
  - **Tableau** (Salesforce) - Superior visualization, expensive
  - **Qlik Sense** - Associative engine, in-memory
  - **Looker** (Google) - Code-based (LookML), developer-friendly
  - **Thoughtspot** - AI-powered search analytics
- Integration: DirectQuery/Live connections, REST API, connects to warehouses, lakes, operational DBs
- Typical Pitfalls: Report sprawl (100s of reports, unused), inconsistent metrics, slow performance, Excel still used as "real" tool

**3.10 Machine Learning (ML) Platforms**
- Purpose: Data science, predictive models, AutoML, model deployment
- Vendors:
  - **Databricks** (notebooks + MLflow) - Unified analytics + ML
  - **Azure Machine Learning** - Azure-native, integrated
  - **AWS SageMaker** - Comprehensive, complex
  - **Google Vertex AI** - AutoML focus
  - **DataRobot** - AutoML, business-user friendly
  - **H2O.ai** - Open-source options
- Typical Pitfalls: Models never productionized, data scientists can't deploy, no MLOps, model drift not monitored

**3.11 Operational Analytics (Embedded)**
- Purpose: Dashboards inside operational apps
- Vendors: Salesforce Einstein Analytics, SAP Analytics Cloud, embedded Power BI, Sisense
- Typical Pitfalls: Limited to single app's data, can't cross-correlate

**3.12 Data Quality & Profiling**
- Purpose: Detect duplicates, validate formats, measure completeness
- Vendors: Informatica Data Quality, Talend Data Quality, Ataccama ONE, Great Expectations (open-source)
- Typical Pitfalls: Quality issues found but not fixed (no data ownership)

**3.13 Data Privacy & Compliance**
- Purpose: GDPR consent, data retention, right to be forgotten, audit trails
- Vendors: **OneTrust**, **BigID**, Securiti.ai, Varonis
- Typical Pitfalls: Manual tracking, no automated data deletion, non-compliance fines (up to $2.5M AUD Privacy Act)

---

### **LAYER 4: INTEGRATION & MIDDLEWARE**
*Purpose: Glue between systems; APIs, ESBs, messaging, orchestration*

#### Components:

**4.1 API Management / Gateway**
- Purpose: Publish, secure, throttle, monitor APIs; centralised policy enforcement
- Vendors:
  - **Azure API Management (APIM)** - Azure-native, hybrid gateway
  - **Apigee** (Google) - Enterprise-grade, complex
  - **MuleSoft Anypoint API Manager** - Part of Anypoint Platform
  - **Kong Gateway** - Open-source, lightweight
  - **AWS API Gateway** - Serverless-friendly
- Deployment: Cloud, self-hosted gateway, hybrid
- Integration: REST/GraphQL/SOAP proxy, OAuth2/JWT validation, integrates with backends, Azure Functions, Logic Apps
- Typical Pitfalls: Gateway becomes bottleneck, complex policies hard to debug, no API versioning strategy, no developer portal

**4.2 Enterprise Service Bus (ESB) / iPaaS**
- Purpose: Centralised messaging and integration hub; orchestrate complex flows
- Vendors:
  - **MuleSoft Anypoint** (leader) - API-led connectivity, expensive
  - **Dell Boomi** - Cloud-native, easy to use
  - **Informatica Cloud Integration** - Strong data integration
  - **Workato** - Low-code, business-user friendly
  - **Jitterbit** - Mid-market, affordable
  - **SnapLogic** - Self-service integration
- Integration: Pre-built connectors (200+ for MuleSoft), REST/SOAP, CloudHub runtime
- Typical Pitfalls: Over-architected (ESB for simple P2P), vendor lock-in, cost per connector, complex licensing

**4.3 Message Broker / Queue**
- Purpose: Asynchronous messaging, guaranteed delivery, decoupling
- Vendors: RabbitMQ, IBM MQ, Azure Service Bus, AWS SQS/SNS, Google Pub/Sub, ActiveMQ
- Integration: Producer → queue → consumer(s); retry on failure
- Typical Pitfalls: Poison messages (never processed), queue depth explosion, no dead-letter handling

**4.4 Event Streaming Platform**
- Purpose: Real-time event backbone, publish-subscribe at scale
- Vendors: **Apache Kafka** (Confluent Cloud/Enterprise), AWS Kinesis, Azure Event Hubs, Google Pub/Sub
- Integration: Change events from DB (CDC) → Kafka → multiple consumers (analytics, cache, search)
- Typical Pitfalls: Schema mismatches, consumer lag, cluster management complexity, no Schema Registry

**4.5 ETL / ELT Tools** *(also in Data layer)*
- Purpose: Batch data movement, transformations
- Vendors: Informatica, Talend, Azure Data Factory, AWS Glue
- Typical Pitfalls: Long-running jobs, failure notification gaps, no incremental load

**4.6 File Transfer (MFT/SFTP)**
- Purpose: Secure bulk file exchange (EDI, bank files, payroll)
- Vendors: IBM Sterling MFT, Axway MFT, GoAnywhere MFT, Azure Files + SFTP
- Typical Pitfalls: Unencrypted files, no audit trail, manual error handling, batch windows

**4.7 RPA (Robotic Process Automation)**
- Purpose: Automate UI-based tasks where APIs not available
- Vendors: UiPath, Blue Prism, Automation Anywhere, Microsoft Power Automate Desktop
- Typical Pitfalls: Brittle (breaks on UI changes), no governance, "shadow IT" bots

**4.8 API Development & Mocking**
- Purpose: Design-first APIs, testing, documentation
- Vendors: Postman, Swagger/OpenAPI, Stoplight, Insomnia
- Typical Pitfalls: Spec drift from implementation, no versioning

**4.9 Service Mesh** *(Microservices)*
- Purpose: Service-to-service comms, observability, circuit breakers
- Vendors: Istio, Linkerd, AWS App Mesh, Azure Service Fabric Mesh
- Typical Pitfalls: Complexity overhead, debugging distributed tracing hard

**4.10 EDI / B2B Integration**
- Purpose: Standards-based document exchange (X12, EDIFACT, HL7, FHIR)
- Vendors: SPS Commerce, TrueCommerce, IBM Sterling B2B Integrator, Cleo Integration Cloud
- Typical Pitfalls: Complex mapping, partner onboarding delays, no testing environment

---

### **LAYER 5: PLATFORM & INFRASTRUCTURE**
*Purpose: Where apps and data run; cloud, on-prem, containers, databases*

#### Components:

**5.1 Cloud IaaS (Infrastructure-as-a-Service)**
- Purpose: Virtual machines, block storage, virtual networks
- Vendors:
  - **Microsoft Azure** (VMs + Virtual Network) - Best for Microsoft shops, hybrid (Arc)
  - **AWS** (EC2 + VPC) - Broadest service catalog, mature
  - **Google Cloud Platform (GCP)** (Compute Engine + VPC) - Strength in data/AI
  - **Oracle Cloud Infrastructure (OCI)** - Best for Oracle workloads
- Deployment: Public Cloud, Hybrid (ExpressRoute/Direct Connect)
- Integration: Native integration across cloud services; VPN/ExpressRoute for hybrid; API Gateway
- Typical Pitfalls: Over-provisioned VMs, unused instances 24/7, no auto-scaling, no tagging (can't chargeback)

**5.2 Cloud PaaS (Platform-as-a-Service)**
- Purpose: Managed app hosting (no OS management), auto-scaling
- Vendors: Azure App Service, AWS Elastic Beanstalk, Google App Engine, Heroku
- Typical Pitfalls: Vendor lock-in (proprietary configs), limited runtime customization

**5.3 Container Orchestration (Kubernetes)**
- Purpose: Run microservices at scale, declarative deployments, self-healing
- Vendors:
  - **Azure Kubernetes Service (AKS)**
  - **AWS EKS**
  - **Google Kubernetes Engine (GKE)**
  - **Red Hat OpenShift**
  - **Rancher**
- Integration: kubectl API, Helm charts, integrates with CI/CD, registries (ACR/ECR)
- Typical Pitfalls: Steep learning curve, complex networking (CNI), security (RBAC, pod policies), cost management

**5.4 Serverless / FaaS (Function-as-a-Service)**
- Purpose: Event-driven code execution, no server management, pay-per-invocation
- Vendors: Azure Functions, AWS Lambda, Google Cloud Functions, Cloudflare Workers
- Typical Pitfalls: Cold starts, timeout limits (15 min), debugging challenges, cost surprises (millions of invocations)

**5.5 Storage (Block, File, Object)**
- Purpose: Persistent storage for apps, backups, archives
- Vendors:
  - Block: Azure Managed Disks, AWS EBS, Google Persistent Disk
  - File: Azure Files (SMB/NFS), AWS EFS, Google Filestore
  - Object: **Azure Blob Storage**, **AWS S3**, **Google Cloud Storage**
- Typical Pitfalls: Wrong storage tier (hot data on archive = slow), no lifecycle policies, data egress fees

**5.6 Database-as-a-Service (DBaaS)**
- Purpose: Managed relational/NoSQL databases, automated backups, HA
- Vendors:
  - Relational: Azure SQL Database, AWS RDS (Postgres/MySQL/Oracle/SQL Server), Google Cloud SQL
  - NoSQL: Azure Cosmos DB (multi-model), AWS DynamoDB, Google Firestore, MongoDB Atlas
- Typical Pitfalls: Vendor-specific features (hard to migrate), cost (IOPS charges), connection limits

**5.7 Network (Load Balancer, CDN, VPN, DNS)**
- Purpose: Connectivity, traffic routing, DDoS protection, content delivery
- Vendors:
  - Load Balancer: Azure Load Balancer/App Gateway, AWS ALB/NLB, Google Cloud Load Balancing
  - CDN: Azure CDN, AWS CloudFront, Cloudflare, Akamai
  - VPN: Azure ExpressRoute, AWS Direct Connect, Google Cloud Interconnect
  - DNS: Azure DNS, Route 53, Cloudflare DNS
- Typical Pitfalls: Network bottlenecks, no redundancy, misconfigured firewall rules (too open)

**5.8 Backup & Disaster Recovery (DR)**
- Purpose: Protect against data loss, meet RTO/RPO requirements
- Vendors: Azure Backup/Site Recovery, AWS Backup, Veeam, Commvault, Rubrik, Zerto
- Typical Pitfalls: Backup testing neglected (restores fail), no documented runbooks, expensive DR environment idle

**5.9 Hybrid Cloud / Multi-Cloud**
- Purpose: Run workloads across on-prem + multiple cloud providers
- Vendors: **Azure Arc**, AWS Outposts, Google Anthos, VMware Cloud Foundation
- Typical Pitfalls: Increased complexity, multiple skillsets required, data gravity (costly egress)

**5.10 On-Premises Datacentre** *(Legacy)*
- Purpose: Owned/leased servers, storage arrays, network equipment
- Vendors: Dell EMC servers + storage, HPE ProLiant, Cisco UCS, NetApp, Pure Storage
- Typical Pitfalls: Capex-heavy, long procurement cycles, over-provisioned, EOL hardware, cooling/power costs ($180K/year typical for co-lo)

**5.11 Edge Computing**
- Purpose: Process data near the source (IoT gateways, retail stores, remote sites)
- Vendors: Azure IoT Edge, AWS IoT Greengrass, Google Cloud IoT Edge, Litmus Edge (industrial)
- Typical Pitfalls: Device management complexity, security patches, intermittent connectivity

---

### **LAYER 6: SECURITY, IDENTITY & GOVERNANCE** *(Cross-Cutting)*
*Purpose: Who can do what, and how we stay safe; IAM, encryption, SIEM, GRC*

#### Components:

**6.1 Identity & Access Management (IAM)**
- Purpose: Centralised user authentication, SSO, MFA, lifecycle (joiner/mover/leaver)
- Vendors:
  - **Azure Active Directory (Entra ID)** - Dominant for cloud, Microsoft ecosystem
  - **Okta** - Best-in-class independent IdP
  - **Ping Identity** - Enterprise federation
  - **Auth0** (by Okta) - Developer-friendly
  - **AWS IAM Identity Center** - AWS-specific
- Deployment: Cloud (SaaS), hybrid (AD Connect)
- Integration: SAML/OAuth2/OIDC, Microsoft Graph API, SCIM provisioning from HRIS, integrates with 1000s of SaaS apps
- Typical Pitfalls: Licensing tiers confusion (P1/P2), Conditional Access setup complex, orphaned accounts (leavers still active avg 7-14 days), no MFA (30-50% typical), privilege creep

**6.2 Privileged Access Management (PAM)**
- Purpose: Control/monitor admin access, session recording, just-in-time elevation
- Vendors: CyberArk, BeyondTrust, Delinea (Thycotic), Azure AD PIM (Privileged Identity Management)
- Typical Pitfalls: Shared admin passwords, no break-glass procedures, unmonitored privileged sessions

**6.3 Endpoint Security (EDR/XDR)**
- Purpose: Detect/respond to threats on laptops, servers (malware, ransomware)
- Vendors: Microsoft Defender for Endpoint, **CrowdStrike Falcon**, SentinelOne, Palo Alto Cortex XDR, Carbon Black
- Typical Pitfalls: Agents not deployed to all endpoints (85% typical), alerts ignored (fatigue), slow patching (30+ days for critical)

**6.4 Network Security (Firewall, IDS/IPS, ZTNA)**
- Purpose: Segment networks, block malicious traffic, zero trust access
- Vendors: Palo Alto Networks Next-Gen Firewall, Fortinet FortiGate, Cisco Secure Firewall, Azure Firewall, **Zscaler** (cloud-native ZTNA)
- Typical Pitfalls: Flat network (lateral movement easy), outdated firewall rules, no segmentation

**6.5 Email & Web Security**
- Purpose: Block phishing, malware, data exfiltration via email/web
- Vendors: Proofpoint, Mimecast, Microsoft Defender for Office 365, Cisco Umbrella (DNS security), Zscaler Internet Access
- Typical Pitfalls: Users bypass security (personal email for work), no URL rewriting, no DMARC

**6.6 Data Loss Prevention (DLP)**
- Purpose: Prevent sensitive data (credit cards, health records) leaving the organisation
- Vendors: Microsoft Purview DLP, Symantec DLP, Forcepoint DLP, Digital Guardian
- Typical Pitfalls: Too many false positives (users find workarounds), no classification labels

**6.7 Encryption (At-Rest, In-Transit, Key Management)**
- Purpose: Protect data confidentiality, meet compliance
- Vendors:
  - Key Management: **Azure Key Vault**, AWS KMS, Google Cloud KMS, HashiCorp Vault, Thales CipherTrust
  - Disk Encryption: Native cloud encryption (default), Vormetric (Thales), BitLocker
- Typical Pitfalls: Keys stored in code (hardcoded), no key rotation, weak encryption (MD5/DES)

**6.8 Security Information & Event Management (SIEM)**
- Purpose: Aggregate logs, correlate events, detect threats, compliance reporting
- Vendors:
  - **Microsoft Sentinel** (cloud, Azure-native) - Affordable, Azure Log Analytics
  - **Splunk Enterprise Security** (on-prem/cloud) - Powerful, expensive
  - **IBM QRadar** - Enterprise-grade
  - **Elastic Security (ELK)** - Open-source option
  - **LogRhythm** - Mid-market
- Integration: Syslog, REST API (HEC), integrates with firewalls, EDR, SOAR, Azure AD
- Typical Pitfalls: Log overload (TB/day, expensive), alert fatigue (100s/day, no tuning), high false positives, expensive licensing ($24K/year for 1GB/day typical)

**6.9 Threat Intelligence & SOAR (Security Orchestration)**
- Purpose: Automate incident response, enrich alerts with threat intel
- Vendors: Palo Alto Cortex XSOAR, Splunk SOAR (Phantom), Microsoft Sentinel playbooks, Anomali ThreatStream
- Typical Pitfalls: No threat intel feeds, manual triage (slow MTTR), playbooks not maintained

**6.10 Vulnerability Management**
- Purpose: Scan for CVEs, misconfigurations, prioritize patching
- Vendors: Qualys, Tenable Nessus, Rapid7 InsightVM, Microsoft Defender Vulnerability Management, Wiz (cloud security posture)
- Typical Pitfalls: Scan results ignored (thousands of CVEs), no SLA for critical patches (avg 30-60 days)

**6.11 Cloud Security Posture Management (CSPM)**
- Purpose: Detect cloud misconfigurations (open S3 buckets, weak IAM policies)
- Vendors: **Wiz**, Prisma Cloud (Palo Alto), Microsoft Defender for Cloud, Orca Security, Lacework
- Typical Pitfalls: No baseline policies, findings not tracked, developers bypass (shadow cloud accounts)

**6.12 Governance, Risk & Compliance (GRC)**
- Purpose: Policy management, audit readiness, risk register, attestations
- Vendors: ServiceNow GRC, OneTrust, RSA Archer, LogicGate, AuditBoard
- Typical Pitfalls: Manual spreadsheets, audit findings not remediated, no continuous compliance

**6.13 Application Security (SAST, DAST, SCA)**
- Purpose: Find vulnerabilities in code before production
- Vendors:
  - SAST (static): SonarQube, Checkmarx, Veracode, Fortify
  - DAST (dynamic): Burp Suite, OWASP ZAP, Acunetix
  - SCA (software composition): **Snyk**, Black Duck, WhiteSource (Mend), Dependabot (GitHub)
- Typical Pitfalls: Scan results not integrated to CI/CD, false positives ignored, no remediation SLA

**6.14 Compliance (Australian-Specific)** *(from Claude Free)*
- **ACSC Essential Eight** - Cyber security baseline
- **Australian Privacy Act 1988** - Privacy compliance (fines up to $2.5M AUD)
- **Fair Work Act** - Employment compliance (HCM systems)
- Typical Pitfalls: No compliance roadmap, reactive approach, fines

---

### **LAYER 7: DEVOPS, CI/CD & OBSERVABILITY**
*Purpose: How we build, deploy, monitor code; source control, pipelines, APM*

#### Components:

**7.1 Source Control & Version Management**
- Purpose: Track code changes, branching, pull requests, code reviews
- Vendors: **GitHub**, GitLab, Azure DevOps Repos, Bitbucket, AWS CodeCommit
- Typical Pitfalls: No branching strategy (direct commits to main), large monorepo (slow clones), no code owners

**7.2 CI/CD (Continuous Integration/Deployment)**
- Purpose: Automate build, test, deploy; fast feedback loops
- Vendors:
  - **GitHub Actions** - YAML workflows, tight with repos
  - **GitLab CI/CD** - Integrated pipelines
  - **Azure Pipelines** - Comprehensive ALM
  - **Jenkins** - Open-source, flexible, complex
  - **CircleCI** - Cloud-native
  - **ArgoCD** - GitOps for K8s
- Integration: Triggers on commit/push; deploys to Azure/AWS/GCP; integrates with Docker, Terraform, security scanning (Snyk)
- Typical Pitfalls: Manual deployments (slow, error-prone), no rollback strategy, flaky tests break pipeline, no automated testing

**7.3 Artifact & Container Registries**
- Purpose: Store build outputs (JARs, Docker images, Helm charts)
- Vendors: Azure Container Registry (ACR), AWS ECR, Google Artifact Registry, Docker Hub, JFrog Artifactory, Harbor
- Typical Pitfalls: No image scanning (vulnerabilities in production), no retention policy (registry bloat)

**7.4 Infrastructure-as-Code (IaC)**
- Purpose: Define infra declaratively (version control, repeatability, DR)
- Vendors: **Terraform** (HashiCorp), Azure Bicep, AWS CloudFormation, Pulumi, Ansible
- Integration: HCL/declarative syntax, state files (S3/Azure Blob), integrates with Azure/AWS/GCP providers
- Typical Pitfalls: Manual changes (state drift), no remote state locking (concurrent apply conflicts), secrets in code

**7.5 Configuration Management**
- Purpose: Install software, configure OS, enforce desired state
- Vendors: **Ansible**, Chef, Puppet, SaltStack, Azure Automation State Configuration
- Typical Pitfalls: Config drift (snowflake servers), no secrets management (passwords in playbooks)

**7.6 Application Performance Monitoring (APM)**
- Purpose: Trace requests end-to-end, identify slow queries, profiling
- Vendors:
  - **Dynatrace** - AI-powered, OneAgent auto-instrumentation
  - **New Relic** - Comprehensive, expensive
  - **AppDynamics (Cisco)** - Enterprise-grade
  - **Datadog APM** - Modern, SaaS
  - **Azure Application Insights** - Azure-native
  - **Elastic APM** - Open-source option
- Integration: OneAgent/SDK in app, distributed tracing, integrates with ServiceNow, PagerDuty, Kubernetes
- Typical Pitfalls: Agent overhead (performance impact), missing instrumentation (blind spots), alerts not actionable

**7.7 Logging & Log Aggregation**
- Purpose: Centralise logs from all systems, search/filter, retention
- Vendors:
  - **Splunk** - Powerful, expensive ($1-5/GB/day)
  - **Elastic Stack (ELK)** - Open-source (Elasticsearch/Logstash/Kibana)
  - **Azure Monitor Logs** - Azure-native
  - **AWS CloudWatch Logs** - AWS-native
  - **Datadog Logs** - SaaS
- Typical Pitfalls: Unstructured logs (hard to parse), log retention too short (incident investigation impossible), no log forwarding from ephemeral containers

**7.8 Metrics & Time-Series Databases**
- Purpose: Collect numeric metrics (CPU, memory, request rate), visualize trends
- Vendors: **Prometheus + Grafana**, Datadog, Azure Monitor Metrics, AWS CloudWatch, InfluxDB, Graphite
- Typical Pitfalls: Cardinality explosion (too many metric labels), no alerting thresholds, dashboards unused

**7.9 Distributed Tracing**
- Purpose: Track a single request across microservices, identify latency
- Vendors: Jaeger, Zipkin, AWS X-Ray, Azure Application Insights (distributed tracing), Datadog APM, Honeycomb
- Typical Pitfalls: Inconsistent trace IDs (broken traces), sampling too aggressive (miss rare issues)

**7.10 Incident Management & On-Call**
- Purpose: Alert routing, escalation, post-incident reviews
- Vendors: **PagerDuty**, Opsgenie (Atlassian), VictorOps (Splunk), ServiceNow ITSM, Jira Service Management
- Integration: REST API, integrates with monitoring (Dynatrace, Splunk), ticketing, CMDB
- Typical Pitfalls: Alert fatigue (too many pages), no runbooks (engineer doesn't know how to fix), blame culture (no blameless postmortems)

**7.11 Chaos Engineering & Resilience Testing**
- Purpose: Inject failures to test system robustness (kill pods, add latency)
- Vendors: Gremlin, Chaos Monkey (Netflix OSS), Chaos Mesh, AWS Fault Injection Simulator
- Typical Pitfalls: No game days, insufficient blast radius controls (chaos in production without approval)

**7.12 Service Level Management (SLI/SLO/SLA)**
- Purpose: Define reliability targets, error budgets, track availability
- Vendors: Built into monitoring tools (Datadog SLOs, Google SRE practices), Nobl9 (SLO platform)
- Typical Pitfalls: No SLOs defined, SLAs with penalties but no internal tracking, no consequences when error budget exhausted

---

### **LAYER 8: UX & PRESENTATION**
*Purpose: How users interact; web portals, mobile apps, dashboards*

#### Components:

**8.1 Web Portals & Customer Interfaces**
- Purpose: Public-facing or customer self-service sites
- Vendors: Sitecore, Adobe Experience Manager (AEM), WordPress (SMB), Contentful (headless CMS)
- Typical Pitfalls: Slow page loads, poor mobile UX, accessibility gaps (WCAG)

**8.2 Mobile Applications (Native & Cross-Platform)**
- Purpose: iOS/Android apps for customers or workforce
- Vendors: React Native, Flutter, Xamarin, native Swift/Kotlin, Azure Mobile Apps
- Typical Pitfalls: Platform fragmentation, app store delays, offline-mode gaps

**8.3 Progressive Web Apps (PWA)**
- Purpose: Web apps with native-like experience (offline, push)
- Vendors: Service workers (standard), Workbox, Azure Static Web Apps
- Typical Pitfalls: Limited iOS support, cache invalidation, notification fatigue

**8.4 Dashboards & Embedded Analytics**
- Purpose: Visualizations embedded in apps
- Vendors: Power BI Embedded, Tableau Embedded, Looker Embedded, Sisense
- Typical Pitfalls: Performance on large datasets, licensing per-user costs, no drill-down

**8.5 Design Systems & Component Libraries**
- Purpose: Consistent UI patterns, accessibility compliance
- Vendors: Material-UI, Ant Design, Microsoft Fluent UI, Bootstrap, Storybook (documentation)
- Typical Pitfalls: Divergent implementations, no version control, poor documentation

**8.6 Accessibility & Compliance**
- Purpose: WCAG 2.1 AA/AAA, screen reader support, keyboard nav
- Vendors: Axe DevTools, WAVE, Lighthouse (Chrome), Pa11y
- Typical Pitfalls: Retrofitting accessibility, no automated testing, missing alt-text

**8.7 Personalisation & A/B Testing**
- Purpose: Dynamic content, experimentation, optimization
- Vendors: Adobe Target, Optimizely, Google Optimize (sunset → GA4 experiments), LaunchDarkly (feature flags)
- Typical Pitfalls: No statistical rigor, test interference, privacy concerns

**8.8 Digital Experience Platform (DXP)** *(from Manus)*
- Purpose: Manages content and user journeys
- Vendors: Sitecore, Adobe Experience Manager, Acquia (Drupal)
- Typical Pitfalls: Expensive, complex implementations

**8.9 Single Sign-On (SSO)** *(from Manus)*
- Purpose: Provides unified authentication experience
- Vendors: Azure AD, Okta (covered in Security layer but also UX concern)

---

### **LAYER 9: IMPLEMENTATION & MIGRATION**
*Purpose: How we deliver change; program management, agile, testing, cutover*

#### Components:

**9.1 Program & Portfolio Management**
- Purpose: Track initiatives, dependencies, budgets, benefits realization
- Vendors: Microsoft Project, Azure DevOps (Boards), Jira (Atlassian), Planview, ServiceNow PPM
- Typical Pitfalls: Disconnected from delivery, stale roadmaps, no retrospectives

**9.2 Agile Delivery & Scrum/Kanban**
- Purpose: Iterative development, sprint planning, retrospectives
- Vendors: Jira Software, Azure DevOps, Rally (Broadcom), VersionOne, Trello (simple)
- Typical Pitfalls: Agile theatre, no definition of done, burnout from velocity pressure

**9.3 Change Management & Training**
- Purpose: Stakeholder engagement, comms, training materials, adoption
- Vendors: Prosci ADKAR, WalkMe (digital adoption), ServiceNow Learning, custom LMS
- Typical Pitfalls: Late engagement, generic training, no super-user network

**9.4 Data Migration & Cutover**
- Purpose: Extract, transform, validate, load legacy data; go-live planning
- Vendors: Azure Data Factory, Talend, custom ETL scripts, SQL Server SSIS
- Typical Pitfalls: Data quality issues (15-30% errors typical), incomplete reconciliation, rollback plan missing

**9.5 Testing & Quality Assurance**
- Purpose: Functional, performance, security, UAT
- Vendors: Selenium, Playwright, Azure Load Testing, JMeter, Tosca (test automation)
- Typical Pitfalls: No test data management, environment unavailability, late defect discovery

**9.6 Deployment & Cutover Management**
- Purpose: Go-live orchestration, rollback procedures, hypercare
- Vendors: Runbook automation (Ansible), Azure Pipelines, manual checklists, war rooms
- Typical Pitfalls: No dress rehearsal, missing rollback scripts, poor coordination

**9.7 Hypercare & Stabilisation**
- Purpose: Post-go-live support, defect triage, user support, tuning
- Vendors: ServiceNow Incident, dedicated hypercare team, escalation to vendors
- Typical Pitfalls: Premature handover, insufficient knowledge transfer, unresolved defects

**9.8 Architecture Plateau** *(from Manus)*
- Purpose: A stable, temporary state of the architecture during a transition
- Examples: Phase 1 (parallel run), Phase 2 (cutover), Phase 3 (decommission)

**9.9 Migration Factories** *(from DeepSeek)*
- Purpose: Structured teams for executing bulk transitions (offshore/nearshore)
- Examples: Cloud migration factory (100s of VMs), data migration factory
- Typical Pitfalls: Factory loses context, poor handoff to support

**9.10 Benefits Realisation**
- Purpose: Track if expected benefits achieved (cost savings, productivity, revenue)
- Examples: KPIs defined pre-project, measured 3/6/12 months post-go-live
- Typical Pitfalls: No baseline metrics, benefits assumed not measured, no accountability

---

## 2. COMPREHENSIVE ASSESSMENT QUESTION BANK (60+ Questions)

### **Category 1: Company Profile (4 questions)**

**Q1.1:** What is your annual revenue?
- A) < $10M (Score: 1 = SMB)
- B) $10M - $100M (Score: 2 = Mid-market lower)
- C) $100M - $1B (Score: 3 = Mid-market upper)
- D) > $1B (Score: 4 = Enterprise)

**Affects:** Overall scale assessment, vendor recommendations (NetSuite vs SAP)

---

**Q1.2:** How many employees do you have?
- A) < 50 (Score: 1 = Small)
- B) 50-500 (Score: 2 = Mid-market)
- C) 500-5000 (Score: 3 = Large)
- D) > 5000 (Score: 4 = Enterprise)

**Affects:** HCM requirements, collaboration tool scale

---

**Q1.3:** What is your primary industry vertical?
- A) Mining / Resources
- B) Healthcare / Life Sciences
- C) Financial Services / Banking
- D) Retail / E-commerce
- E) Manufacturing / Industrial
- F) Professional Services
- G) Government / Education
- H) Other

**Affects:** Industry-specific application recommendations (Ellipse for mining, Epic for healthcare)

---

**Q1.4:** What is your primary geographic footprint?
- A) Australia only
- B) Asia-Pacific (APAC)
- C) Global (multi-region)
- D) Single city/state

**Affects:** Data residency requirements, multi-region cloud architecture, compliance (GDPR, Privacy Act)

---

### **Category 2: Strategic Drivers (4 questions)**

**Q2.1:** What are your top 3 business goals? (Select up to 3)
- A) Cost reduction / operational efficiency
- B) Revenue growth / market expansion
- C) Digital transformation
- D) Risk reduction / compliance
- E) Innovation / new products
- F) Customer experience improvement
- G) Sustainability / ESG

**Affects:** Strategy layer maturity, prioritization of initiatives

---

**Q2.2:** What regulatory requirements apply to your business? (Select all)
- A) GDPR (EU customers)
- B) Australian Privacy Act 1988
- C) ACSC Essential Eight (cyber security)
- D) ISO 27001 (information security)
- E) APRA (financial services)
- F) TGA / FDA (pharmaceuticals)
- G) Fair Work Act (employment)
- H) None / Minimal

**Affects:** Security/Compliance layer maturity, data governance requirements

---

**Q2.3:** Do you have a documented IT strategy aligned to business strategy?
- A) Yes, current (updated in last 12 months) (Score: 5)
- B) Yes, but outdated (>12 months old) (Score: 3)
- C) In development (Score: 2)
- D) No formal IT strategy (Score: 1)

**Affects:** Strategy & Motivation layer maturity

---

**Q2.4:** What is the primary driver for technology change in your organisation?
- A) Competitive pressure
- B) Regulatory / compliance requirements
- C) Customer demand
- D) Technology refresh (EOL systems)
- E) Merger & Acquisition (M&A)
- F) Cost reduction
- G) No active change drivers

**Affects:** Urgency of transformation, budget availability

---

### **Category 3: Applications & Systems (10 questions)**

**Q3.1:** What ERP system do you use?
- A) SAP S/4HANA (cloud or on-prem) (Score: 5 = Modern)
- B) SAP ECC 6.0 (legacy, approaching EOL 2027) (Score: 2 = Critical gap)
- C) Oracle ERP Cloud (Score: 5)
- D) Microsoft Dynamics 365 Finance & Operations (Score: 4)
- E) NetSuite (Score: 4)
- F) Xero / MYOB (small business) (Score: 3)
- G) Custom / legacy ERP (Score: 1 = High risk)
- H) No ERP / Spreadsheets (Score: 1 = Critical gap)

**Affects:** Application layer maturity, ERP modernization gap, integration complexity

---

**Q3.2:** What CRM system do you use?
- A) Salesforce (Sales/Service Cloud) (Score: 5)
- B) Microsoft Dynamics 365 Customer Engagement (Score: 4)
- C) HubSpot (Score: 4)
- D) Zoho CRM (Score: 3)
- E) Custom CRM (Score: 2)
- F) Excel / Access database (Score: 1 = Critical gap)
- G) No CRM (Score: 1)

**Affects:** Application layer, CRM integration with ERP, data quality (duplicate customers)

---

**Q3.3:** What HCM / HRIS system do you use?
- A) Workday HCM (Score: 5)
- B) SAP SuccessFactors (Score: 4)
- C) Oracle HCM Cloud (Score: 4)
- D) BambooHR (Score: 4)
- E) ADP Workforce Now (Score: 3)
- F) Payroll service only (no HRIS) (Score: 2)
- G) Spreadsheets (Score: 1 = Critical gap)

**Affects:** Application layer, IAM integration (SCIM provisioning), compliance (Fair Work Act)

---

**Q3.4:** How many SaaS applications does your organisation use?
- A) 0-10 (Score: 3 = Well-managed)
- B) 10-30 (Score: 4 = Typical)
- C) 30-100 (Score: 2 = Sprawl risk)
- D) > 100 (Score: 1 = Critical sprawl)
- E) Unknown (Score: 1 = No governance)

**Affects:** Application layer, integration complexity, licensing waste, shadow IT

---

**Q3.5:** Do you have custom-built applications (bespoke software)?
- A) Yes, many (>10 applications) (Score: 1 = High key-person risk)
- B) Yes, a few (3-10 applications) (Score: 2)
- C) Yes, 1-2 critical apps (Score: 3)
- D) No, all COTS/SaaS (Score: 5 = Low risk)

**Affects:** Application layer, technical debt, key-person risk, documentation gaps

---

**Q3.6:** What is your primary application deployment model?
- A) Mostly on-premises (Score: 2 = Legacy)
- B) Mostly cloud / SaaS (Score: 5 = Modern)
- C) Hybrid (mix of on-prem and cloud) (Score: 3)
- D) Migrating to cloud (in progress) (Score: 4)

**Affects:** Platform/Infrastructure layer, cloud migration initiative

---

**Q3.7:** Do you have industry-specific applications? (e.g., mining planning, EMR, POS)
- A) Yes, mission-critical (Score: depends on integration)
- B) Yes, but planning to replace (Score: 2)
- C) No, using general-purpose apps (Score: 3)

**Affects:** Vendor lock-in risk, integration complexity

---

**Q3.8:** What is the average age of your core business applications?
- A) < 3 years (modern) (Score: 5)
- B) 3-7 years (current) (Score: 4)
- C) 7-15 years (aging) (Score: 2)
- D) > 15 years (legacy) (Score: 1 = EOL risk)

**Affects:** Technical debt, vendor support risk, upgrade urgency

---

**Q3.9:** Are your applications API-enabled (expose REST/SOAP APIs)?
- A) Yes, all core apps have APIs (Score: 5)
- B) Yes, most apps (>75%) (Score: 4)
- C) Some apps (25-75%) (Score: 2)
- D) Few or no APIs (Score: 1 = Integration gap)

**Affects:** Integration layer maturity, API gateway need

---

**Q3.10:** What is your application licensing spend annually?
- A) < $100K (Score: 1 = SMB)
- B) $100K - $500K (Score: 2)
- C) $500K - $2M (Score: 3)
- D) > $2M (Score: 4)
- E) Unknown (Score: 1 = No FinOps)

**Affects:** Licensing optimization opportunity, application rationalization ROI

---

### **Category 4: Data & Analytics (8 questions)**

**Q4.1:** Do you have a data warehouse?
- A) Yes, cloud-based (Snowflake, Synapse, BigQuery) (Score: 5)
- B) Yes, on-premises (Teradata, Oracle Exadata) (Score: 3)
- C) No, but planning to build one (Score: 2)
- D) No data warehouse (Score: 1 = Critical gap)

**Affects:** Data layer maturity, analytics capability

---

**Q4.2:** Do you have Master Data Management (MDM)?
- A) Yes, formal MDM platform (Informatica, SAP MDG) (Score: 5)
- B) Informal MDM (manual data stewardship) (Score: 3)
- C) No MDM (Score: 1 = Critical gap, expect 15-30% duplicates)

**Affects:** Data quality, duplicate customer/product records, reporting accuracy

---

**Q4.3:** What Business Intelligence (BI) tool do you use?
- A) Power BI (Score: 5)
- B) Tableau (Score: 5)
- C) Qlik Sense (Score: 4)
- D) SAP Analytics Cloud (Score: 4)
- E) Excel only (Score: 1 = Critical gap)
- F) No BI tool (Score: 1)

**Affects:** Data layer, self-service analytics maturity, report sprawl risk

---

**Q4.4:** Do you use Machine Learning (ML) or AI?
- A) Yes, ML models in production (Score: 5)
- B) Yes, piloting / POC stage (Score: 3)
- C) No, but planned (Score: 2)
- D) No ML/AI capability (Score: 1)

**Affects:** Data layer, ML platform need, advanced analytics maturity

---

**Q4.5:** What is your data quality level?
- A) Severe issues (>30% duplicates, missing data) (Score: 1 = Critical)
- B) Moderate issues (10-30% duplicates) (Score: 2)
- C) Minor issues (<10% duplicates) (Score: 4)
- D) Excellent (data quality actively managed) (Score: 5)
- E) Unknown (Score: 1 = No data governance)

**Affects:** MDM urgency, data governance program need, reporting trust

---

**Q4.6:** How do you handle customer duplicates?
- A) Automated deduplication (MDM platform) (Score: 5)
- B) Manual cleanup (periodic) (Score: 2)
- C) Don't actively manage duplicates (Score: 1 = High cost)
- D) N/A (no customer data) (Score: N/A)

**Affects:** MDM gap, operational inefficiency (manual effort)

---

**Q4.7:** Do you have a data catalogue / data governance platform?
- A) Yes, formal data catalogue (Collibra, Alation, Purview) (Score: 5)
- B) Informal data inventory (Excel) (Score: 2)
- C) No data catalogue (Score: 1 = Discovery gap)

**Affects:** Data governance maturity, data discoverability, compliance (Privacy Act)

---

**Q4.8:** What is your data privacy/compliance posture?
- A) Automated compliance (OneTrust, BigID) (Score: 5)
- B) Manual tracking (spreadsheets) (Score: 2)
- C) No formal privacy program (Score: 1 = Compliance risk, potential $2.5M AUD fine)

**Affects:** Data privacy gap, GDPR/Privacy Act compliance, audit risk

---

### **Category 5: Integration (5 questions)**

**Q5.1:** How many integrations (system-to-system connections) do you have?
- A) < 10 (Score: 3 = Manageable)
- B) 10-30 (Score: 3)
- C) 30-100 (Score: 2 = Complexity)
- D) > 100 (Score: 1 = Spaghetti risk)
- E) Unknown (Score: 1 = No governance)

**Affects:** Integration layer complexity, API gateway/ESB need

---

**Q5.2:** What is your primary integration approach?
- A) API gateway / API management platform (Score: 5)
- B) ESB or iPaaS (MuleSoft, Boomi) (Score: 4)
- C) Point-to-point (custom code) (Score: 2 = Brittle)
- D) Manual file transfers (SFTP, CSV) (Score: 1 = Critical gap)
- E) Mix of approaches (Score: 2)

**Affects:** Integration layer maturity, integration failure rate, change agility

---

**Q5.3:** Do you have an API management platform?
- A) Yes, in production (Azure APIM, Apigee, MuleSoft) (Score: 5)
- B) Planned / piloting (Score: 3)
- C) No API management (Score: 1 = Security/observability gap)

**Affects:** API governance, security, rate limiting, developer portal

---

**Q5.4:** What is your integration failure rate?
- A) < 1% (Score: 5 = Excellent)
- B) 1-5% (Score: 4 = Good)
- C) 5-15% (Score: 2 = High)
- D) > 15% (Score: 1 = Critical)
- E) Unknown (Score: 1 = No monitoring)

**Affects:** Integration layer health, need for error handling/retry logic

---

**Q5.5:** How is integration monitoring performed?
- A) Centralized monitoring (APIM, ESB dashboard) (Score: 5)
- B) Basic logging (Splunk, Azure Monitor) (Score: 3)
- C) No monitoring / reactive (Score: 1 = Blind spot)

**Affects:** Observability gap, mean-time-to-detect (MTTD)

---

### **Category 6: Infrastructure & Cloud (7 questions)**

**Q6.1:** What is your primary cloud provider?
- A) Microsoft Azure (Score: 4)
- B) Amazon Web Services (AWS) (Score: 4)
- C) Google Cloud Platform (GCP) (Score: 4)
- D) Multi-cloud (2+ providers) (Score: 3 = Complex)
- E) On-premises only (Score: 1 = Legacy)

**Affects:** Platform layer, cloud migration roadmap, vendor lock-in

---

**Q6.2:** What is your cloud strategy?
- A) Cloud-first (default to cloud for new workloads) (Score: 5)
- B) Hybrid (mix of cloud and on-prem) (Score: 3)
- C) On-prem first (cloud only for specific use cases) (Score: 2)
- D) No formal cloud strategy (Score: 1)

**Affects:** Platform layer maturity, cloud migration urgency

---

**Q6.3:** Do you use containers and/or Kubernetes?
- A) Yes, extensively (production workloads on K8s) (Score: 5)
- B) Yes, piloting (dev/test only) (Score: 3)
- C) No, but planned (Score: 2)
- D) No containers (Score: 1 = Limited scalability)

**Affects:** Platform layer, microservices maturity, DevOps capability

---

**Q6.4:** Do you use Infrastructure-as-Code (IaC)?
- A) Yes, Terraform / Bicep / CloudFormation (Score: 5)
- B) Partially (some infra automated) (Score: 3)
- C) No IaC (manual provisioning) (Score: 1 = Config drift risk)

**Affects:** DevOps layer, infrastructure repeatability, disaster recovery

---

**Q6.5:** How do you manage cloud costs?
- A) Formal FinOps program (tagging, cost allocation, optimization) (Score: 5)
- B) Basic tagging and monitoring (Score: 3)
- C) No cost controls (Score: 1 = 20-40% waste typical)

**Affects:** Cloud cost optimization opportunity ($50K-$500K savings typical)

---

**Q6.6:** What percentage of your infrastructure is in the cloud vs on-premises?
- A) 100% cloud (Score: 5)
- B) 75-99% cloud (Score: 4)
- C) 25-75% cloud (hybrid) (Score: 3)
- D) < 25% cloud (mostly on-prem) (Score: 2)
- E) 0% cloud (all on-prem) (Score: 1)

**Affects:** Cloud migration roadmap, hybrid complexity

---

**Q6.7:** Do you have a disaster recovery (DR) plan?
- A) Yes, tested regularly (annual DR test) (Score: 5)
- B) Yes, documented but not tested (Score: 3)
- C) No formal DR plan (Score: 1 = Business continuity risk)

**Affects:** Platform layer, RTO/RPO gap, downtime cost risk ($100K-$1M/hour)

---

### **Category 7: Security & Compliance (8 questions)**

**Q7.1:** What identity management system do you use?
- A) Azure Active Directory (Entra ID) (Score: 5)
- B) Okta (Score: 5)
- C) On-premises Active Directory only (Score: 2 = Legacy)
- D) Mix of AD and cloud IdP (Score: 3)
- E) No centralized IAM (Score: 1 = Critical gap)

**Affects:** Security layer, SSO capability, IAM modernization gap

---

**Q7.2:** Is Multi-Factor Authentication (MFA) enforced?
- A) Yes, for all users (100%) (Score: 5)
- B) Yes, for admins only (Score: 3)
- C) No MFA (Score: 1 = Critical security gap, 70% breach risk reduction with MFA)
- D) Partial (some users) (Score: 2)

**Affects:** Security posture, account compromise risk

---

**Q7.3:** Do you have a Security Information and Event Management (SIEM) system?
- A) Yes, Splunk / Microsoft Sentinel / other SIEM (Score: 5)
- B) Basic logging (Azure Monitor, CloudWatch) (Score: 2)
- C) No SIEM (Score: 1 = Blind to threats, MTTD >3 days typical)

**Affects:** Security layer, threat detection capability, compliance (ACSC Essential Eight)

---

**Q7.4:** Is data encrypted at rest (in databases, storage)?
- A) Yes, all data encrypted (Score: 5)
- B) Partial encryption (critical data only) (Score: 3)
- C) No encryption (Score: 1 = Compliance violation, Privacy Act breach risk)
- D) Unknown (Score: 1)

**Affects:** Security layer, compliance gap, data protection

---

**Q7.5:** When was your last penetration test?
- A) < 6 months ago (Score: 5)
- B) 6-12 months ago (Score: 4)
- C) > 1 year ago (Score: 2)
- D) Never (Score: 1 = Unknown vulnerabilities)

**Affects:** Security posture, vulnerability management gap

---

**Q7.6:** How many security incidents (breaches, ransomware, data loss) have you had in the last 12 months?
- A) 0 incidents (Score: 5)
- B) 1-3 incidents (Score: 3)
- C) 4-10 incidents (Score: 1 = Serious gap)
- D) > 10 incidents (Score: 1 = Critical)
- E) Unknown (Score: 1 = No incident tracking)

**Affects:** Security layer maturity, incident response gap

---

**Q7.7:** Do you have orphaned user accounts (former employees still with access)?
- A) No, accounts deactivated within 24 hours (Score: 5)
- B) Accounts deactivated within 1 week (Score: 3)
- C) Average 2+ weeks to deactivate (Score: 1 = Insider threat risk)
- D) Unknown (Score: 1)

**Affects:** IAM gap, privileged access risk, audit finding

---

**Q7.8:** Do you have a Data Loss Prevention (DLP) solution?
- A) Yes, DLP deployed (Microsoft Purview, Symantec) (Score: 5)
- B) Planned (Score: 2)
- C) No DLP (Score: 1 = Data exfiltration risk)

**Affects:** Security layer, data protection, compliance (Privacy Act)

---

### **Category 8: DevOps & Delivery (6 questions)**

**Q8.1:** Do you have a CI/CD pipeline?
- A) Yes, fully automated (build, test, deploy) (Score: 5)
- B) Partially automated (manual steps remain) (Score: 3)
- C) Manual deployments only (Score: 1 = Slow, error-prone)

**Affects:** DevOps layer, deployment frequency, release quality

---

**Q8.2:** What is your deployment frequency?
- A) Multiple deployments per day (Score: 5 = Elite)
- B) Daily (Score: 4 = High)
- C) Weekly (Score: 3 = Medium)
- D) Monthly (Score: 2 = Low)
- E) Quarterly or less (Score: 1 = Very low)

**Affects:** DevOps maturity, time-to-market, agility

---

**Q8.3:** What source control system do you use?
- A) Git (GitHub, GitLab, Azure DevOps) (Score: 5)
- B) SVN / other legacy (Score: 2)
- C) No source control (Score: 1 = Critical gap)

**Affects:** DevOps layer, code collaboration, version control

---

**Q8.4:** Do you have monitoring and observability (APM, logging, metrics)?
- A) Yes, full APM (Dynatrace, Datadog, New Relic) (Score: 5)
- B) Basic monitoring (Prometheus, CloudWatch) (Score: 3)
- C) No monitoring (Score: 1 = Blind to issues)

**Affects:** DevOps layer, incident response, mean-time-to-recovery (MTTR)

---

**Q8.5:** What is your mean time to detect (MTTD) security incidents or outages?
- A) < 15 minutes (Score: 5)
- B) < 1 hour (Score: 4)
- C) < 1 day (Score: 2)
- D) > 1 day (Score: 1 = Critical)
- E) Unknown (Score: 1)

**Affects:** Observability gap, SIEM need, alerting maturity

---

**Q8.6:** Do you have automated testing?
- A) Yes, comprehensive (unit, integration, performance, security) (Score: 5)
- B) Some automated tests (unit tests only) (Score: 3)
- C) No automated testing (manual QA only) (Score: 1 = Quality risk)

**Affects:** DevOps layer, release quality, test coverage

---

### **Category 9: Pain Points & Priorities (5 questions)**

**Q9.1:** What is your biggest technology pain point?
- A) Data silos (can't get single view of customer/operations)
- B) Slow delivery (projects take too long)
- C) High costs (IT budget out of control)
- D) Security risks (breaches, compliance gaps)
- E) Manual processes (too much manual work, Excel-heavy)
- F) Poor visibility (can't see what's happening in real-time)

**Affects:** Prioritization of initiatives, quick win selection

---

**Q9.2:** How long does your month-end financial close take?
- A) < 3 days (Score: 5 = Best practice)
- B) 3-7 days (Score: 4)
- C) 7-14 days (Score: 2)
- D) > 14 days (Score: 1 = Significant efficiency gap)

**Affects:** Finance process automation opportunity, ERP/BI gap

---

**Q9.3:** What percentage of your IT budget is spent on "run-the-bank" (maintenance) vs "change-the-bank" (innovation)?
- A) 70%+ run, <30% change (Score: 1 = Too much maintenance)
- B) 50-70% run, 30-50% change (Score: 2)
- C) 30-50% run, 50-70% change (Score: 4)
- D) < 30% run, 70%+ change (Score: 5 = Innovation-focused)
- E) Unknown (Score: 1)

**Affects:** Technical debt level, modernization urgency

---

**Q9.4:** What is your biggest upcoming technology initiative?
- A) ERP upgrade / replacement
- B) Cloud migration
- C) Data platform / analytics
- D) Security uplift
- E) Digital transformation
- F) Application modernization
- G) No major initiative planned

**Affects:** Alignment of EA roadmap, budget availability

---

**Q9.5:** What is your IT team size (FTEs)?
- A) < 10 (Score: 1 = Small, likely outsourced)
- B) 10-50 (Score: 2)
- C) 50-200 (Score: 3)
- D) > 200 (Score: 4)

**Affects:** Delivery capacity, need for external partners, governance overhead

---

## 3. MATURITY SCORING FRAMEWORK

### **Overall EA Maturity Scale (1-5)**

**Level 1: Initial / Ad-Hoc**
- No documented processes
- Reactive (firefighting)
- High key-person risk
- Example: Excel-based systems, no IT strategy, manual deployments

**Level 2: Developing / Managed**
- Basic processes documented
- Some governance
- Vendor tools deployed but underutilized
- Example: ERP deployed but heavily customized, basic BI, some cloud usage

**Level 3: Defined / Standardized**
- Processes documented and followed
- Clear ownership
- Governance framework in place
- Example: Standard ERP, API gateway, IAM with SSO, basic automation

**Level 4: Managed / Measured**
- Processes actively monitored
- Continuous improvement
- Metrics-driven decisions
- Example: Cloud-native architecture, CI/CD pipelines, SLO tracking, MDM

**Level 5: Optimized / Innovative**
- Fully automated
- Proactive (predictive)
- Continuous innovation
- Example: Real-time ERP analytics, AI/ML in production, zero-trust security, full observability

---

### **Scoring Algorithm**

**Per Component:**
```
Component Maturity = Average(Related Question Scores)
```

**Per Layer:**
```
Layer Maturity = Weighted Average(Component Maturities)
```

**Overall EA Maturity:**
```
Overall Maturity = Average(All Layer Maturities)
```

**Maturity Label:**
- 1.0 - 1.9 = "Initial" (Critical attention needed)
- 2.0 - 2.9 = "Developing" (Significant gaps)
- 3.0 - 3.9 = "Defined" (On track)
- 4.0 - 4.9 = "Managed" (Above average)
- 5.0 = "Optimized" (Best-in-class)

---

## 4. GAP DETECTION RULES & PRIORITIZATION

### **Gap Detection Matrix**

| **Gap Type** | **Trigger Condition** | **Risk** | **Impact** | **Cost** |
|--------------|-----------------------|----------|------------|----------|
| **No MFA** | Q7.2 = C (No MFA) | 5 | 5 | S (1) |
| **SAP ECC EOL** | Q3.1 = B (SAP ECC) | 5 | 5 | XL (5) |
| **No MDM** | Q4.2 = C (No MDM) + Q4.5 = A/B (Severe/Moderate data quality) | 4 | 4 | L (4) |
| **Point-to-Point Integration** | Q5.2 = C (P2P) OR Q5.1 = C/D (30+ integrations) | 5 | 3 | M (3) |
| **No API Gateway** | Q5.3 = C (No APIM) | 4 | 3 | S (1) |
| **No SIEM** | Q7.3 = C (No SIEM) | 5 | 4 | M (3) |
| **Manual Deployments** | Q8.1 = C (Manual) | 3 | 3 | M (3) |
| **Cloud Sprawl** | Q6.5 = C (No cost controls) | 3 | 2 | S (1) |
| **No Data Warehouse** | Q4.1 = D (No DW) | 2 | 4 | M (3) |
| **Orphaned Accounts** | Q7.7 = C (2+ weeks to deactivate) | 5 | 4 | S (1) |
| **No DR Plan** | Q6.7 = C (No DR) | 5 | 5 | M (3) |
| **Excel-based Finance** | Q3.1 = H (No ERP) | 4 | 5 | XL (5) |
| **Manual Month-End Close** | Q9.2 = D (>14 days) | 2 | 4 | M (3) |
| **No Encryption** | Q7.4 = C (No encryption) | 5 | 5 | S (1) |
| **No BI Tool** | Q4.3 = E/F (Excel only / No BI) | 2 | 3 | S (1) |

---

### **Prioritization Formula** *(from Manus + Claude Free)*

```
Priority Score = (Risk × Business Impact) / Remediation Cost

Where:
- Risk: 1-5 (1=low, 5=critical security/compliance)
- Business Impact: 1-5 (1=minor, 5=revenue/regulatory)
- Remediation Cost: 1-5 (S=1, M=2, L=3, XL=4, XXL=5)
```

**Priority Bands:**
- **Critical (Score ≥ 8):** Address in 0-3 months (Quick Wins if Cost = S/M)
- **High (Score 5-7):** Address in 6-12 months
- **Medium (Score 3-4):** Address in 12-24 months
- **Low (Score < 3):** Address in 24-36 months or defer

---

## 5. COST ESTIMATION FRAMEWORK

### **5.1 Remediation Cost Bands** *(from Claude Free)*

| **Initiative** | **SMB (<$10M)** | **Mid-Market ($10M-$1B)** | **Enterprise (>$1B)** | **Timeline** |
|----------------|-----------------|---------------------------|-----------------------|--------------|
| **API Gateway (Azure APIM/Apigee)** | $50K-$150K | $150K-$400K | $400K-$1M | 2-6 months |
| **MDM (Informatica/Reltio)** | $200K-$500K | $500K-$1.5M | $1.5M-$5M | 9-18 months |
| **Cloud Data Platform (Snowflake/Synapse)** | $100K-$300K | $300K-$1M | $1M-$3M | 6-12 months |
| **ESB/iPaaS (MuleSoft/Boomi)** | $150K-$400K | $400K-$1.2M | $1.2M-$3M | 6-12 months |
| **ERP Migration (SAP ECC → S/4HANA)** | N/A | $2M-$8M | $8M-$30M+ | 18-36 months |
| **SIEM (Splunk/Sentinel) + IAM + PAM** | $100K-$250K | $250K-$800K | $800K-$2M | 6-12 months |
| **DevOps CI/CD Standardization** | $50K-$150K | $150K-$500K | $500K-$1.5M | 4-9 months |
| **Data Governance (Collibra + Stewardship)** | $150K-$400K | $400K-$1.2M | $1.2M-$3M | 12-24 months |
| **Cloud Migration (per 100 VMs)** | $100K-$300K | $300K-$600K | $600K-$1.2M | 6-12 months |
| **Security Uplift (MFA + Encryption + DLP)** | $50K-$150K | $150K-$400K | $400K-$1M | 3-6 months |

---

### **5.2 Business Case Methodology** *(from Claude Free)*

**NPV Calculation:**
```
NPV = Σ (Benefits - Costs) / (1 + Discount Rate)^Year

Where:
- Benefits: Cost savings + revenue uplift + risk avoidance
- Costs: Capex (software, consulting) + Opex (ongoing licenses, support)
- Discount Rate: 8-12% (typical corporate)
- Timeline: 3-5 years
```

**IRR (Internal Rate of Return):**
```
IRR = Discount rate where NPV = 0
```

**Example Business Case (API Gateway):**
```
Investment (Year 0): $200K
Benefits (Year 1-3):
  - Integration failure reduction: 80% → Save 500 hours/year × $150/hr = $75K/year
  - Faster integration delivery: 30% reduction in dev time = $50K/year
  - Avoided security incident: 50% risk reduction × $500K incident = $250K over 3 years
Total Benefits (3 years): $125K × 3 + $250K = $625K
NPV (@ 10% discount): $625K / (1.1^1.5) - $200K = $328K
ROI: 164% over 3 years
IRR: 42%
```

---

### **5.3 Expected ROI by Initiative Type** *(Conservative Estimates)*

| **Initiative** | **Expected ROI** | **Payback Period** | **Key Benefit Drivers** |
|----------------|------------------|--------------------|-------------------------|
| **Cloud Cost Optimization (FinOps)** | 150-300% Year 1 | 2-4 months | Rightsizing VMs, reserved instances, eliminating waste |
| **API Gateway** | 150-250% (3 years) | 12-18 months | Reduced integration failures, faster delivery, security |
| **MDM (Customer)** | 200-400% (3 years) | 18-24 months | Reduced duplicates (marketing ROI), improved customer experience |
| **SIEM + Security Uplift** | 300-500% (3 years) | 6-12 months | Avoided breach ($2M-$10M), reduced cyber insurance premium |
| **DevOps CI/CD** | 200-400% (3 years) | 9-15 months | Faster releases (revenue), reduced defects (cost), less manual effort |
| **ERP Modernization** | 150-250% (5 years) | 36-48 months | Real-time insights, process automation, reduced TCO |
| **Data Platform (Lakehouse)** | 250-450% (3 years) | 12-24 months | Self-service analytics, ML models (revenue uplift), faster reporting |

---

## 6. REMEDIATION PLAYBOOK (90-Day Quick Wins + Strategic)

### **6.1 Quick Win #1: Enforce MFA (0-4 Weeks)**

**Trigger:** Q7.2 = C/D (No MFA or partial)

**Objective:** Enforce Multi-Factor Authentication for all users

**Owner:** CISO / Head of Security

**Effort:** S (2-4 weeks)

**Actions:**
1. Enable Azure AD MFA or Okta Adaptive MFA
2. Configure Conditional Access policies (require MFA for all apps)
3. Pilot with IT team (Week 1)
4. Rollout to all users in waves (Weeks 2-4)
5. Monitor adoption (target 100% within 4 weeks)

**Cost:** $10K-$30K (licensing + rollout effort)

**Business Benefit:**
- Reduce account compromise risk by 70% (Microsoft study)
- Meet compliance requirements (ACSC Essential Eight)
- Reduce cyber insurance premium by 10-20% ($20K-$50K/year saving typical)

**Success Metrics:**
- 100% MFA enrollment
- 0 MFA bypass exceptions
- < 5% user support tickets (MFA issues)

---

### **6.2 Quick Win #2: Cloud Cost Tagging & Optimization (0-8 Weeks)**

**Trigger:** Q6.5 = C (No cost controls)

**Objective:** Implement cloud FinOps; identify 15-30% waste

**Owner:** Cloud Lead / CFO

**Effort:** S-M (4-8 weeks)

**Actions:**
1. Deploy Azure Cost Management or AWS Cost Explorer
2. Enforce tagging policy (cost-centre, owner, environment)
3. Identify idle VMs, over-provisioned resources
4. Rightsize VMs (80% utilization target)
5. Purchase reserved instances for steady-state workloads (40-60% discount)

**Cost:** $20K-$50K (consulting + tool setup)

**Business Benefit:**
- Save 15-30% of cloud spend ($50K-$500K/year depending on scale)
- Enable chargeback to business units
- Improve budget forecasting

**Success Metrics:**
- 95% resources tagged within 90 days
- 20% reduction in monthly cloud bill
- Chargeback reports to all business units

---

### **6.3 Quick Win #3: API Gateway Pilot (4-12 Weeks)**

**Trigger:** Q5.3 = C (No APIM) AND high integration count

**Objective:** Deploy API gateway and migrate 3-5 critical integrations

**Owner:** Integration Architect

**Effort:** M (8-12 weeks)

**Actions:**
1. Procure Azure API Management or Apigee (Week 1-2)
2. Deploy gateway in pilot environment (Week 3-4)
3. Re-route most fragile integration (e.g., SAP ↔ Salesforce customer sync) (Week 5-8)
4. Add rate limiting, OAuth2, logging
5. Establish developer portal for API discovery
6. Migrate 2 additional integrations (Week 9-12)

**Cost:** $50K-$150K (license + implementation)

**Business Benefit:**
- Reduce integration failures from 12% to <2% (save 500 hours/year troubleshooting)
- Improve security (centralized auth, rate limiting)
- Faster integration delivery (reusable patterns)

**Success Metrics:**
- 3 integrations migrated to APIM
- Integration uptime >99.5%
- API documentation published (developer portal)

---

### **6.4 Medium-Term Initiative: MDM for Customer (6-12 Months)**

**Trigger:** Q4.2 = C (No MDM) + Q4.5 = A/B (Poor data quality)

**Objective:** Deploy MDM hub for Customer master data; reduce duplicates from 18% to <2%

**Owner:** Chief Data Officer / Data Governance Lead

**Effort:** L (9-12 months)

**Investment:** $500K-$1.5M (mid-market)

**Actions:**
1. Select MDM platform (Informatica, Profisee, Reltio) (Month 1-2)
2. Data profiling and quality assessment (Month 2-3)
3. Define golden record rules (matching, merging, survivorship) (Month 3-4)
4. Build MDM hub; integrate with SAP and Salesforce (Month 4-8)
5. Data steward training (Month 7-8)
6. Go-live (Month 9)
7. Ongoing quality monitoring (Month 10-12)

**Business Benefit:**
- Reduce customer duplicates from 18% to <2% (save 200 hours/month manual cleanup)
- Improve marketing ROI by 15-20% (better targeting, no duplicate sends)
- Enable 360° customer view (improve customer experience)
- NPV over 3 years: $1.2M-$2.5M

**Success Metrics:**
- Customer duplicate rate <2%
- Data quality score >4/5
- 100% of customer records in MDM hub

---

### **6.5 Strategic Initiative: ERP Modernization (SAP ECC → S/4HANA) (18-24 Months)**

**Trigger:** Q3.1 = B (SAP ECC approaching EOL 2027)

**Objective:** Migrate from SAP ECC 6.0 to S/4HANA Cloud (RISE)

**Owner:** CIO / CFO / Program Director

**Effort:** XL (18-24 months)

**Investment:** $3M-$8M (mid-market); $8M-$30M (enterprise)

**Approach:** Greenfield (clean-core) vs Brownfield (technical upgrade)

**Actions:**
1. Business case and steering committee (Month 1-2)
2. Vendor selection (SAP partner) and fit-gap analysis (Month 2-4)
3. Solution design (Month 4-8)
4. Build and configure S/4HANA (Month 8-16)
5. Data migration (extract, cleanse, load) (Month 12-18)
6. User training (Month 14-18)
7. Cutover and go-live (Month 18-20)
8. Hypercare and stabilization (Month 20-24)

**Business Benefit:**
- Real-time financial reporting (reduce month-end close from 10 days to 3 days)
- Embedded analytics (Fiori apps)
- Reduced TCO by 20% over 5 years (cloud OPEX vs on-prem CAPEX)
- Future-proof platform (vendor support until 2040)
- NPV over 5 years: $5M-$15M

**Success Metrics:**
- Go-live on time and within 10% of budget
- <5% defects post-launch
- User adoption >90% within 3 months
- Month-end close ≤3 days

---

## 7. EXPORT TEMPLATES

### **7.1 PDF Report Structure**

**Cover Page:**
- Client name
- "Enterprise Architecture Assessment Report"
- Date
- Overall EA Maturity Score (e.g., "2.3/5 - Developing")
- Your firm logo

**Page 2: Executive Summary (1 page)**
- Current state summary (3-5 bullets)
- Top 5 critical gaps
- Overall maturity score
- Recommended next steps (90-day plan)

**Pages 3-12: Layer-by-Layer Analysis**
- For each layer:
  - Maturity score
  - Components assessed
  - Key findings
  - Gaps identified
  - Recommendations

**Pages 13-16: Gap Analysis**
- Prioritized gap table (sorted by Priority Score)
- Risk × Impact matrix (quadrant chart)

**Pages 17-20: Recommended Roadmap**
- 90-day quick wins (table)
- 12-36 month strategic initiatives (Gantt chart)
- Total investment summary

**Pages 21-22: Cost-Benefit Analysis**
- Investment by year
- Expected benefits by year
- NPV, IRR, ROI calculations

**Page 23: Next Steps**
- Recommended engagement (e.g., "Phase 1: 12-week API Gateway + MDM Pilot - $500K")
- Contact information

---

### **7.2 PowerPoint Export (5 Slides)**

**Slide 1: The Challenge (Current State)**
- Title: "EA Assessment: [Client Name]"
- Overall Maturity Score: 2.3/5 (Developing)
- Visual: Layer maturity bar chart
- Top 3 pain points (bullets)

**Slide 2: Top 5 Critical Gaps**
- Table: Gap | Risk | Impact | Cost to Fix
- Visual: Risk × Impact quadrant (Quick Wins vs Strategic)

**Slide 3: Recommended Roadmap**
- Timeline: 90 days | 6-12 months | 12-36 months
- Quick Wins highlighted (green boxes)
- Strategic initiatives (blue boxes)

**Slide 4: Investment & ROI**
- Total 3-year investment: $X.XM
- Expected NPV: $X.XM
- IRR: XX%
- Payback period: XX months

**Slide 5: Next Steps**
- Recommended engagement: "12-Week Pilot: API Gateway + MDM"
- Investment: $500K
- Expected outcome: 50% reduction in integration failures, 80% reduction in customer duplicates
- Call to action: "Book 2-week Discovery SOW"

---

### **7.3 CSV Export Templates**

**Template A: Assessment Answers**
```csv
QuestionID,Question,Answer,Score,Category
Q1.1,"What is your annual revenue?","$100M - $1B",3,"Company Profile"
Q3.1,"What ERP system do you use?","SAP ECC 6.0",2,"Applications"
...
```

**Template B: Gap Register**
```csv
GapID,Description,Layer,Risk,Impact,Cost,Priority,Recommendation,Investment,Timeline
G001,"No MFA enforced",Security,5,5,S,25,"Deploy Azure AD MFA",$30K,"4 weeks"
G002,"SAP ECC approaching EOL",Application,5,5,XL,6.25,"Migrate to S/4HANA Cloud",$5M,"24 months"
...
```

**Template C: Vendor Inventory**
```csv
Vendor,Product,Layer,DeploymentModel,YearDeployed,AnnualCost,MaturityScore,Replacement
SAP,SAP ECC 6.0,Application,On-premises,2015,$500K,2,Yes - S/4HANA
Salesforce,Sales Cloud,Application,SaaS,2020,$120K,5,No
...
```

---

## 8. RECOMMENDED CONSULTING ENGAGEMENT MODEL

### **Phase 1: EA Quick Scan (2 Weeks) - $50K-$80K Fixed Price**

**Deliverables:**
- Current-state EA map (all 10 layers)
- Completed assessment (60+ questions answered)
- Gap analysis with priority scoring
- 90-day quick win plan
- Executive presentation (30 slides)

**Resources:**
- Lead EA: 10 days
- Technical Architect: 10 days
- Security Specialist: 5 days
- Data Architect: 5 days

---

### **Phase 2: Pilot / Proof-of-Concept (12 Weeks) - $300K-$800K Fixed Price or T&M**

**Options:**
- API Gateway + 5 integrations migrated
- MDM Quick-Start (Customer domain, 1 system integrated)
- Data Lake MVP (3 data sources, 1 BI dashboard)
- Security Uplift (MFA + SIEM + Cloud security posture)

**Resources (Pod Model):**
- Integration Pod: 5-7 FTE × 12 weeks
- Or Data Pod: 6-8 FTE × 12 weeks
- Or Security Pod: 4-6 FTE × 12 weeks

**Pricing (T&M Option):**
- Lead Architect: $300-$350/hr
- Senior Engineer: $220-$280/hr
- Mid-level Engineer: $180-$220/hr

---

### **Phase 3: Full Program Delivery (12-36 Months) - $2M-$30M+**

**Engagement Models:**
- Time & Materials (pods)
- Fixed-Price milestones
- Managed Service (Governance-as-a-Service: $30K-$80K/month retainer)

---

### **Value-Based Pricing Option** *(from Claude Free)*

**Structure:**
- 60% fixed fee upfront
- 40% success bonus on outcome achievement (measured 3-6 months post go-live)

**Example KPIs:**
- Reduce month-end close to ≤3 days
- Achieve 99.9% API uptime
- Deploy to production ≥10x/week
- Customer duplicate rate <2%
- Cloud cost reduction ≥20%

**Risk-Sharing:** Client pays fixed fee for effort; bonus tied to verified business outcomes.

---

## 9. DASHBOARD IMPLEMENTATION GUIDANCE

### **React Component Structure**

```
src/
├── components/
│   ├── QuestionnaireView/
│   │   ├── QuestionCategory.tsx
│   │   ├── QuestionCard.tsx
│   │   └── ProgressBar.tsx
│   ├── EAMapView/
│   │   ├── LayerCard.tsx
│   │   ├── ComponentCard.tsx
│   │   ├── MaturityScore.tsx
│   │   └── VendorBadge.tsx
│   ├── GapAnalysisView/
│   │   ├── GapTable.tsx
│   │   ├── PriorityMatrix.tsx
│   │   ├── Recommendations.tsx
│   │   └── RoadmapTimeline.tsx
│   └── ExportView/
│       ├── PDFExport.tsx
│       ├── PPTExport.tsx
│       └── CSVExport.tsx
├── data/
│   ├── eaLayers.ts (10 layers with all components)
│   ├── vendors.ts (150+ vendors)
│   ├── questions.ts (60+ questions)
│   ├── gapRules.ts (gap detection logic)
│   └── costEstimates.ts (remediation costs)
├── utils/
│   ├── maturityCalculator.ts
│   ├── gapDetector.ts
│   ├── priorityScorer.ts
│   └── npvCalculator.ts
└── types/
    ├── Assessment.ts
    ├── Gap.ts
    ├── Recommendation.ts
    └── Vendor.ts
```

---

### **Data Model (TypeScript Interfaces)**

```typescript
interface EALayer {
  id: number; // 0-9
  name: string; // "Strategy & Motivation"
  description: string;
  icon: string; // lucide-react icon name
  components: EAComponent[];
}

interface EAComponent {
  id: string; // "0.1", "1.1", etc.
  name: string; // "Business Strategy & Goals"
  description: string;
  vendors: Vendor[];
  relatedQuestions: string[]; // QuestionIDs
  maturityIndicators: Record<number, string>; // 1-5
  typicalPitfalls: string[];
}

interface Vendor {
  name: string;
  product?: string;
  layerIds: string[]; // Which layers/components
  deploymentPattern: string;
  scale: string; // "SMB" | "Mid-Market" | "Enterprise"
  integrationPatterns: string[];
  pitfalls: string[];
  url?: string;
}

interface Question {
  id: string; // "Q1.1"
  category: string; // "Company Profile"
  text: string;
  answers: Answer[];
  affectsComponents: string[]; // Component IDs
  weight: number; // For maturity calculation
}

interface Answer {
  label: string;
  score: number; // 1-5
  triggersGaps?: string[]; // Gap IDs
}

interface Assessment {
  clientName: string;
  date: Date;
  answers: Record<string, string>; // QuestionID → AnswerLabel
  componentMaturity: Record<string, number>; // ComponentID → Score 1-5
  layerMaturity: Record<number, number>; // LayerID → Score 1-5
  overallMaturity: number; // 1-5
  gaps: Gap[];
}

interface Gap {
  id: string; // "G001"
  description: string;
  layer: number;
  component: string;
  risk: number; // 1-5
  businessImpact: number; // 1-5
  remediationCost: number; // 1-5 (S/M/L/XL/XXL)
  priority: number; // Calculated: (Risk × Impact) / Cost
  recommendation: Recommendation;
}

interface Recommendation {
  title: string;
  description: string;
  investment: { min: number; max: number }; // AUD
  timeline: string; // "4-8 weeks"
  expectedROI: string; // "150-300%"
  vendor?: string;
  businessBenefit: string;
  successMetrics: string[];
}
```

---

## 10. SUCCESS METRICS FOR THE DASHBOARD

✅ **Functional Completeness:**
- All 60+ questions implemented
- All 10 layers visualized
- All 150+ vendors mapped
- Gap detection working for all rules
- Maturity scoring accurate

✅ **User Experience:**
- Assessment completable in 30-45 minutes
- Live map updates as questions answered
- Intuitive navigation (Questionnaire → Map → Gaps → Export)
- Mobile-responsive
- Accessible (WCAG 2.1 AA)

✅ **Business Value:**
- PDF export produces professional report
- Gap prioritization aligns with business impact
- Cost estimates realistic and defensible
- Recommendations actionable and specific

✅ **Technical Quality:**
- Performance: <3 seconds to calculate all scores
- Persistence: Assessments saved in localStorage
- Export: PDF/PPT/CSV generation works
- Code quality: TypeScript, no any types, well-documented

---

## CONCLUSION

This comprehensive pack combines the best elements from all 6 AI frameworks:

- **Claude Pro:** 150+ vendors, deep layer detail, vendor pitfalls
- **Claude Free:** NPV/IRR business cases, value-based pricing, ACSC Essential Eight
- **Manus:** ArchiMate precision (SBB/ABB), tabular SOW, gap scoring formula
- **Grok:** ESG/Sustainability, Innovation Roadmap, Risk Assessment
- **DeepSeek:** Migration Factories, Standards & Roadmaps, conciseness
- **Gemini:** Simple mental model for executives

**Use this document as your single source of truth when building the React dashboard. Every question, vendor, component, gap rule, and cost estimate is here.**

**Ready to build? Start with the prompts I provided, and reference this pack throughout development.** 🚀