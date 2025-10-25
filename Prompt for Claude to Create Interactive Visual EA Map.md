# Prompt for Claude to Create Interactive Visual EA Map

```
Create an interactive visual Enterprise Architecture (EA) map as an HTML artifact with the following specifications:

VISUAL LAYOUT:
- Create a spatial canvas showing all 9 EA layers arranged left-to-right or top-to-bottom
- Use SVG or HTML Canvas to draw boxes/nodes for each component
- Draw connecting lines/arrows showing data flow and integration paths
- Style it like a subway map or architecture diagram with clear visual hierarchy

STRUCTURE (arrange spatially):

Layer 1 - STRATEGY & MOTIVATION (top/left)
└─ Business Goals, Value Streams, Drivers

Layer 2 - BUSINESS ARCHITECTURE
└─ Capabilities, Processes, Org Structure

Layer 3 - APPLICATIONS (main focal area)
├─ ERP Systems (SAP S/4HANA, Oracle, Dynamics 365)
├─ CRM Systems (Salesforce, Dynamics CRM)
├─ HCM Systems (Workday, SuccessFactors)
├─ Industry Apps
└─ SaaS Tools

Layer 4 - DATA & ANALYTICS
├─ Data Warehouses (Snowflake, Synapse, Databricks)
├─ Data Lakes (Azure Data Lake, S3)
├─ Streaming (Kafka, Event Hubs)
├─ BI Tools (Power BI, Tableau)
└─ ML Platforms (Azure ML, SageMaker)

Layer 5 - INTEGRATION & MIDDLEWARE
├─ API Gateway (APIM, Apigee)
├─ ESB/iPaaS (MuleSoft, Boomi)
├─ Message Queues (Service Bus, SQS)
└─ Event Streaming (Kafka)

Layer 6 - PLATFORM & INFRASTRUCTURE
├─ Cloud IaaS (Azure, AWS, GCP)
├─ Containers (Kubernetes/AKS/EKS)
├─ Databases (SQL, NoSQL, Cosmos DB)
└─ Storage (Blob, S3)

Layer 7 - SECURITY & GOVERNANCE (cross-cutting, shown as overlay)
├─ IAM (Azure AD, Okta)
├─ SIEM (Sentinel, Splunk)
├─ Encryption & Key Management
└─ GRC Platforms

Layer 8 - DEVOPS & OBSERVABILITY (bottom/right support layer)
├─ CI/CD (GitHub Actions, Azure DevOps)
├─ IaC (Terraform, Bicep)
├─ Monitoring (Prometheus, Grafana, Datadog)
└─ Incident Management (PagerDuty)

Layer 9 - UX/PRESENTATION (outer edge, user-facing)
├─ Web Portals
├─ Mobile Apps
└─ Dashboards

VISUAL DESIGN:
- Use rounded rectangles for component boxes
- Color-code by layer (use pastel colors: blue for apps, green for data, orange for integration, purple for platform, red for security, yellow for DevOps)
- Draw arrows showing typical data flows:
  * Applications → Integration Layer → Data Layer
  * Applications → API Gateway → External systems
  * Data sources → ETL → Data Warehouse → BI Tools
  * All layers → Security (cross-cutting connections)
  * DevOps connects to Applications and Platform layers
- Make it interactive: hovering over a component highlights its connections
- Add labels showing vendor names inside each box
- Use a legend showing what each color represents

INTERACTIVITY (optional but nice):
- Click on any component to see: typical vendors, deployment patterns, common integration points
- Highlight connected components when hovering over one
- Show/hide layers with toggle buttons
- Add a "maturity indicator" that can be set per component (1-5 dots)

STYLE:
- Clean, professional diagram suitable for executive presentation
- Use a light background (white or light gray)
- Clear, readable font (sans-serif, 12-14px)
- Adequate spacing between components
- Grid-like alignment where possible
- Include a title: "Enterprise Architecture Map - Complete Technology Landscape"

TECHNICAL:
- Build as a single HTML file with embedded CSS and JavaScript
- Use SVG for the diagram (better for crisp lines and text)
- Make it responsive (scales to window size)
- No external dependencies (no React, just vanilla JS)
- Include comments in code explaining each section

The goal is to create a visual reference map that shows:
1. What components exist in a modern EA
2. How they connect and interact
3. Where specific vendors fit
4. The flow of data and control through the architecture

Make it visually appealing and immediately understandable - like a transit map for enterprise technology.
```

---

# How It Will Look (High-Level Visual Description)

Let me create a text-based preview of the spatial layout:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    ENTERPRISE ARCHITECTURE MAP                                   │
│                    Complete Technology Landscape                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────────┐
                              │  STRATEGY LAYER     │
                              │  • Business Goals   │
                              │  • Value Streams    │
                              └──────────┬──────────┘
                                         │
                                         ↓
                              ┌─────────────────────┐
                              │  BUSINESS LAYER     │
                              │  • Capabilities     │
                              │  • Processes        │
                              └──────────┬──────────┘
                                         │
                    ┌────────────────────┼────────────────────┐
                    ↓                    ↓                    ↓
        ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
        │   ERP SYSTEMS   │  │   CRM SYSTEMS   │  │   HCM SYSTEMS   │
        │                 │  │                 │  │                 │
        │ • SAP S/4HANA   │  │ • Salesforce    │  │ • Workday       │
        │ • Oracle Cloud  │  │ • Dynamics CRM  │  │ • SuccessFactors│
        │ • Dynamics 365  │  │ • HubSpot       │  │ • ADP           │
        └────────┬────────┘  └────────┬────────┘  └────────┬────────┘
                 │                    │                    │
                 └────────────────────┼────────────────────┘
                                      │
                                      ↓
                    ┌──────────────────────────────────────┐
                    │      INTEGRATION LAYER               │
                    │  ┌────────────┐    ┌──────────────┐ │
                    │  │API Gateway │────│ ESB/iPaaS    │ │
                    │  │• APIM      │    │ • MuleSoft   │ │
                    │  │• Apigee    │    │ • Boomi      │ │
                    │  └─────┬──────┘    └──────┬───────┘ │
                    │        │                   │         │
                    │  ┌─────┴──────┐    ┌──────┴───────┐ │
                    │  │Event Stream│    │Message Queue │ │
                    │  │• Kafka     │    │• Service Bus │ │
                    │  └────────────┘    └──────────────┘ │
                    └──────────────┬───────────────────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                ↓                  ↓                  ↓
    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
    │  DATA WAREHOUSE │ │   DATA LAKE     │ │   BI TOOLS      │
    │                 │ │                 │ │                 │
    │ • Snowflake     │ │ • Azure Data    │ │ • Power BI      │
    │ • Synapse       │ │   Lake          │ │ • Tableau       │
    │ • Databricks    │ │ • AWS S3        │ │ • Looker        │
    └────────┬────────┘ └────────┬────────┘ └─────────────────┘
             │                   │
             └───────────────────┼───────────────────┐
                                 │                   │
                                 ↓                   ↓
                    ┌─────────────────────┐  ┌─────────────────┐
                    │  ML/AI PLATFORMS    │  │  STREAMING      │
                    │                     │  │                 │
                    │  • Azure ML         │  │  • Kafka        │
                    │  • SageMaker        │  │  • Event Hubs   │
                    │  • Databricks       │  │  • Kinesis      │
                    └─────────────────────┘  └─────────────────┘

                                   ↓
                    ┌──────────────────────────────────────┐
                    │    PLATFORM & INFRASTRUCTURE         │
                    │  ┌────────┐  ┌────────┐  ┌────────┐ │
                    │  │ Azure  │  │  AWS   │  │  GCP   │ │
                    │  │IaaS/PaaS│  │IaaS/PaaS│ │IaaS/PaaS│
                    │  └────────┘  └────────┘  └────────┘ │
                    │  ┌────────────────────────────────┐ │
                    │  │   Kubernetes / Containers      │ │
                    │  │   • AKS  • EKS  • GKE          │ │
                    │  └────────────────────────────────┘ │
                    └──────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│              SECURITY & GOVERNANCE (Cross-Cutting)                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │   IAM   │  │  SIEM   │  │ Encrypt │  │   GRC   │             │
│  │ Azure AD│  │ Sentinel│  │Key Vault│  │ServiceNow│            │
│  │  Okta   │  │ Splunk  │  │   KMS   │  │ Archer  │             │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘             │
│                   (Overlays all layers above)                      │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│           DEVOPS & OBSERVABILITY (Support Layer)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │  CI/CD   │  │   IaC    │  │Monitoring│  │ Incident │         │
│  │  GitHub  │  │Terraform │  │Prometheus│  │PagerDuty │         │
│  │  Actions │  │  Bicep   │  │ Grafana  │  │ Opsgenie │         │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘         │
└────────────────────────────────────────────────────────────────────┘

              ┌──────────────────────────────────┐
              │    UX/PRESENTATION LAYER         │
              │  ┌─────────┐  ┌─────────┐       │
              │  │   Web   │  │ Mobile  │       │
              │  │ Portals │  │  Apps   │       │
              │  └─────────┘  └─────────┘       │
              └──────────────────────────────────┘

LEGEND:
  Blue boxes    = Applications
  Green boxes   = Data & Analytics
  Orange boxes  = Integration
  Purple boxes  = Platform
  Red boxes     = Security
  Yellow boxes  = DevOps
  Gray boxes    = UX/Business
  
  Arrows show data flow and dependencies
```

Now let me create the actual interactive visual artifact: