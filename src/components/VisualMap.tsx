import React, { useState } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { eaLayers } from '../data/eaLayers';
import { vendors } from '../data/vendors';

/**
 * INTERACTIVE VISUAL EA MAP - NETWORK DIAGRAM STYLE
 *
 * A beautiful network/subway map showing the complete EA landscape
 * - Circular nodes for each component
 * - Connection lines showing relationships
 * - Everything starts GRAY (the perfect landscape)
 * - As questions are answered, nodes light up with maturity colors
 * - Looks like a technology ecosystem map
 */

interface Node {
  id: string;
  name: string;
  layer: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  maturityScore?: number;
  assessed: boolean;
  vendors?: string[];
}

export function VisualMap() {
  const { answers, maturitySummary, setCurrentView } = useAssessment();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Box dragging state
  const [draggedBox, setDraggedBox] = useState<number | null>(null);
  const [boxDragStart, setBoxDragStart] = useState({ x: 0, y: 0 });
  const [boxPositions, setBoxPositions] = useState<{[key: number]: {x: number, y: number}}>({});

  // Connection state
  const [showConnections, setShowConnections] = useState(true);
  const [hoveredConnection, setHoveredConnection] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [connectionFilter, setConnectionFilter] = useState<'both' | 'outgoing' | 'incoming'>('both');

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.6));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  // Pan handlers - drag to move the map
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanX(e.clientX - dragStart.x);
    setPanY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Box drag handlers - drag individual boxes
  const handleBoxMouseDown = (e: React.MouseEvent, boxIndex: number, currentX: number, currentY: number) => {
    e.stopPropagation(); // Prevent canvas pan
    setDraggedBox(boxIndex);
    const svgPoint = { x: e.clientX / zoom, y: e.clientY / zoom };
    setBoxDragStart({
      x: svgPoint.x - currentX,
      y: svgPoint.y - currentY
    });
  };

  const handleBoxMouseMove = (e: React.MouseEvent) => {
    if (draggedBox === null) return;
    e.stopPropagation(); // Prevent canvas pan
    const svgPoint = { x: e.clientX / zoom, y: e.clientY / zoom };
    const newX = svgPoint.x - boxDragStart.x;
    const newY = svgPoint.y - boxDragStart.y;

    setBoxPositions(prev => ({
      ...prev,
      [draggedBox]: { x: newX, y: newY }
    }));
  };

  const handleBoxMouseUp = () => {
    setDraggedBox(null);
  };

  // Calculate which components are assessed
  const assessedComponentIds = new Set<string>();
  if (maturitySummary) {
    maturitySummary.layers.forEach(layer => {
      layer.components.forEach(comp => {
        assessedComponentIds.add(comp.componentId);
      });
    });
  }

  // Get maturity color for a component
  const getNodeColor = (componentId: string): string => {
    if (!assessedComponentIds.has(componentId)) {
      return '#D1D5DB'; // Gray - not assessed
    }

    const component = maturitySummary?.layers
      .flatMap(l => l.components)
      .find(c => c.componentId === componentId);

    return component?.color || '#D1D5DB';
  };

  // Get maturity score for a component
  const getMaturityScore = (componentId: string): number | undefined => {
    const component = maturitySummary?.layers
      .flatMap(l => l.components)
      .find(c => c.componentId === componentId);

    return component?.maturityScore;
  };

  // Get vendor names for a component
  const getVendorNames = (componentId: string): string[] => {
    const componentVendors = vendors
      .filter(v => v.componentIds.includes(componentId))
      .map(v => v.name)
      .slice(0, 3); // Limit to top 3 vendors
    return componentVendors;
  };

  // Build network layout
  const { nodes } = buildNetworkLayout(getNodeColor, assessedComponentIds, getMaturityScore, getVendorNames);

  // Render Core Applications as a beautiful hierarchical tree
  const renderCoreApplicationsTree = (cluster: any, color: string) => {
    // Calculate exact box boundaries
    const boxLeft = cluster.x - cluster.width / 2;
    const boxTop = cluster.y - cluster.height / 2 + 60; // Account for header
    const boxWidth = cluster.width;
    const boxHeight = cluster.height - 60;
    const boxRight = boxLeft + boxWidth;
    const boxBottom = boxTop + boxHeight;

    // Define tree structure - 3 main groups with expanded app list
    const groups = [
      {
        name: 'Enterprise Core',
        color: '#3B82F6',
        apps: [
          { id: 'core-erp', name: 'ERP', vendors: ['SAP', 'Oracle'] },
          { id: 'core-finance', name: 'Finance', vendors: ['NetSuite', 'Xero'] },
          { id: 'core-procurement', name: 'Procurement', vendors: ['Coupa', 'Ariba'] }
        ]
      },
      {
        name: 'Customer Engagement',
        color: '#10B981',
        apps: [
          { id: 'ce-crm', name: 'CRM', vendors: ['Salesforce', 'MS Dynamics'] },
          { id: 'ce-marketing', name: 'Marketing', vendors: ['Adobe', 'HubSpot'] },
          { id: 'ce-ecommerce', name: 'eCommerce', vendors: ['Shopify', 'Magento'] }
        ]
      },
      {
        name: 'People & Operations',
        color: '#F59E0B',
        apps: [
          { id: 'po-hcm', name: 'HCM', vendors: ['Workday', 'SAP SF'] },
          { id: 'po-scm', name: 'SCM', vendors: ['Blue Yonder', 'Oracle'] },
          { id: 'po-project', name: 'Project Mgmt', vendors: ['Monday', 'Asana'] }
        ]
      }
    ];

    // Calculate safe spacing with padding from edges
    const horizontalPadding = 40;
    const topPadding = 20;
    const bottomPadding = 30;

    const availableWidth = boxWidth - (horizontalPadding * 2);
    const availableHeight = boxHeight - topPadding - bottomPadding;
    const groupWidth = availableWidth / groups.length;

    // Find max apps in any group to calculate vertical spacing
    const maxApps = Math.max(...groups.map(g => g.apps.length));
    const headerHeight = 35;
    const appVerticalSpace = 75; // Space for each app node + vendors

    return (
      <g key="core-apps-tree">
        {groups.map((group, gIdx) => {
          // Calculate group center X within safe boundaries
          const groupCenterX = boxLeft + horizontalPadding + (gIdx * groupWidth) + (groupWidth / 2);
          const groupHeaderY = boxTop + topPadding;
          const headerWidth = Math.min(140, groupWidth - 20); // Ensure header fits

          // Ensure header stays within bounds
          const headerLeft = Math.max(boxLeft + 10, groupCenterX - headerWidth / 2);
          const headerRight = Math.min(boxRight - 10, groupCenterX + headerWidth / 2);
          const finalHeaderWidth = headerRight - headerLeft;

          return (
            <g key={`group-${gIdx}`}>
              {/* Group header box with gradient */}
              <defs>
                <linearGradient id={`gradient-${gIdx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: group.color, stopOpacity: 0.2 }} />
                  <stop offset="100%" style={{ stopColor: group.color, stopOpacity: 0.05 }} />
                </linearGradient>
              </defs>

              <rect
                x={headerLeft}
                y={groupHeaderY}
                width={finalHeaderWidth}
                height={headerHeight}
                fill={`url(#gradient-${gIdx})`}
                rx="6"
                stroke={group.color}
                strokeWidth="2"
                filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))"
              />

              {/* Group name */}
              <text
                x={groupCenterX}
                y={groupHeaderY + 22}
                textAnchor="middle"
                fill={group.color}
                fontSize="11"
                fontWeight="800"
              >
                {group.name}
              </text>

              {/* Vertical spine line - ensure it stays within bounds */}
              <line
                x1={groupCenterX}
                y1={groupHeaderY + headerHeight}
                x2={groupCenterX}
                y2={Math.min(boxBottom - bottomPadding, groupHeaderY + headerHeight + (group.apps.length * appVerticalSpace))}
                stroke={group.color}
                strokeWidth="1.5"
                opacity="0.3"
                strokeDasharray="3 3"
              />

              {/* Apps under this group */}
              {group.apps.map((app, aIdx) => {
                const appY = groupHeaderY + headerHeight + 40 + (aIdx * appVerticalSpace);
                const appX = groupCenterX;
                const nodeRadius = 10;

                // Ensure we don't go past bottom boundary
                if (appY + 40 > boxBottom - bottomPadding) return null;

                // Check if this app is assessed
                const isAssessed = assessedComponentIds.has(app.id);
                const nodeColor = isAssessed ? getNodeColor(app.id) : '#D1D5DB';

                return (
                  <g key={`app-${gIdx}-${aIdx}`}>
                    {/* Horizontal branch line from spine to app */}
                    <line
                      x1={groupCenterX}
                      y1={appY}
                      x2={appX - 20}
                      y2={appY}
                      stroke={group.color}
                      strokeWidth="1.5"
                      opacity="0.4"
                    />

                    {/* App node circle with glow for assessed */}
                    {isAssessed && (
                      <circle
                        cx={appX}
                        cy={appY}
                        r={nodeRadius + 3}
                        fill={nodeColor}
                        opacity="0.3"
                        className="animate-pulse"
                      />
                    )}

                    <circle
                      cx={appX}
                      cy={appY}
                      r={nodeRadius}
                      fill={nodeColor}
                      stroke={group.color}
                      strokeWidth="2"
                      filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))"
                    />

                    {/* App name label */}
                    <text
                      x={appX}
                      y={appY - nodeRadius - 6}
                      textAnchor="middle"
                      fill="#1F2937"
                      fontSize="9"
                      fontWeight="700"
                    >
                      {app.name}
                    </text>

                    {/* Vendor names below the node - limited to 2 */}
                    {app.vendors.slice(0, 2).map((vendor, vIdx) => (
                      <text
                        key={`vendor-${gIdx}-${aIdx}-${vIdx}`}
                        x={appX}
                        y={appY + nodeRadius + 10 + (vIdx * 8)}
                        textAnchor="middle"
                        fill="#6B7280"
                        fontSize="6.5"
                        fontWeight="400"
                      >
                        {vendor}
                      </text>
                    ))}
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    );
  };

  // Render Data & Analytics as a beautiful hierarchical tree
  const renderDataAnalyticsTree = (cluster: any, color: string) => {
    const boxLeft = cluster.x - cluster.width / 2;
    const boxTop = cluster.y - cluster.height / 2 + 60;
    const boxWidth = cluster.width;
    const boxHeight = cluster.height - 60;
    const boxRight = boxLeft + boxWidth;
    const boxBottom = boxTop + boxHeight;

    const groups = [
      {
        name: 'Data Storage',
        color: '#3B82F6',
        apps: [
          { id: '3.1', name: 'MDM', vendors: ['Informatica', 'SAP MDG'] },
          { id: '3.2', name: 'Data Warehouse', vendors: ['Oracle', 'Teradata'] },
          { id: '3.3', name: 'Cloud DW', vendors: ['Snowflake', 'BigQuery'] },
          { id: '3.4', name: 'Data Lake', vendors: ['S3', 'Azure DL'] }
        ]
      },
      {
        name: 'Data Processing',
        color: '#10B981',
        apps: [
          { id: '3.6', name: 'ETL/ELT', vendors: ['Informatica', 'Fivetran'] },
          { id: '3.7', name: 'Streaming', vendors: ['Kafka', 'Kinesis'] },
          { id: '3.11', name: 'Data Quality', vendors: ['Talend', 'Collibra'] }
        ]
      },
      {
        name: 'Analytics & ML',
        color: '#8B5CF6',
        apps: [
          { id: '3.8', name: 'BI Platform', vendors: ['Tableau', 'Power BI'] },
          { id: '3.9', name: 'ML Platform', vendors: ['DataRobot', 'SageMaker'] },
          { id: '3.10', name: 'Embedded Analytics', vendors: ['Looker', 'Qlik'] }
        ]
      },
      {
        name: 'Governance',
        color: '#F59E0B',
        apps: [
          { id: '3.5', name: 'Data Catalog', vendors: ['Alation', 'Collibra'] },
          { id: '3.12', name: 'Data Privacy', vendors: ['OneTrust', 'BigID'] }
        ]
      }
    ];

    const horizontalPadding = 30;
    const topPadding = 20;
    const bottomPadding = 30;
    const availableWidth = boxWidth - (horizontalPadding * 2);
    const groupWidth = availableWidth / groups.length;
    const headerHeight = 35;
    const appVerticalSpace = 70;

    return (
      <g key="data-analytics-tree">
        {groups.map((group, gIdx) => {
          const groupCenterX = boxLeft + horizontalPadding + (gIdx * groupWidth) + (groupWidth / 2);
          const groupHeaderY = boxTop + topPadding;
          const headerWidth = Math.min(120, groupWidth - 15);
          const headerLeft = Math.max(boxLeft + 10, groupCenterX - headerWidth / 2);
          const headerRight = Math.min(boxRight - 10, groupCenterX + headerWidth / 2);
          const finalHeaderWidth = headerRight - headerLeft;

          return (
            <g key={`da-group-${gIdx}`}>
              <defs>
                <linearGradient id={`da-gradient-${gIdx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: group.color, stopOpacity: 0.2 }} />
                  <stop offset="100%" style={{ stopColor: group.color, stopOpacity: 0.05 }} />
                </linearGradient>
              </defs>

              <rect
                x={headerLeft}
                y={groupHeaderY}
                width={finalHeaderWidth}
                height={headerHeight}
                fill={`url(#da-gradient-${gIdx})`}
                rx="6"
                stroke={group.color}
                strokeWidth="2"
                filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))"
              />

              <text
                x={groupCenterX}
                y={groupHeaderY + 22}
                textAnchor="middle"
                fill={group.color}
                fontSize="10"
                fontWeight="800"
              >
                {group.name}
              </text>

              <line
                x1={groupCenterX}
                y1={groupHeaderY + headerHeight}
                x2={groupCenterX}
                y2={Math.min(boxBottom - bottomPadding, groupHeaderY + headerHeight + (group.apps.length * appVerticalSpace))}
                stroke={group.color}
                strokeWidth="1.5"
                opacity="0.3"
                strokeDasharray="3 3"
              />

              {group.apps.map((app, aIdx) => {
                const appY = groupHeaderY + headerHeight + 35 + (aIdx * appVerticalSpace);
                const appX = groupCenterX;
                const nodeRadius = 10;

                if (appY + 35 > boxBottom - bottomPadding) return null;

                const isAssessed = assessedComponentIds.has(app.id);
                const nodeColor = isAssessed ? getNodeColor(app.id) : '#D1D5DB';

                return (
                  <g key={`da-app-${gIdx}-${aIdx}`}>
                    <line
                      x1={groupCenterX}
                      y1={appY}
                      x2={appX - 18}
                      y2={appY}
                      stroke={group.color}
                      strokeWidth="1.5"
                      opacity="0.4"
                    />

                    {isAssessed && (
                      <circle
                        cx={appX}
                        cy={appY}
                        r={nodeRadius + 3}
                        fill={nodeColor}
                        opacity="0.3"
                        className="animate-pulse"
                      />
                    )}

                    <circle
                      cx={appX}
                      cy={appY}
                      r={nodeRadius}
                      fill={nodeColor}
                      stroke={group.color}
                      strokeWidth="2"
                      filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))"
                    />

                    <text
                      x={appX}
                      y={appY - nodeRadius - 6}
                      textAnchor="middle"
                      fill="#1F2937"
                      fontSize="8.5"
                      fontWeight="700"
                    >
                      {app.name}
                    </text>

                    {app.vendors.slice(0, 2).map((vendor, vIdx) => (
                      <text
                        key={`da-vendor-${gIdx}-${aIdx}-${vIdx}`}
                        x={appX}
                        y={appY + nodeRadius + 10 + (vIdx * 8)}
                        textAnchor="middle"
                        fill="#6B7280"
                        fontSize="6.5"
                        fontWeight="400"
                      >
                        {vendor}
                      </text>
                    ))}
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    );
  };

  // Render Integration Hub as a compact tree
  const renderIntegrationHubTree = (cluster: any, color: string) => {
    const boxLeft = cluster.x - cluster.width / 2;
    const boxTop = cluster.y - cluster.height / 2 + 60;
    const boxWidth = cluster.width;
    const boxHeight = cluster.height - 60;
    const boxBottom = boxTop + boxHeight;

    const groups = [
      {
        name: 'APIs',
        color: '#3B82F6',
        apps: [
          { id: '4.1', name: 'API Gateway', vendors: ['Apigee', 'Kong'] },
          { id: '4.7', name: 'API Dev', vendors: ['Postman', 'Swagger'] },
          { id: '4.8', name: 'Service Mesh', vendors: ['Istio', 'Linkerd'] }
        ]
      },
      {
        name: 'Messaging',
        color: '#10B981',
        apps: [
          { id: '4.3', name: 'Message Queue', vendors: ['RabbitMQ', 'AWS SQS'] },
          { id: '4.4', name: 'Event Stream', vendors: ['Kafka', 'Kinesis'] },
          { id: '4.2', name: 'ESB/iPaaS', vendors: ['MuleSoft', 'Boomi'] }
        ]
      },
      {
        name: 'Automation',
        color: '#F59E0B',
        apps: [
          { id: '4.6', name: 'RPA', vendors: ['UiPath', 'Automation Anywhere'] },
          { id: '4.5', name: 'File Transfer', vendors: ['MFT', 'SFTP'] },
          { id: '4.9', name: 'EDI/B2B', vendors: ['Sterling', 'Cleo'] }
        ]
      }
    ];

    const horizontalPadding = 35;
    const topPadding = 15;
    const bottomPadding = 25;
    const availableWidth = boxWidth - (horizontalPadding * 2);
    const groupWidth = availableWidth / groups.length;
    const headerHeight = 30;
    const appVerticalSpace = 60;

    return (
      <g key="integration-hub-tree">
        {groups.map((group, gIdx) => {
          const groupCenterX = boxLeft + horizontalPadding + (gIdx * groupWidth) + (groupWidth / 2);
          const groupHeaderY = boxTop + topPadding;
          const headerWidth = Math.min(110, groupWidth - 15);
          const headerLeft = Math.max(boxLeft + 10, groupCenterX - headerWidth / 2);
          const finalHeaderWidth = Math.min(headerWidth, groupWidth - 20);

          return (
            <g key={`ih-group-${gIdx}`}>
              <defs>
                <linearGradient id={`ih-gradient-${gIdx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: group.color, stopOpacity: 0.2 }} />
                  <stop offset="100%" style={{ stopColor: group.color, stopOpacity: 0.05 }} />
                </linearGradient>
              </defs>

              <rect
                x={headerLeft}
                y={groupHeaderY}
                width={finalHeaderWidth}
                height={headerHeight}
                fill={`url(#ih-gradient-${gIdx})`}
                rx="5"
                stroke={group.color}
                strokeWidth="2"
                filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))"
              />

              <text
                x={groupCenterX}
                y={groupHeaderY + 19}
                textAnchor="middle"
                fill={group.color}
                fontSize="9.5"
                fontWeight="800"
              >
                {group.name}
              </text>

              <line
                x1={groupCenterX}
                y1={groupHeaderY + headerHeight}
                x2={groupCenterX}
                y2={Math.min(boxBottom - bottomPadding, groupHeaderY + headerHeight + (group.apps.length * appVerticalSpace))}
                stroke={group.color}
                strokeWidth="1.5"
                opacity="0.3"
                strokeDasharray="3 3"
              />

              {group.apps.map((app, aIdx) => {
                const appY = groupHeaderY + headerHeight + 30 + (aIdx * appVerticalSpace);
                const appX = groupCenterX;
                const nodeRadius = 9;

                if (appY + 30 > boxBottom - bottomPadding) return null;

                const isAssessed = assessedComponentIds.has(app.id);
                const nodeColor = isAssessed ? getNodeColor(app.id) : '#D1D5DB';

                return (
                  <g key={`ih-app-${gIdx}-${aIdx}`}>
                    <line
                      x1={groupCenterX}
                      y1={appY}
                      x2={appX - 16}
                      y2={appY}
                      stroke={group.color}
                      strokeWidth="1.5"
                      opacity="0.4"
                    />

                    {isAssessed && (
                      <circle
                        cx={appX}
                        cy={appY}
                        r={nodeRadius + 3}
                        fill={nodeColor}
                        opacity="0.3"
                        className="animate-pulse"
                      />
                    )}

                    <circle
                      cx={appX}
                      cy={appY}
                      r={nodeRadius}
                      fill={nodeColor}
                      stroke={group.color}
                      strokeWidth="2"
                      filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))"
                    />

                    <text
                      x={appX}
                      y={appY - nodeRadius - 5}
                      textAnchor="middle"
                      fill="#1F2937"
                      fontSize="8"
                      fontWeight="700"
                    >
                      {app.name}
                    </text>

                    {app.vendors.slice(0, 2).map((vendor, vIdx) => (
                      <text
                        key={`ih-vendor-${gIdx}-${aIdx}-${vIdx}`}
                        x={appX}
                        y={appY + nodeRadius + 9 + (vIdx * 7.5)}
                        textAnchor="middle"
                        fill="#6B7280"
                        fontSize="6"
                        fontWeight="400"
                      >
                        {vendor}
                      </text>
                    ))}
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    );
  };

  // Render Strategy & Governance tree
  const renderStrategyGovernanceTree = (cluster: any, color: string) => {
    const boxLeft = cluster.x - cluster.width / 2;
    const boxTop = cluster.y - cluster.height / 2 + 60;
    const boxWidth = cluster.width;
    const boxHeight = cluster.height - 60;
    const boxBottom = boxTop + boxHeight;

    const groups = [
      {
        name: 'Strategic Direction',
        color: '#8B5CF6',
        apps: [
          { id: '0.1', name: 'Business Strategy', vendors: [] },
          { id: '0.2', name: 'Stakeholders', vendors: [] },
          { id: '0.7', name: 'Innovation', vendors: [] }
        ]
      },
      {
        name: 'EA Governance',
        color: '#EC4899',
        apps: [
          { id: '0.5', name: 'Principles', vendors: ['TOGAF', 'ArchiMate'] },
          { id: '0.9', name: 'Standards', vendors: ['LeanIX', 'Ardoq'] },
          { id: '0.10', name: 'Portfolio Mgmt', vendors: ['Planview', 'ServiceNow SPM'] }
        ]
      },
      {
        name: 'Risk, Value & Compliance',
        color: '#3B82F6',
        apps: [
          { id: '0.3', name: 'Drivers', vendors: [] },
          { id: '0.4', name: 'Value Streams', vendors: [] },
          { id: '0.6', name: 'Risk Mgmt', vendors: ['RSA Archer', 'ServiceNow GRC'] },
          { id: '0.8', name: 'ESG Goals', vendors: [] }
        ]
      }
    ];

    const horizontalPadding = 35;
    const topPadding = 15;
    const bottomPadding = 25;
    const availableWidth = boxWidth - (horizontalPadding * 2);
    const groupWidth = availableWidth / groups.length;
    const headerHeight = 32;
    const appVerticalSpace = 68;

    return (
      <g key="strategy-governance-tree">
        {groups.map((group, gIdx) => {
          const groupCenterX = boxLeft + horizontalPadding + (gIdx * groupWidth) + (groupWidth / 2);
          const groupHeaderY = boxTop + topPadding;
          const headerWidth = Math.min(150, groupWidth - 15);
          const headerLeft = Math.max(boxLeft + 10, groupCenterX - headerWidth / 2);
          const finalHeaderWidth = Math.min(headerWidth, groupWidth - 20);

          return (
            <g key={`sg-group-${gIdx}`}>
              <defs>
                <linearGradient id={`sg-gradient-${gIdx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: group.color, stopOpacity: 0.2 }} />
                  <stop offset="100%" style={{ stopColor: group.color, stopOpacity: 0.05 }} />
                </linearGradient>
              </defs>

              <rect
                x={headerLeft}
                y={groupHeaderY}
                width={finalHeaderWidth}
                height={headerHeight}
                fill={`url(#sg-gradient-${gIdx})`}
                rx="6"
                stroke={group.color}
                strokeWidth="2"
                filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))"
              />

              <text
                x={groupCenterX}
                y={groupHeaderY + 20}
                textAnchor="middle"
                fill={group.color}
                fontSize="9.5"
                fontWeight="800"
              >
                {group.name}
              </text>

              <line
                x1={groupCenterX}
                y1={groupHeaderY + headerHeight}
                x2={groupCenterX}
                y2={Math.min(boxBottom - bottomPadding, groupHeaderY + headerHeight + (group.apps.length * appVerticalSpace))}
                stroke={group.color}
                strokeWidth="1.5"
                opacity="0.3"
                strokeDasharray="3 3"
              />

              {group.apps.map((app, aIdx) => {
                const appY = groupHeaderY + headerHeight + 35 + (aIdx * appVerticalSpace);
                const appX = groupCenterX;
                const nodeRadius = 9;

                if (appY + 30 > boxBottom - bottomPadding) return null;

                const isAssessed = assessedComponentIds.has(app.id);
                const nodeColor = isAssessed ? getNodeColor(app.id) : '#D1D5DB';

                return (
                  <g key={`sg-app-${gIdx}-${aIdx}`}>
                    <line
                      x1={groupCenterX}
                      y1={appY}
                      x2={appX - 16}
                      y2={appY}
                      stroke={group.color}
                      strokeWidth="1.5"
                      opacity="0.4"
                    />

                    {isAssessed && (
                      <circle
                        cx={appX}
                        cy={appY}
                        r={nodeRadius + 3}
                        fill={nodeColor}
                        opacity="0.3"
                        className="animate-pulse"
                      />
                    )}

                    <circle
                      cx={appX}
                      cy={appY}
                      r={nodeRadius}
                      fill={nodeColor}
                      stroke={group.color}
                      strokeWidth="2"
                      filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))"
                    />

                    <text
                      x={appX}
                      y={appY - nodeRadius - 5}
                      textAnchor="middle"
                      fill="#1F2937"
                      fontSize="8"
                      fontWeight="700"
                    >
                      {app.name}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    );
  };

  // Render Business Architecture tree
  const renderBusinessArchitectureTree = (cluster: any, color: string) => {
    const boxLeft = cluster.x - cluster.width / 2;
    const boxTop = cluster.y - cluster.height / 2 + 60;
    const boxWidth = cluster.width;
    const boxHeight = cluster.height - 60;
    const boxBottom = boxTop + boxHeight;

    const groups = [
      {
        name: 'Business Model',
        color: '#EC4899',
        apps: [
          { id: '1.1', name: 'Capabilities', vendors: [] },
          { id: '1.2', name: 'Value Chains', vendors: [] },
          { id: '1.3', name: 'Business Model', vendors: [] }
        ]
      },
      {
        name: 'Processes & Org',
        color: '#8B5CF6',
        apps: [
          { id: '1.4', name: 'Process Maps', vendors: [] },
          { id: '1.5', name: 'Org Structure', vendors: [] },
          { id: '1.6', name: 'Operating Model', vendors: [] }
        ]
      },
      {
        name: 'Performance',
        color: '#3B82F6',
        apps: [
          { id: '1.7', name: 'KPIs/OKRs', vendors: [] },
          { id: '1.8', name: 'Customer Journey', vendors: [] },
          { id: '1.9', name: 'Product Catalog', vendors: [] },
          { id: '1.10', name: 'Partner Ecosystem', vendors: [] }
        ]
      }
    ];

    const horizontalPadding = 35;
    const topPadding = 15;
    const bottomPadding = 25;
    const availableWidth = boxWidth - (horizontalPadding * 2);
    const groupWidth = availableWidth / groups.length;
    const headerHeight = 32;
    const appVerticalSpace = 62;

    return (
      <g key="business-architecture-tree">
        {groups.map((group, gIdx) => {
          const groupCenterX = boxLeft + horizontalPadding + (gIdx * groupWidth) + (groupWidth / 2);
          const groupHeaderY = boxTop + topPadding;
          const headerWidth = Math.min(150, groupWidth - 15);
          const headerLeft = Math.max(boxLeft + 10, groupCenterX - headerWidth / 2);
          const finalHeaderWidth = Math.min(headerWidth, groupWidth - 20);

          return (
            <g key={`ba-group-${gIdx}`}>
              <defs>
                <linearGradient id={`ba-gradient-${gIdx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: group.color, stopOpacity: 0.2 }} />
                  <stop offset="100%" style={{ stopColor: group.color, stopOpacity: 0.05 }} />
                </linearGradient>
              </defs>

              <rect
                x={headerLeft}
                y={groupHeaderY}
                width={finalHeaderWidth}
                height={headerHeight}
                fill={`url(#ba-gradient-${gIdx})`}
                rx="6"
                stroke={group.color}
                strokeWidth="2"
                filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))"
              />

              <text
                x={groupCenterX}
                y={groupHeaderY + 20}
                textAnchor="middle"
                fill={group.color}
                fontSize="9.5"
                fontWeight="800"
              >
                {group.name}
              </text>

              <line
                x1={groupCenterX}
                y1={groupHeaderY + headerHeight}
                x2={groupCenterX}
                y2={Math.min(boxBottom - bottomPadding, groupHeaderY + headerHeight + (group.apps.length * appVerticalSpace))}
                stroke={group.color}
                strokeWidth="1.5"
                opacity="0.3"
                strokeDasharray="3 3"
              />

              {group.apps.map((app, aIdx) => {
                const appY = groupHeaderY + headerHeight + 30 + (aIdx * appVerticalSpace);
                const appX = groupCenterX;
                const nodeRadius = 9;

                if (appY + 30 > boxBottom - bottomPadding) return null;

                const isAssessed = assessedComponentIds.has(app.id);
                const nodeColor = isAssessed ? getNodeColor(app.id) : '#D1D5DB';

                return (
                  <g key={`ba-app-${gIdx}-${aIdx}`}>
                    <line
                      x1={groupCenterX}
                      y1={appY}
                      x2={appX - 16}
                      y2={appY}
                      stroke={group.color}
                      strokeWidth="1.5"
                      opacity="0.4"
                    />

                    {isAssessed && (
                      <circle
                        cx={appX}
                        cy={appY}
                        r={nodeRadius + 3}
                        fill={nodeColor}
                        opacity="0.3"
                        className="animate-pulse"
                      />
                    )}

                    <circle
                      cx={appX}
                      cy={appY}
                      r={nodeRadius}
                      fill={nodeColor}
                      stroke={group.color}
                      strokeWidth="2"
                      filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))"
                    />

                    <text
                      x={appX}
                      y={appY - nodeRadius - 5}
                      textAnchor="middle"
                      fill="#1F2937"
                      fontSize="8"
                      fontWeight="700"
                    >
                      {app.name}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    );
  };

  // Render Platform & Infrastructure as HORIZONTAL LAYERS
  const renderPlatformInfrastructureLayers = (cluster: any) => {
    const boxLeft = cluster.x - cluster.width / 2;
    const boxTop = cluster.y - cluster.height / 2 + 60;
    const boxWidth = cluster.width;
    const boxHeight = cluster.height - 60;

    const layers = [
      {
        name: 'Cloud Platforms & IaaS',
        apps: [
          { id: '5.1', name: 'AWS' },
          { id: '5.1b', name: 'Azure' },
          { id: '5.1c', name: 'GCP' },
          { id: '5.2', name: 'VMware' },
          { id: '5.2b', name: 'OpenStack' },
          { id: '5.2c', name: 'Terraform' },
          { id: '5.2d', name: 'CloudFormation' }
        ],
        color: '#6366F1'
      },
      {
        name: 'Container & Orchestration',
        apps: [
          { id: '5.3', name: 'Kubernetes' },
          { id: '5.3b', name: 'Docker' },
          { id: '5.3c', name: 'ECS/EKS' },
          { id: '5.3d', name: 'OpenShift' },
          { id: '5.4', name: 'Lambda' },
          { id: '5.4b', name: 'Cloud Run' },
          { id: '5.4c', name: 'Azure Functions' }
        ],
        color: '#8B5CF6'
      },
      {
        name: 'Databases & Data Stores',
        apps: [
          { id: '5.7', name: 'PostgreSQL' },
          { id: '5.7b', name: 'MySQL' },
          { id: '5.7c', name: 'Oracle' },
          { id: '5.8', name: 'MongoDB' },
          { id: '5.8b', name: 'Cassandra' },
          { id: '5.8c', name: 'DynamoDB' },
          { id: '5.9', name: 'Redis' },
          { id: '5.9b', name: 'Memcached' },
          { id: '5.9c', name: 'Elasticsearch' }
        ],
        color: '#3B82F6'
      },
      {
        name: 'Network & Connectivity',
        apps: [
          { id: '5.5', name: 'VPC/VNet' },
          { id: '5.5b', name: 'Load Balancers' },
          { id: '5.5c', name: 'API Gateway' },
          { id: '5.5d', name: 'CDN' },
          { id: '5.5e', name: 'DNS' },
          { id: '5.5f', name: 'VPN' },
          { id: '5.5g', name: 'Direct Connect' }
        ],
        color: '#10B981'
      },
      {
        name: 'Storage & Backup',
        apps: [
          { id: '5.6', name: 'S3/Blob' },
          { id: '5.6b', name: 'EBS/Disks' },
          { id: '5.6c', name: 'NFS/EFS' },
          { id: '5.10', name: 'Veeam' },
          { id: '5.10b', name: 'Commvault' },
          { id: '5.10c', name: 'Cloud Backup' },
          { id: '5.10d', name: 'Disaster Recovery' }
        ],
        color: '#F59E0B'
      },
      {
        name: 'Monitoring & Observability',
        apps: [
          { id: '5.11', name: 'Prometheus' },
          { id: '5.11b', name: 'Grafana' },
          { id: '5.11c', name: 'Datadog' },
          { id: '5.11d', name: 'New Relic' },
          { id: '5.11e', name: 'Splunk' },
          { id: '5.11f', name: 'CloudWatch' },
          { id: '5.11g', name: 'AppDynamics' }
        ],
        color: '#EC4899'
      }
    ];

    const layerHeight = (boxHeight - 20) / layers.length;

    return (
      <g key="platform-layers">
        {layers.map((layer, lIdx) => {
          const layerY = boxTop + 10 + (lIdx * layerHeight);
          const appSpacing = Math.min(75, (boxWidth - 120) / layer.apps.length);
          const totalAppsWidth = appSpacing * layer.apps.length;
          const startX = boxLeft + (boxWidth - totalAppsWidth) / 2;

          return (
            <g key={`pl-layer-${lIdx}`}>
              {/* Layer background with gradient */}
              <defs>
                <linearGradient id={`platform-grad-${lIdx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: layer.color, stopOpacity: 0.03 }} />
                  <stop offset="50%" style={{ stopColor: layer.color, stopOpacity: 0.08 }} />
                  <stop offset="100%" style={{ stopColor: layer.color, stopOpacity: 0.03 }} />
                </linearGradient>
              </defs>
              <rect
                x={boxLeft + 10}
                y={layerY}
                width={boxWidth - 20}
                height={layerHeight - 8}
                fill={`url(#platform-grad-${lIdx})`}
                rx="8"
                stroke={layer.color}
                strokeWidth="2.5"
              />

              {/* Layer name */}
              <text
                x={boxLeft + 20}
                y={layerY + 14}
                fill={layer.color}
                fontSize="9"
                fontWeight="800"
                letterSpacing="0.5"
              >
                {layer.name.toUpperCase()}
              </text>

              {/* Apps in layer */}
              {layer.apps.map((app, aIdx) => {
                const appX = startX + (aIdx * appSpacing) + (appSpacing / 2);
                const appY = layerY + layerHeight / 2 + 6;
                const isAssessed = assessedComponentIds.has(app.id);
                const nodeColor = isAssessed ? getNodeColor(app.id) : '#D1D5DB';

                return (
                  <g key={`pl-app-${lIdx}-${aIdx}`}>
                    {/* Glow effect for assessed */}
                    {isAssessed && (
                      <>
                        <circle cx={appX} cy={appY} r="13" fill={nodeColor} opacity="0.15" />
                        <circle cx={appX} cy={appY} r="10" fill={nodeColor} opacity="0.25" className="animate-pulse" />
                      </>
                    )}

                    {/* Main node */}
                    <circle
                      cx={appX}
                      cy={appY}
                      r="7"
                      fill={nodeColor}
                      stroke={layer.color}
                      strokeWidth="2.5"
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                    />

                    {/* App name */}
                    <text
                      x={appX}
                      y={appY + 16}
                      textAnchor="middle"
                      fill="#1F2937"
                      fontSize="7"
                      fontWeight="700"
                      style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}
                    >
                      {app.name}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    );
  };

  // Render Security & Compliance as GRID
  const renderSecurityComplianceGrid = (cluster: any) => {
    const boxLeft = cluster.x - cluster.width / 2;
    const boxTop = cluster.y - cluster.height / 2 + 60;
    const boxWidth = cluster.width;
    const boxHeight = cluster.height - 60;

    const items = [
      { id: '6.1', name: 'IAM', cat: 'Access' }, { id: '6.2', name: 'MFA', cat: 'Access' }, { id: '6.3', name: 'SSO', cat: 'Access' },
      { id: '6.4', name: 'Encryption', cat: 'Data' }, { id: '6.5', name: 'DLP', cat: 'Data' }, { id: '6.6', name: 'Key Mgmt', cat: 'Data' },
      { id: '6.7', name: 'Firewall', cat: 'Network' }, { id: '6.8', name: 'WAF', cat: 'Network' }, { id: '6.9', name: 'DDoS', cat: 'Network' },
      { id: '6.10', name: 'SIEM', cat: 'Monitor' }, { id: '6.11', name: 'Vuln Scan', cat: 'Monitor' }, { id: '6.12', name: 'Pen Test', cat: 'Monitor' },
      { id: '6.13', name: 'Compliance', cat: 'Gov' }, { id: '6.14', name: 'Audit', cat: 'Gov' }
    ];

    const cols = 5;
    const cellWidth = (boxWidth - 40) / cols;
    const cellHeight = 60;

    return (
      <g key="security-grid">
        {items.map((item, idx) => {
          const row = Math.floor(idx / cols);
          const col = idx % cols;
          const x = boxLeft + 20 + (col * cellWidth);
          const y = boxTop + 15 + (row * cellHeight);
          const isAssessed = assessedComponentIds.has(item.id);
          const nodeColor = isAssessed ? getNodeColor(item.id) : '#D1D5DB';

          return (
            <g key={`sec-${idx}`}>
              {isAssessed && <circle cx={x + cellWidth/2} cy={y + 20} r="11" fill={nodeColor} opacity="0.3" className="animate-pulse" />}
              <circle cx={x + cellWidth/2} cy={y + 20} r="8" fill={nodeColor} stroke="#EF4444" strokeWidth="2" />
              <text x={x + cellWidth/2} y={y + 36} textAnchor="middle" fill="#1F2937" fontSize="7.5" fontWeight="700">{item.name}</text>
              <text x={x + cellWidth/2} y={y + 45} textAnchor="middle" fill="#6B7280" fontSize="6.5">{item.cat}</text>
            </g>
          );
        })}
      </g>
    );
  };

  // Render DevOps as HORIZONTAL PIPELINE with comprehensive tools
  const renderDevOpsPipeline = (cluster: any) => {
    const boxLeft = cluster.x - cluster.width / 2;
    const boxTop = cluster.y - cluster.height / 2 + 60;
    const boxWidth = cluster.width;
    const boxHeight = cluster.height - 60;

    const stages = [
      {
        name: 'Infrastructure as Code',
        color: '#8B5CF6',
        apps: [
          { id: '7.1', name: 'Terraform' },
          { id: '7.1b', name: 'Ansible' },
          { id: '7.2', name: 'Puppet' },
          { id: '7.2b', name: 'Chef' }
        ]
      },
      {
        name: 'Version Control',
        color: '#3B82F6',
        apps: [
          { id: '7.3', name: 'GitHub Enterprise' },
          { id: '7.3b', name: 'GitLab' },
          { id: '7.4', name: 'Bitbucket' },
          { id: '7.4b', name: 'Azure Repos' }
        ]
      },
      {
        name: 'CI/CD Pipeline',
        color: '#10B981',
        apps: [
          { id: '7.5', name: 'Jenkins' },
          { id: '7.5b', name: 'Azure DevOps' },
          { id: '7.6', name: 'GitLab CI' },
          { id: '7.6b', name: 'TeamCity' },
          { id: '7.6c', name: 'Bamboo' }
        ]
      },
      {
        name: 'Artifact Repository',
        color: '#F59E0B',
        apps: [
          { id: '7.7', name: 'Nexus' },
          { id: '7.7b', name: 'Artifactory' },
          { id: '7.8', name: 'Docker Registry' },
          { id: '7.8b', name: 'Harbor' }
        ]
      },
      {
        name: 'Container Orchestration',
        color: '#EF4444',
        apps: [
          { id: '7.9', name: 'Kubernetes' },
          { id: '7.9b', name: 'OpenShift' },
          { id: '7.10', name: 'Docker Swarm' },
          { id: '7.10b', name: 'ECS' },
          { id: '7.10c', name: 'AKS/EKS/GKE' }
        ]
      },
      {
        name: 'Config Management',
        color: '#EC4899',
        apps: [
          { id: '7.11', name: 'Consul' },
          { id: '7.11b', name: 'Vault' },
          { id: '7.12', name: 'Spring Config' },
          { id: '7.12b', name: 'etcd' }
        ]
      },
      {
        name: 'Monitoring & Logging',
        color: '#DC2626',
        apps: [
          { id: '7.13', name: 'Prometheus' },
          { id: '7.13b', name: 'Grafana' },
          { id: '7.14', name: 'ELK Stack' },
          { id: '7.14b', name: 'Splunk' }
        ]
      }
    ];

    const stageWidth = (boxWidth - 40) / stages.length;

    return (
      <g key="devops-pipeline">
        {/* Arrow marker definition */}
        <defs>
          <marker id="devops-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#F97316" opacity="0.6" />
          </marker>
          {/* Gradient for pipeline flow */}
          <linearGradient id="pipeline-flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.3 }} />
            <stop offset="50%" style={{ stopColor: '#10B981', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#DC2626', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>

        {/* Pipeline flow line */}
        <line
          x1={boxLeft + 20}
          y1={boxTop + boxHeight / 2}
          x2={boxLeft + boxWidth - 20}
          y2={boxTop + boxHeight / 2}
          stroke="url(#pipeline-flow)"
          strokeWidth="3"
          opacity="0.4"
        />

        {stages.map((stage, sIdx) => {
          const stageX = boxLeft + 20 + (sIdx * stageWidth);
          const stageCenterX = stageX + stageWidth / 2;
          const stageY = boxTop + boxHeight / 2;
          const maxApps = Math.max(...stages.map(s => s.apps.length));
          const appSpacing = 32;
          const totalHeight = stage.apps.length * appSpacing;
          const startY = stageY - totalHeight / 2 + 16;

          return (
            <g key={`devops-stage-${sIdx}`}>
              {/* Stage box with gradient */}
              <defs>
                <linearGradient id={`stage-grad-${sIdx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: stage.color, stopOpacity: 0.05 }} />
                  <stop offset="100%" style={{ stopColor: stage.color, stopOpacity: 0.15 }} />
                </linearGradient>
              </defs>
              <rect
                x={stageX + 5}
                y={boxTop + 10}
                width={stageWidth - 10}
                height={boxHeight - 20}
                fill={`url(#stage-grad-${sIdx})`}
                rx="8"
                stroke={stage.color}
                strokeWidth="2.5"
              />

              {/* Stage name */}
              <text
                x={stageCenterX}
                y={boxTop + 28}
                textAnchor="middle"
                fill={stage.color}
                fontSize="8"
                fontWeight="900"
                letterSpacing="0.3"
              >
                {stage.name.toUpperCase()}
              </text>

              {/* Arrow to next stage */}
              {sIdx < stages.length - 1 && (
                <>
                  <line
                    x1={stageX + stageWidth - 5}
                    y1={stageY}
                    x2={stageX + stageWidth + 5}
                    y2={stageY}
                    stroke="#F97316"
                    strokeWidth="2.5"
                    opacity="0.5"
                    markerEnd="url(#devops-arrow)"
                  />
                  {/* Animated flow dots */}
                  <circle
                    cx={stageX + stageWidth}
                    cy={stageY}
                    r="2"
                    fill="#F97316"
                    opacity="0.7"
                    className="animate-pulse"
                  />
                </>
              )}

              {/* Apps in stage */}
              {stage.apps.map((app, aIdx) => {
                const appY = startY + (aIdx * appSpacing);
                const appX = stageCenterX;
                const isAssessed = assessedComponentIds.has(app.id);
                const nodeColor = isAssessed ? getNodeColor(app.id) : '#D1D5DB';

                return (
                  <g key={`devops-app-${sIdx}-${aIdx}`}>
                    {/* Glow effect for assessed */}
                    {isAssessed && (
                      <>
                        <circle cx={appX} cy={appY} r="12" fill={nodeColor} opacity="0.15" />
                        <circle cx={appX} cy={appY} r="9" fill={nodeColor} opacity="0.25" className="animate-pulse" />
                      </>
                    )}

                    {/* Main node */}
                    <circle
                      cx={appX}
                      cy={appY}
                      r="6"
                      fill={nodeColor}
                      stroke={stage.color}
                      strokeWidth="2.5"
                      style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}
                    />

                    {/* App name */}
                    <text
                      x={appX}
                      y={appY + 14}
                      textAnchor="middle"
                      fill="#1F2937"
                      fontSize="6.5"
                      fontWeight="700"
                      style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9)' }}
                    >
                      {app.name}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    );
  };

  // Render UX as compact groups
  const renderUXGroups = (cluster: any) => {
    const boxLeft = cluster.x - cluster.width / 2;
    const boxTop = cluster.y - cluster.height / 2 + 60;
    const boxWidth = cluster.width;

    const groups = [
      { name: 'Design', apps: [{ id: '8.1', name: 'Design Sys' }, { id: '8.2', name: 'Prototyping' }, { id: '8.3', name: 'Accessibility' }] },
      { name: 'Channels', apps: [{ id: '8.4', name: 'Web' }, { id: '8.5', name: 'Mobile' }, { id: '8.6', name: 'Voice/Chat' }] },
      { name: 'Performance', apps: [{ id: '8.7', name: 'Analytics' }, { id: '8.8', name: 'A/B Test' }, { id: '8.9', name: 'Personalization' }] }
    ];

    return (
      <g key="ux-groups">
        {groups.map((group, gIdx) => {
          const groupX = boxLeft + 30 + (gIdx * (boxWidth - 60) / 3);

          return (
            <g key={`ux-${gIdx}`}>
              <text x={groupX + 80} y={boxTop + 20} textAnchor="middle" fill="#14B8A6" fontSize="10" fontWeight="800">{group.name}</text>
              {group.apps.map((app, aIdx) => {
                const appY = boxTop + 45 + (aIdx * 55);
                const appX = groupX + 80;
                const isAssessed = assessedComponentIds.has(app.id);
                const nodeColor = isAssessed ? getNodeColor(app.id) : '#D1D5DB';

                return (
                  <g key={`ux-app-${gIdx}-${aIdx}`}>
                    {isAssessed && <circle cx={appX} cy={appY} r="10" fill={nodeColor} opacity="0.3" className="animate-pulse" />}
                    <circle cx={appX} cy={appY} r="8" fill={nodeColor} stroke="#14B8A6" strokeWidth="2" />
                    <text x={appX} y={appY + 18} textAnchor="middle" fill="#1F2937" fontSize="7.5" fontWeight="700">{app.name}</text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    );
  };

  // Render Implementation as simple grid
  const renderImplementationGrid = (cluster: any) => {
    const boxLeft = cluster.x - cluster.width / 2;
    const boxTop = cluster.y - cluster.height / 2 + 60;
    const boxWidth = cluster.width;

    const items = [
      { id: '9.1', name: 'PMO' }, { id: '9.2', name: 'Methodologies' }, { id: '9.3', name: 'Vendors' }, { id: '9.4', name: 'Training' }, { id: '9.5', name: 'Change Mgmt' },
      { id: '9.6', name: 'Comm Plan' }, { id: '9.7', name: 'Support' }, { id: '9.8', name: 'Adoption' }, { id: '9.9', name: 'Feedback' }, { id: '9.10', name: 'Benefits Real' }
    ];

    const cols = 5;
    const cellWidth = (boxWidth - 60) / cols;

    return (
      <g key="impl-grid">
        {items.map((item, idx) => {
          const row = Math.floor(idx / cols);
          const col = idx % cols;
          const x = boxLeft + 30 + (col * cellWidth);
          const y = boxTop + 30 + (row * 90);
          const isAssessed = assessedComponentIds.has(item.id);
          const nodeColor = isAssessed ? getNodeColor(item.id) : '#D1D5DB';

          return (
            <g key={`impl-${idx}`}>
              {isAssessed && <circle cx={x + cellWidth/2} cy={y} r="10" fill={nodeColor} opacity="0.3" className="animate-pulse" />}
              <circle cx={x + cellWidth/2} cy={y} r="8" fill={nodeColor} stroke="#A855F7" strokeWidth="2" />
              <text x={x + cellWidth/2} y={y + 18} textAnchor="middle" fill="#1F2937" fontSize="7.5" fontWeight="700">{item.name}</text>
            </g>
          );
        })}
      </g>
    );
  };

  // Define cluster metadata for visual grouping
  const clusterMetadata = [
    { x: 1100, y: 180, width: 650, height: 320, name: 'Strategy & Governance', layer: 0 },
    { x: 1100, y: 580, width: 650, height: 320, name: 'Business Architecture', layer: 1 },
    { x: 300, y: 1020, width: 580, height: 450, name: 'Core Applications', layer: 2 },
    { x: 950, y: 1020, width: 580, height: 280, name: 'Integration Hub', layer: 4 },
    { x: 1600, y: 1020, width: 580, height: 450, name: 'Data & Analytics', layer: 3 },
    { x: 1100, y: 1600, width: 650, height: 480, name: 'Platform & Infrastructure', layer: 5 },
    { x: 300, y: 2210, width: 580, height: 420, name: 'Security & Compliance', layer: 6 },
    { x: 950, y: 2210, width: 580, height: 280, name: 'User Experience', layer: 8 },
    { x: 1600, y: 2210, width: 800, height: 420, name: 'DevOps & Automation', layer: 7 },
    { x: 1100, y: 2760, width: 650, height: 280, name: 'Implementation & Change', layer: 9 }
  ];

  // Get layer color for legend
  const layerColors = [
    { layer: 0, name: 'Strategy', color: '#8B5CF6' },
    { layer: 1, name: 'Business', color: '#EC4899' },
    { layer: 2, name: 'Applications', color: '#3B82F6' },
    { layer: 3, name: 'Data', color: '#10B981' },
    { layer: 4, name: 'Integration', color: '#F59E0B' },
    { layer: 5, name: 'Platform', color: '#6366F1' },
    { layer: 6, name: 'Security', color: '#EF4444' },
    { layer: 7, name: 'DevOps', color: '#F97316' },
    { layer: 8, name: 'UX', color: '#14B8A6' },
    { layer: 9, name: 'Implementation', color: '#A855F7' }
  ];

  // Define EA layer connections
  // Index mapping: 0=Strategy, 1=Business, 2=Apps, 3=Integration, 4=Data, 5=Platform, 6=Security, 7=UX, 8=DevOps, 9=Implementation
  const connections = [
    // Strategic Flow - Strategy drives everything below
    { from: 0, to: 1, type: 'strategic', description: 'Strategy drives Business Capabilities', color: '#8B5CF6' },
    { from: 0, to: 6, type: 'strategic', description: 'Strategy defines Security Posture & Compliance Requirements', color: '#8B5CF6' },
    { from: 0, to: 4, type: 'strategic', description: 'Strategy requires KPIs & Metrics for tracking', color: '#8B5CF6' },

    // Business Implementation
    { from: 1, to: 2, type: 'implementation', description: 'Business processes implemented by Applications', color: '#EC4899' },

    // Application Integration (bidirectional)
    { from: 2, to: 3, type: 'integration', description: 'Applications communicate via Integration Hub', color: '#F59E0B' },
    { from: 3, to: 2, type: 'integration', description: 'Integration Hub connects Applications', color: '#F59E0B' },

    // Data Flow (bidirectional)
    { from: 2, to: 4, type: 'data', description: 'Applications produce/consume Data', color: '#10B981' },
    { from: 4, to: 2, type: 'data', description: 'Data feeds Applications', color: '#10B981' },

    // Integration-Data connection
    { from: 3, to: 4, type: 'data', description: 'Integration moves Data', color: '#10B981' },
    { from: 4, to: 3, type: 'data', description: 'Data flows through Integration', color: '#10B981' },

    // Infrastructure Dependencies
    { from: 2, to: 5, type: 'infrastructure', description: 'Applications run on Platform', color: '#6366F1' },
    { from: 3, to: 5, type: 'infrastructure', description: 'Integration runs on Platform', color: '#6366F1' },
    { from: 4, to: 5, type: 'infrastructure', description: 'Data stored on Platform', color: '#6366F1' },

    // UX to Applications
    { from: 7, to: 2, type: 'interface', description: 'UX provides interface to Applications', color: '#14B8A6' },

    // DevOps automation
    { from: 8, to: 2, type: 'automation', description: 'DevOps deploys Applications', color: '#F97316' },
    { from: 8, to: 5, type: 'automation', description: 'DevOps provisions Platform', color: '#F97316' },

    // Security & Compliance (cross-cutting - protects all layers)
    { from: 6, to: 2, type: 'security', description: 'Security protects Applications', color: '#EF4444' },
    { from: 6, to: 4, type: 'security', description: 'Security protects Data & Privacy', color: '#EF4444' },
    { from: 6, to: 5, type: 'security', description: 'Security secures Platform Infrastructure', color: '#EF4444' },
    { from: 6, to: 3, type: 'security', description: 'Security secures Integration & APIs', color: '#EF4444' },
    { from: 6, to: 7, type: 'security', description: 'Security provides Authentication & Authorization', color: '#EF4444' },

    // Implementation & Change (delivers transformation)
    { from: 9, to: 0, type: 'transformation', description: 'Implementation delivers Strategic Initiatives', color: '#A855F7' },
    { from: 9, to: 1, type: 'transformation', description: 'Implementation enables Business Change', color: '#A855F7' },
    { from: 9, to: 2, type: 'transformation', description: 'Implementation delivers new Applications', color: '#A855F7' },
  ];

  // Helper function to calculate edge intersection point
  const getEdgePoint = (
    boxCenterX: number,
    boxCenterY: number,
    boxWidth: number,
    boxHeight: number,
    targetX: number,
    targetY: number
  ) => {
    // Calculate direction from box center to target
    const dx = targetX - boxCenterX;
    const dy = targetY - boxCenterY;

    // Avoid division by zero
    if (dx === 0 && dy === 0) {
      return { x: boxCenterX, y: boxCenterY };
    }

    // Calculate the angle
    const angle = Math.atan2(dy, dx);

    // Half dimensions
    const halfWidth = boxWidth / 2;
    const halfHeight = boxHeight / 2;

    // Calculate intersection with box edges
    // We need to find which edge the line intersects
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    let edgeX = boxCenterX;
    let edgeY = boxCenterY;

    // Determine which edge to use based on the angle
    if (absDx / halfWidth > absDy / halfHeight) {
      // Intersection with left or right edge
      edgeX = boxCenterX + (dx > 0 ? halfWidth : -halfWidth);
      edgeY = boxCenterY + (edgeX - boxCenterX) * (dy / dx);
    } else {
      // Intersection with top or bottom edge
      edgeY = boxCenterY + (dy > 0 ? halfHeight : -halfHeight);
      edgeX = boxCenterX + (edgeY - boxCenterY) * (dx / dy);
    }

    return { x: edgeX, y: edgeY };
  };

  // Function to render curved arrow connections between boxes
  const renderConnections = () => {
    if (!showConnections) return null;

    // Group connections by source AND destination box to calculate bundle points
    const connectionsBySource: Map<number, number[]> = new Map();
    const connectionsByDestination: Map<number, number[]> = new Map();

    connections.forEach((conn, idx) => {
      // Group by source
      if (!connectionsBySource.has(conn.from)) {
        connectionsBySource.set(conn.from, []);
      }
      connectionsBySource.get(conn.from)!.push(idx);

      // Group by destination
      if (!connectionsByDestination.has(conn.to)) {
        connectionsByDestination.set(conn.to, []);
      }
      connectionsByDestination.get(conn.to)!.push(idx);
    });

    // Calculate bundle points for each source box (single convergence point for outgoing)
    const sourceBundlePoints: Map<number, { x: number; y: number }> = new Map();
    // Calculate bundle points for each destination box (single convergence point for incoming)
    const destBundlePoints: Map<number, { x: number; y: number }> = new Map();

    connectionsBySource.forEach((connIndices, sourceBoxId) => {
      const fromBox = clusterMetadata[sourceBoxId];
      const fromPos = boxPositions[sourceBoxId] || { x: fromBox.x, y: fromBox.y };

      // Calculate average direction of all outgoing connections from this source
      let avgDx = 0;
      let avgDy = 0;

      connIndices.forEach(idx => {
        const conn = connections[idx];
        const toBox = clusterMetadata[conn.to];
        const toPos = boxPositions[conn.to] || { x: toBox.x, y: toBox.y };

        avgDx += toPos.x - fromPos.x;
        avgDy += toPos.y - fromPos.y;
      });

      avgDx /= connIndices.length;
      avgDy /= connIndices.length;

      // Calculate the bundle point on the edge using average direction
      const bundlePoint = getEdgePoint(
        fromPos.x,
        fromPos.y,
        fromBox.width,
        fromBox.height,
        fromPos.x + avgDx,
        fromPos.y + avgDy
      );

      sourceBundlePoints.set(sourceBoxId, bundlePoint);
    });

    // Calculate bundle points for each DESTINATION box
    connectionsByDestination.forEach((connIndices, destBoxId) => {
      const toBox = clusterMetadata[destBoxId];
      const toPos = boxPositions[destBoxId] || { x: toBox.x, y: toBox.y };

      // Calculate average direction of all incoming connections to this destination
      let avgDx = 0;
      let avgDy = 0;

      connIndices.forEach(idx => {
        const conn = connections[idx];
        const fromBox = clusterMetadata[conn.from];
        const fromPos = boxPositions[conn.from] || { x: fromBox.x, y: fromBox.y };

        avgDx += fromPos.x - toPos.x;
        avgDy += fromPos.y - toPos.y;
      });

      avgDx /= connIndices.length;
      avgDy /= connIndices.length;

      // Calculate the bundle point on the destination edge using average incoming direction
      const bundlePoint = getEdgePoint(
        toPos.x,
        toPos.y,
        toBox.width,
        toBox.height,
        toPos.x + avgDx,
        toPos.y + avgDy
      );

      destBundlePoints.set(destBoxId, bundlePoint);
    });

    return connections.map((conn, idx) => {
      const fromBox = clusterMetadata[conn.from];
      const toBox = clusterMetadata[conn.to];

      // Get the color from the source box's layer (line matches source box color)
      const sourceLayer = fromBox.layer;
      const lineColor = layerColors.find(lc => lc.layer === sourceLayer)?.color || conn.color;

      // Get dynamic positions or use defaults
      const fromPos = boxPositions[conn.from] || { x: fromBox.x, y: fromBox.y };
      const toPos = boxPositions[conn.to] || { x: toBox.x, y: toBox.y };

      // Use the BUNDLE POINT for the source (all lines from same box start from same point)
      const fromEdge = sourceBundlePoints.get(conn.from)!;

      // Use the BUNDLE POINT for the destination (all lines to same box end at same point)
      const toEdge = destBundlePoints.get(conn.to)!;

      const x1 = fromEdge.x;
      const y1 = fromEdge.y;

      // For the endpoint, we want all arrows to point to the EXACT same convergence point
      // No offset - let all arrows converge to the exact same pixel
      const x2 = toEdge.x;
      const y2 = toEdge.y;

      // Calculate direction and distance
      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate control points for smooth Bezier curve
      const controlPointOffset = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) * 0.4 : Math.abs(dy) * 0.4;

      // Create curved path
      const cx1 = x1 + (dx > 0 ? controlPointOffset : -controlPointOffset);
      const cy1 = y1;
      const cx2 = x2 - (dx > 0 ? controlPointOffset : -controlPointOffset);
      const cy2 = y2;

      const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

      const isHovered = hoveredConnection === idx;
      // Light up connections based on filter mode
      const isConnectedToSelected = selectedBox !== null && (
        connectionFilter === 'both' ? (conn.from === selectedBox || conn.to === selectedBox) :
        connectionFilter === 'outgoing' ? conn.from === selectedBox :
        connectionFilter === 'incoming' ? conn.to === selectedBox :
        false
      );
      const shouldFade = selectedBox !== null && !isConnectedToSelected;

      // Calculate midpoint for tooltip positioning
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;

      // Determine opacity and stroke width based on state
      let opacity = 0.4; // Default visibility when connections are shown
      let strokeWidth = "2";

      if (isHovered) {
        opacity = 1.0;
        strokeWidth = "5";
      } else if (isConnectedToSelected) {
        // CONNECTED TO SELECTED BOX - LIGHT UP!
        opacity = 1.0;
        strokeWidth = "5";
      } else if (selectedBox === null) {
        // Nothing selected - all connections clearly visible
        opacity = 0.5;
        strokeWidth = "2";
      } else if (selectedBox !== null && !isConnectedToSelected) {
        // Box selected but this line is NOT connected - fade out
        opacity = 0.08;
        strokeWidth = "1";
      }

      return (
        <g key={`connection-${idx}`}>
          {/* Invisible wider path for easier hover detection */}
          <path
            d={pathData}
            fill="none"
            stroke="transparent"
            strokeWidth="12"
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => {
              setHoveredConnection(idx);
              const rect = e.currentTarget.getBoundingClientRect();
              setTooltipPosition({
                x: e.clientX,
                y: e.clientY
              });
            }}
            onMouseMove={(e) => {
              setTooltipPosition({
                x: e.clientX,
                y: e.clientY
              });
            }}
            onMouseLeave={() => {
              setHoveredConnection(null);
            }}
          />

          {/* Visible connection line */}
          <path
            d={pathData}
            fill="none"
            stroke={lineColor}
            strokeWidth={strokeWidth}
            opacity={opacity}
            markerEnd={`url(#arrowhead-${idx})`}
            style={{
              pointerEvents: 'none',
              animation: isConnectedToSelected || isHovered ? 'connectionPulseHover 2s ease-in-out infinite' : 'none',
              animationDelay: `${idx * 0.2}s`,
              transition: 'opacity 0.3s ease, stroke-width 0.3s ease'
            }}
          />

          {/* Arrow marker */}
          <defs>
            <marker
              id={`arrowhead-${idx}`}
              markerWidth="16"
              markerHeight="16"
              refX="14"
              refY="7"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path
                d="M0,0 L0,14 L14,7 z"
                fill={lineColor}
                opacity={isConnectedToSelected || isHovered ? "1.0" : "0.6"}
                style={{ transition: 'opacity 0.3s' }}
              />
            </marker>
          </defs>
        </g>
      );
    });
  };

  return (
    <div className="h-screen bg-gray-50 relative overflow-hidden">
      {/* Title at the very top */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 py-3">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Enterprise Architecture Network
        </h1>
      </div>

      {/* Header Controls - Below Title */}
      <div className="absolute top-16 left-4 z-20 flex gap-3">
        <button
          onClick={() => setShowQuestions(!showQuestions)}
          className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-xl hover:bg-white transition-colors text-sm font-medium"
        >
          {showQuestions ? 'Hide' : 'Show'} Questions
        </button>
        <button
          onClick={() => setCurrentView('questionnaire')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-xl hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Take Assessment
        </button>
        <button
          onClick={() => setShowConnections(!showConnections)}
          className={`px-4 py-2 rounded-lg shadow-xl transition-colors text-sm font-medium ${
            showConnections
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-white/90 backdrop-blur-sm hover:bg-white'
          }`}
        >
          {showConnections ? '🔗 Hide' : '🔗 Show'} Connections
        </button>

        {/* Connection Filter Dropdown */}
        {showConnections && (
          <div className="relative group">
            <button
              className="px-4 py-2 rounded-lg shadow-xl bg-white/90 backdrop-blur-sm hover:bg-white transition-colors text-sm font-medium flex items-center gap-2"
            >
              <span>Filter:</span>
              <span className="font-semibold text-blue-600">
                {connectionFilter === 'both' ? 'Both' : connectionFilter === 'outgoing' ? 'Outgoing' : 'Incoming'}
              </span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
              <div className="py-2">
                <button
                  onClick={() => setConnectionFilter('both')}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-blue-50 transition-colors ${
                    connectionFilter === 'both' ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">↔️</span>
                    <div>
                      <div>Both Directions</div>
                      <div className="text-xs text-gray-500">Incoming + Outgoing</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setConnectionFilter('outgoing')}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-blue-50 transition-colors ${
                    connectionFilter === 'outgoing' ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">→</span>
                    <div>
                      <div>Outgoing Only</div>
                      <div className="text-xs text-gray-500">Lines going out</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setConnectionFilter('incoming')}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-blue-50 transition-colors ${
                    connectionFilter === 'incoming' ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">←</span>
                    <div>
                      <div>Incoming Only</div>
                      <div className="text-xs text-gray-500">Lines coming in</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Zoom Controls - Top Right */}
      <div className="absolute top-16 right-4 z-20">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 flex items-center justify-center bg-blue-50 hover:bg-blue-100 rounded transition-colors"
              title="Zoom Out"
            >
              <span className="text-lg font-bold text-blue-600">−</span>
            </button>
            <button
              onClick={handleResetZoom}
              className="px-3 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded transition-colors"
              title="Reset Zoom & Pan"
            >
              <span className="text-xs font-medium text-gray-600">{(zoom * 100).toFixed(0)}%</span>
            </button>
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 flex items-center justify-center bg-blue-50 hover:bg-blue-100 rounded transition-colors"
              title="Zoom In"
            >
              <span className="text-lg font-bold text-blue-600">+</span>
            </button>
          </div>
          <div className="text-center mt-2 text-[10px] text-gray-500">
            Drag to pan
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-4 max-w-xs">
        <h3 className="font-semibold text-sm text-gray-900 mb-3">Maturity Levels</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#D1D5DB' }} />
            <span>Not Assessed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FEE2E2' }} />
            <span>Critical (1-2)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FED7AA' }} />
            <span>Developing (2-3)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FEF3C7' }} />
            <span>Defined (3-4)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#D1FAE5' }} />
            <span>Managed (4-5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#A7F3D0' }} />
            <span>Optimized (5)</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-sm text-gray-900 mb-2">EA Layers</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {layerColors.map(({ name, color }) => (
              <div key={name} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color, opacity: 0.3 }} />
                <span className="text-gray-700">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Ring - Bottom Right */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-4 text-center">
          <div className="relative w-24 h-24">
            <svg className="transform -rotate-90 w-24 h-24">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#10B981"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(assessedComponentIds.size / 109) * 251.2} 251.2`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round((assessedComponentIds.size / 109) * 100)}%
                </div>
                <div className="text-xs text-gray-600">Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Sidebar (if shown) */}
      {showQuestions && (
        <div className="absolute top-28 right-4 z-20 w-80 max-h-[calc(100vh-140px)] overflow-y-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl">
          <div className="p-4 border-b border-gray-200 sticky top-0 bg-white">
            <h3 className="font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-4 space-y-2">
            <button
              onClick={() => setCurrentView('questionnaire')}
              className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors"
            >
              <div className="font-medium text-blue-900">Start Assessment</div>
              <div className="text-sm text-blue-700">Answer questions to light up the map</div>
            </button>
            <button
              onClick={() => setCurrentView('results')}
              className="w-full px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors"
            >
              <div className="font-medium text-green-900">View Results</div>
              <div className="text-sm text-green-700">See maturity scores</div>
            </button>
            <button
              onClick={() => setCurrentView('gaps')}
              className="w-full px-4 py-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors"
            >
              <div className="font-medium text-orange-900">Gap Analysis</div>
              <div className="text-sm text-orange-700">Identify improvement areas</div>
            </button>
          </div>
        </div>
      )}

      {/* Main SVG Network Map */}
      <div
        className="w-full h-full pt-28 px-4 overflow-hidden select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={(e) => {
          handleMouseMove(e);
          handleBoxMouseMove(e);
        }}
        onMouseUp={() => {
          handleMouseUp();
          handleBoxMouseUp();
        }}
        onMouseLeave={() => {
          handleMouseLeave();
          handleBoxMouseUp();
        }}
        style={{ cursor: isDragging ? 'grabbing' : (draggedBox !== null ? 'grabbing' : 'grab') }}
      >
        <svg
          viewBox="0 0 2200 3180"
          className="w-full"
          style={{ minHeight: '3180px' }}
          preserveAspectRatio="xMidYMin meet"
        >
          {/* Apply zoom and pan transform to all content */}
          <g
            transform={`translate(${panX / zoom}, ${panY / zoom}) scale(${zoom})`}
            style={{ transition: isDragging ? 'none' : 'transform 0.3s ease-out' }}
          >
          {/* Connection lines (rendered first, behind boxes) */}
          {renderConnections()}

          {/* Cluster Groups with Beautiful Boxes */}
          {clusterMetadata.map((cluster, clusterIndex) => {
            const layerColor = layerColors.find(l => l.layer === cluster.layer)?.color || '#6B7280';
            // Get dynamic position or use default
            const boxPos = boxPositions[clusterIndex] || { x: cluster.x, y: cluster.y };
            const currentCluster = { ...cluster, x: boxPos.x, y: boxPos.y };

            const isSelected = selectedBox === clusterIndex;

            return (
              <g key={`cluster-${cluster.layer}`}>
                {/* Cluster outer border */}
                <rect
                  x={currentCluster.x - currentCluster.width / 2}
                  y={currentCluster.y - currentCluster.height / 2}
                  width={currentCluster.width}
                  height={currentCluster.height}
                  fill="white"
                  stroke={layerColor}
                  strokeWidth={isSelected ? "5" : "3"}
                  rx="12"
                  opacity="0.9"
                  filter={isSelected ? "drop-shadow(0 0 8px rgba(59, 130, 246, 0.35)) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.12))" : "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"}
                  style={{ transition: 'stroke-width 0.2s ease, filter 0.2s ease' }}
                />
                {/* Cluster background fill - CLICKABLE */}
                <rect
                  x={currentCluster.x - currentCluster.width / 2}
                  y={currentCluster.y - currentCluster.height / 2}
                  width={currentCluster.width}
                  height={currentCluster.height}
                  fill={layerColor}
                  opacity={isSelected ? "0.12" : "0.05"}
                  rx="12"
                  onClick={() => setSelectedBox(selectedBox === clusterIndex ? null : clusterIndex)}
                  style={{ cursor: 'pointer', transition: 'opacity 0.2s ease' }}
                />
                {/* Cluster header bar - DRAGGABLE */}
                <rect
                  x={currentCluster.x - currentCluster.width / 2}
                  y={currentCluster.y - currentCluster.height / 2}
                  width={currentCluster.width}
                  height="45"
                  fill={layerColor}
                  opacity="0.15"
                  rx="12"
                  onMouseDown={(e) => handleBoxMouseDown(e, clusterIndex, currentCluster.x, currentCluster.y)}
                  style={{ cursor: 'move' }}
                  className="hover:opacity-30 transition-opacity"
                />
                {/* Cluster label */}
                <text
                  x={currentCluster.x}
                  y={currentCluster.y - currentCluster.height / 2 + 28}
                  textAnchor="middle"
                  fill={layerColor}
                  fontSize="18"
                  fontWeight="700"
                >
                  {cluster.name}
                </text>
              </g>
            );
          })}

          {/* Strategy & Governance - Tree */}
          {renderStrategyGovernanceTree({...clusterMetadata[0], x: boxPositions[0]?.x || clusterMetadata[0].x, y: boxPositions[0]?.y || clusterMetadata[0].y}, layerColors[0].color)}

          {/* Business Architecture - Tree */}
          {renderBusinessArchitectureTree({...clusterMetadata[1], x: boxPositions[1]?.x || clusterMetadata[1].x, y: boxPositions[1]?.y || clusterMetadata[1].y}, layerColors[1].color)}

          {/* Core Applications - Tree */}
          {renderCoreApplicationsTree({...clusterMetadata[2], x: boxPositions[2]?.x || clusterMetadata[2].x, y: boxPositions[2]?.y || clusterMetadata[2].y}, layerColors[2].color)}

          {/* Data & Analytics - Tree */}
          {renderDataAnalyticsTree({...clusterMetadata[4], x: boxPositions[4]?.x || clusterMetadata[4].x, y: boxPositions[4]?.y || clusterMetadata[4].y}, layerColors[3].color)}

          {/* Integration Hub - Tree */}
          {renderIntegrationHubTree({...clusterMetadata[3], x: boxPositions[3]?.x || clusterMetadata[3].x, y: boxPositions[3]?.y || clusterMetadata[3].y}, layerColors[4].color)}

          {/* Platform & Infrastructure - Horizontal Layers */}
          {renderPlatformInfrastructureLayers({...clusterMetadata[5], x: boxPositions[5]?.x || clusterMetadata[5].x, y: boxPositions[5]?.y || clusterMetadata[5].y})}

          {/* Security & Compliance - Grid */}
          {renderSecurityComplianceGrid({...clusterMetadata[6], x: boxPositions[6]?.x || clusterMetadata[6].x, y: boxPositions[6]?.y || clusterMetadata[6].y})}

          {/* DevOps & Automation - Pipeline */}
          {renderDevOpsPipeline({...clusterMetadata[8], x: boxPositions[8]?.x || clusterMetadata[8].x, y: boxPositions[8]?.y || clusterMetadata[8].y})}

          {/* User Experience - Compact Groups */}
          {renderUXGroups({...clusterMetadata[7], x: boxPositions[7]?.x || clusterMetadata[7].x, y: boxPositions[7]?.y || clusterMetadata[7].y})}

          {/* Implementation & Change - Grid */}
          {renderImplementationGrid({...clusterMetadata[9], x: boxPositions[9]?.x || clusterMetadata[9].x, y: boxPositions[9]?.y || clusterMetadata[9].y})}

          {/* Nodes - None left, all have custom visualizations */}
          {nodes.filter(node => false).map((node) => {
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode === node.id;
            const layerColor = layerColors.find(l => l.layer === node.layer)?.color || '#6B7280';

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(isSelected ? null : node.id)}
                style={{ cursor: 'pointer' }}
                className="transition-all"
              >
                {/* Outer glow ring for assessed nodes */}
                {node.assessed && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius + 4}
                    fill={node.color}
                    opacity="0.3"
                    className="animate-pulse"
                  />
                )}

                {/* Layer indicator ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius + 2}
                  fill="none"
                  stroke={layerColor}
                  strokeWidth={isHovered || isSelected ? '2' : '1'}
                  opacity="0.6"
                />

                {/* Main node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius}
                  fill={node.color}
                  stroke={isHovered || isSelected ? '#60A5FA' : '#D1D5DB'}
                  strokeWidth={isHovered || isSelected ? '2.5' : '1.5'}
                  className="transition-all"
                  filter={isHovered ? 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.8))' : undefined}
                />

                {/* Node label - wrapped text with vendor names */}
                <foreignObject
                  x={node.x - 50}
                  y={node.y + node.radius + 6}
                  width="100"
                  height="60"
                  style={{ pointerEvents: 'none', overflow: 'visible' }}
                >
                  <div
                    style={{
                      fontSize: '8.5px',
                      fontWeight: '600',
                      color: '#1F2937',
                      textAlign: 'center',
                      lineHeight: '1.1',
                      wordWrap: 'break-word',
                      hyphens: 'auto'
                    }}
                  >
                    {node.name}
                    {node.vendors && node.vendors.length > 0 && (
                      <div
                        style={{
                          fontSize: '7px',
                          fontWeight: '400',
                          color: '#6B7280',
                          marginTop: '1px',
                          lineHeight: '1.0'
                        }}
                      >
                        {node.vendors.slice(0, 2).join(', ')}
                      </div>
                    )}
                  </div>
                </foreignObject>

                {/* Maturity score badge */}
                {node.assessed && node.maturityScore && (
                  <g>
                    <circle
                      cx={node.x + node.radius - 3}
                      cy={node.y - node.radius + 3}
                      r="9"
                      fill="#10B981"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <text
                      x={node.x + node.radius - 3}
                      y={node.y - node.radius + 6}
                      textAnchor="middle"
                      fill="white"
                      fontSize="8"
                      fontWeight="bold"
                      style={{ pointerEvents: 'none' }}
                    >
                      {node.maturityScore.toFixed(1)}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Tooltips - rendered last so they appear on top */}
          {nodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            if (!isHovered) return null;

            const layerColor = layerColors.find(l => l.layer === node.layer)?.color || '#6B7280';
            const allVendors = vendors.filter(v => v.componentIds.includes(node.id));
            const tooltipHeight = node.assessed ? 100 : (allVendors.length > 0 ? 120 : 80);

            return (
              <g key={`tooltip-${node.id}`} style={{ pointerEvents: 'none' }}>
                <rect
                  x={node.x + node.radius + 10}
                  y={node.y - 40}
                  width="220"
                  height={tooltipHeight}
                  fill="white"
                  stroke="#60A5FA"
                  strokeWidth="2"
                  rx="8"
                  filter="drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))"
                />
                <text
                  x={node.x + node.radius + 20}
                  y={node.y - 20}
                  fill="#1F2937"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {node.name}
                </text>
                <text
                  x={node.x + node.radius + 20}
                  y={node.y - 5}
                  fill="#6B7280"
                  fontSize="10"
                >
                  {layerColors.find(l => l.layer === node.layer)?.name || 'Layer'} {node.layer}
                </text>
                {node.assessed ? (
                  <>
                    <text
                      x={node.x + node.radius + 20}
                      y={node.y + 12}
                      fill="#10B981"
                      fontSize="11"
                      fontWeight="600"
                    >
                      ✓ Assessed
                    </text>
                    <text
                      x={node.x + node.radius + 20}
                      y={node.y + 26}
                      fill="#374151"
                      fontSize="10"
                    >
                      Maturity: {node.maturityScore?.toFixed(1)}/5.0
                    </text>
                  </>
                ) : (
                  <text
                    x={node.x + node.radius + 20}
                    y={node.y + 12}
                    fill="#9CA3AF"
                    fontSize="11"
                  >
                    Not yet assessed
                  </text>
                )}
                {allVendors.length > 0 && (
                  <>
                    <text
                      x={node.x + node.radius + 20}
                      y={node.y + (node.assessed ? 44 : 30)}
                      fill="#374151"
                      fontSize="9"
                      fontWeight="600"
                    >
                      Common Vendors:
                    </text>
                    {allVendors.slice(0, 4).map((vendor, idx) => (
                      <text
                        key={idx}
                        x={node.x + node.radius + 20}
                        y={node.y + (node.assessed ? 58 : 44) + (idx * 12)}
                        fill="#6B7280"
                        fontSize="9"
                      >
                        • {vendor.name}
                      </text>
                    ))}
                  </>
                )}
              </g>
            );
          })}
          </g>
        </svg>
      </div>

      {/* Instructions overlay (shown when nothing assessed) */}
      {assessedComponentIds.size === 0 && (
        <div className="absolute inset-0 top-28 flex items-center justify-center z-30 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md text-center pointer-events-auto">
            <div className="text-6xl mb-4">🗺️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Welcome to Your EA Network
            </h2>
            <p className="text-gray-600 mb-6">
              This map shows all 109 components of a complete Enterprise Architecture.
              Everything is currently gray - representing the perfect landscape.
            </p>
            <p className="text-gray-700 font-medium mb-6">
              <span className="text-blue-600">Answer assessment questions</span> to light up your actual architecture!
            </p>
            <button
              onClick={() => setCurrentView('questionnaire')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
            >
              Start Assessment →
            </button>
          </div>
        </div>
      )}

      {/* Connection Tooltip */}
      {hoveredConnection !== null && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${tooltipPosition.x + 15}px`,
            top: `${tooltipPosition.y + 15}px`,
            transform: 'translate(0, -50%)'
          }}
        >
          <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-2xl max-w-xs">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: connections[hoveredConnection].color }}
              />
              <span className="text-xs font-semibold uppercase tracking-wide opacity-75">
                {connections[hoveredConnection].type}
              </span>
            </div>
            <div className="text-sm font-medium">
              {connections[hoveredConnection].description}
            </div>
            <div className="mt-2 text-xs opacity-75">
              {clusterMetadata[connections[hoveredConnection].from].name} → {clusterMetadata[connections[hoveredConnection].to].name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Build network layout with grouped positioning
 * Groups related systems together in logical clusters
 */
function buildNetworkLayout(
  getNodeColor: (id: string) => string,
  assessedComponentIds: Set<string>,
  getMaturityScore: (id: string) => number | undefined,
  getVendorNames: (id: string) => string[]
): { nodes: Node[] } {
  const nodes: Node[] = [];

  // Define cluster positions for each layer (x, y coordinates for cluster center)
  const layerClusters = [
    { x: 1100, y: 180, width: 650, height: 230, name: 'Strategy & Governance' },      // Layer 0
    { x: 1100, y: 500, width: 650, height: 280, name: 'Business Architecture' },      // Layer 1
    { x: 300, y: 900, width: 580, height: 450, name: 'Core Applications' },           // Layer 2
    { x: 1600, y: 900, width: 580, height: 450, name: 'Data & Analytics' },           // Layer 3
    { x: 950, y: 900, width: 580, height: 280, name: 'Integration Hub' },             // Layer 4
    { x: 1100, y: 1480, width: 650, height: 350, name: 'Platform & Infrastructure' }, // Layer 5
    { x: 300, y: 1960, width: 580, height: 420, name: 'Security & Compliance' },      // Layer 6
    { x: 1600, y: 1960, width: 580, height: 420, name: 'DevOps & Automation' },       // Layer 7
    { x: 950, y: 1960, width: 580, height: 280, name: 'User Experience' },            // Layer 8
    { x: 1100, y: 2510, width: 650, height: 280, name: 'Implementation & Change' }    // Layer 9
  ];

  eaLayers.forEach((layer, layerIdx) => {
    const cluster = layerClusters[layerIdx];
    const components = layer.components;
    const count = components.length;

    // Calculate grid layout that fits within the cluster box
    const availableWidth = cluster.width - 120; // Padding on sides (increased)
    const availableHeight = cluster.height - 140; // Space for header and padding (increased)

    const columns = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / columns);

    // Calculate spacing to fit within available space
    const spacingX = columns > 1 ? Math.min(130, availableWidth / (columns - 0.5)) : availableWidth;
    const spacingY = rows > 1 ? Math.min(110, availableHeight / (rows - 0.5)) : availableHeight;

    components.forEach((component, compIdx) => {
      const row = Math.floor(compIdx / columns);
      const col = compIdx % columns;

      // Position nodes within the cluster box boundaries
      const gridWidth = (columns - 1) * spacingX;
      const gridHeight = (rows - 1) * spacingY;

      // Center the grid horizontally and vertically within the available space
      const startX = cluster.x - gridWidth / 2;
      const startY = cluster.y - cluster.height / 2 + 70 + (availableHeight - gridHeight) / 2;

      const x = startX + col * spacingX;
      const y = startY + row * spacingY;

      nodes.push({
        id: component.id,
        name: component.name,
        layer: layer.id,
        x,
        y,
        radius: 12,
        color: getNodeColor(component.id),
        maturityScore: getMaturityScore(component.id),
        assessed: assessedComponentIds.has(component.id),
        vendors: getVendorNames(component.id)
      });
    });
  });

  return { nodes };
}
