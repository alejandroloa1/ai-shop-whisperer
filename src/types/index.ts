
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
