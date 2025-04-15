
// This file used to contain TypeScript interfaces
// In JavaScript, we use JSDoc comments or PropTypes for type information

/**
 * @typedef {Object} Customer
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} lastPurchase
 * @property {number} totalSpent
 * @property {number} purchaseCount
 * @property {number} ltv
 * @property {Object} rfmScore
 * @property {number} rfmScore.recency
 * @property {number} rfmScore.frequency
 * @property {number} rfmScore.monetary
 * @property {number} rfmScore.total
 * @property {('Champions'|'Loyal'|'Potential'|'New'|'Promising'|'Needs Attention'|'At Risk'|'Lost')} segment
 */

/**
 * @typedef {Object} Recommendation
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {('High'|'Medium'|'Low')} impact
 * @property {('Promotion'|'Retention'|'Reactivation'|'Growth')} category
 * @property {string} [segment]
 */

/**
 * @typedef {Object} SalesData
 * @property {string} date
 * @property {number} revenue
 * @property {number} transactions
 */

/**
 * @typedef {Object} RFMDistribution
 * @property {string} segment
 * @property {number} count
 * @property {number} value
 * @property {string} color
 */

/**
 * @typedef {('7d'|'30d'|'90d'|'12m'|'all')} TimeRange
 */

/**
 * @typedef {Object} SalesGoal
 * @property {('daily'|'monthly'|'yearly')} period
 * @property {number} target
 * @property {number} achieved
 * @property {number} percentage
 */

/**
 * @typedef {Object} CustomerBreakdown
 * @property {Object} new
 * @property {number} new.count
 * @property {number} new.revenue
 * @property {number} new.averageTicket
 * @property {number} new.percentage
 * @property {Object} returning
 * @property {number} returning.count
 * @property {number} returning.revenue
 * @property {number} returning.averageTicket
 * @property {number} returning.percentage
 * @property {Object} atRisk
 * @property {number} atRisk.count
 * @property {number} atRisk.percentage
 * @property {Object} lost
 * @property {number} lost.count
 * @property {number} lost.percentage
 */

/**
 * @typedef {Object} SalesChannel
 * @property {('Online'|'Offline'|'Mobile'|'Social')} name
 * @property {number} value
 * @property {number} tickets
 * @property {number} percentage
 */

/**
 * @typedef {Object} CityData
 * @property {string} city
 * @property {number} sales
 * @property {number} growth
 */

/**
 * @typedef {Object} CategoryData
 * @property {string} name
 * @property {number} value
 * @property {number} growth
 * @property {number} percentage
 */

/**
 * @typedef {Object} SmartSegment
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} size
 * @property {number} value
 * @property {number} recency
 * @property {string} behavior
 */

/**
 * @typedef {Object} Campaign
 * @property {string} id
 * @property {string} name
 * @property {('Meta'|'Google'|'Email'|'WhatsApp')} platform
 * @property {string} segment
 * @property {number} roas
 * @property {number} ctr
 * @property {number} impressions
 * @property {number} conversions
 * @property {number} cost
 * @property {string} bestTime
 */

/**
 * @typedef {Object} Insight
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {('High'|'Medium'|'Low')} impact
 * @property {('Trend'|'Anomaly'|'Opportunity')} category
 * @property {string} action
 */

// No export needed in JavaScript
