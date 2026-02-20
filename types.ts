
export enum PipelineStage {
  PROSPECT = 'PROSPECT',
  LEAD = 'LEAD',
  QUALIFIED = 'QUALIFIED',
  OUTREACH = 'OUTREACH',
  PROPOSAL = 'PROPOSAL',
  CLOSED = 'CLOSED'
}

export interface BusinessIdentity {
  name: string;
  industry: string;
  website?: string;
  location?: string;
  contactEmail?: string;
  phone?: string;
}

export interface AuditSignals {
  websiteScore: number;
  mobileReady: boolean;
  socialPresence: string[];
  brandingLevel: 'Poor' | 'Average' | 'Good';
  missingLinks: string[];
}

export interface Lead {
  id: string;
  identity: BusinessIdentity;
  stage: PipelineStage;
  signals: AuditSignals;
  lastUpdated: string;
  recommendedServices: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export enum WorkingArea {
  DASHBOARD = 'DASHBOARD',
  PROSPECT = 'PROSPECT',
  LEADS = 'LEADS',
  SERVICES = 'SERVICES',
  SMART_DUMP = 'SMART_DUMP',
  PIPELINE = 'PIPELINE',
  REPORTS = 'REPORTS',
  OUTREACH = 'OUTREACH',
  SETTINGS = 'SETTINGS'
}
