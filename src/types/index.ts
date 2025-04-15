
export interface Customer {
  id: string;
  name: string;
  email: string;
  lastPurchase: string;
  totalSpent: number;
  purchaseCount: number;
  ltv: number;
  rfmScore: {
    recency: number;
    frequency: number;
    monetary: number;
    total: number;
  };
  segment: 'Champions' | 'Loyal' | 'Potential' | 'New' | 'Promising' | 'Needs Attention' | 'At Risk' | 'Lost';
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  category: 'Promotion' | 'Retention' | 'Reactivation' | 'Growth';
  segment?: string;
}

export interface SalesData {
  date: string;
  revenue: number;
  transactions: number;
}

export interface RFMDistribution {
  segment: string;
  count: number;
  value: number;
  color: string;
}

export type TimeRange = '7d' | '30d' | '90d' | '12m' | 'all';

export interface SalesGoal {
  period: 'daily' | 'monthly' | 'yearly';
  target: number;
  achieved: number;
  percentage: number;
}

export interface CustomerBreakdown {
  new: {
    count: number;
    revenue: number;
    averageTicket: number;
    percentage: number;
  };
  returning: {
    count: number;
    revenue: number;
    averageTicket: number;
    percentage: number;
  };
  atRisk: {
    count: number;
    percentage: number;
  };
  lost: {
    count: number;
    percentage: number;
  };
}

export interface SalesChannel {
  name: 'Online' | 'Offline' | 'Mobile' | 'Social';
  value: number;
  tickets: number;
  percentage: number;
}

export interface CityData {
  city: string;
  sales: number;
  growth: number;
}

export interface CategoryData {
  name: string;
  value: number;
  growth: number;
  percentage: number;
}

export interface SmartSegment {
  id: string;
  name: string;
  description: string;
  size: number;
  value: number;
  recency: number;
  behavior: string;
}

export interface Campaign {
  id: string;
  name: string;
  platform: 'Meta' | 'Google' | 'Email' | 'WhatsApp';
  segment: string;
  roas: number;
  ctr: number;
  impressions: number;
  conversions: number;
  cost: number;
  bestTime: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  category: 'Trend' | 'Anomaly' | 'Opportunity';
  action: string;
}
