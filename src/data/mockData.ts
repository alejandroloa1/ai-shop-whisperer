
import { Customer, Recommendation, SalesData, RFMDistribution } from "@/types";

export const customers: Customer[] = [
  {
    id: "c1",
    name: "Sara López",
    email: "sara.lopez@ejemplo.com",
    lastPurchase: "2025-04-10",
    totalSpent: 2450,
    purchaseCount: 8,
    ltv: 4900,
    rfmScore: { recency: 5, frequency: 4, monetary: 4, total: 13 },
    segment: "Champions"
  },
  {
    id: "c2",
    name: "Juan Martínez",
    email: "juan.martinez@ejemplo.com",
    lastPurchase: "2025-03-15",
    totalSpent: 1200,
    purchaseCount: 5,
    ltv: 2400,
    rfmScore: { recency: 3, frequency: 3, monetary: 3, total: 9 },
    segment: "Loyal"
  },
  {
    id: "c3",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@ejemplo.com",
    lastPurchase: "2025-02-28",
    totalSpent: 3500,
    purchaseCount: 3,
    ltv: 5250,
    rfmScore: { recency: 2, frequency: 2, monetary: 5, total: 9 },
    segment: "Potential"
  },
  {
    id: "c4",
    name: "Carlos Sánchez",
    email: "carlos.sanchez@ejemplo.com",
    lastPurchase: "2025-04-12",
    totalSpent: 560,
    purchaseCount: 2,
    ltv: 840,
    rfmScore: { recency: 5, frequency: 1, monetary: 2, total: 8 },
    segment: "New"
  },
  {
    id: "c5",
    name: "Lucía Gómez",
    email: "lucia.gomez@ejemplo.com",
    lastPurchase: "2025-01-20",
    totalSpent: 4200,
    purchaseCount: 10,
    ltv: 6300,
    rfmScore: { recency: 1, frequency: 5, monetary: 5, total: 11 },
    segment: "At Risk"
  },
  {
    id: "c6",
    name: "David Fernández",
    email: "david.fernandez@ejemplo.com",
    lastPurchase: "2024-11-15",
    totalSpent: 890,
    purchaseCount: 4,
    ltv: 1335,
    rfmScore: { recency: 1, frequency: 2, monetary: 2, total: 5 },
    segment: "Lost"
  },
  {
    id: "c7",
    name: "Marina Díaz",
    email: "marina.diaz@ejemplo.com",
    lastPurchase: "2025-04-01",
    totalSpent: 1750,
    purchaseCount: 6,
    ltv: 3500,
    rfmScore: { recency: 4, frequency: 3, monetary: 3, total: 10 },
    segment: "Loyal"
  },
  {
    id: "c8",
    name: "Pedro Ruiz",
    email: "pedro.ruiz@ejemplo.com",
    lastPurchase: "2025-03-25",
    totalSpent: 320,
    purchaseCount: 1,
    ltv: 320,
    rfmScore: { recency: 3, frequency: 1, monetary: 1, total: 5 },
    segment: "Needs Attention"
  },
  {
    id: "c9",
    name: "Sofía Morales",
    email: "sofia.morales@ejemplo.com",
    lastPurchase: "2025-04-05",
    totalSpent: 980,
    purchaseCount: 3,
    ltv: 1470,
    rfmScore: { recency: 4, frequency: 2, monetary: 2, total: 8 },
    segment: "Promising"
  },
  {
    id: "c10",
    name: "Alberto Torres",
    email: "alberto.torres@ejemplo.com",
    lastPurchase: "2025-02-10",
    totalSpent: 2100,
    purchaseCount: 7,
    ltv: 3150,
    rfmScore: { recency: 2, frequency: 4, monetary: 4, total: 10 },
    segment: "Potential"
  }
];

export const recommendations: Recommendation[] = [
  {
    id: "r1",
    title: "Campaña de reactivación para clientes en riesgo",
    description: "Enviar ofertas personalizadas con descuentos del 15% a clientes que no han comprado en los últimos 60 días",
    impact: "High",
    category: "Reactivation",
    segment: "At Risk"
  },
  {
    id: "r2",
    title: "Programa de lealtad para clientes Champions",
    description: "Implementar un programa de recompensas exclusivo para nuestros mejores clientes con beneficios como envío gratuito y acceso anticipado a nuevos productos",
    impact: "High",
    category: "Retention",
    segment: "Champions"
  },
  {
    id: "r3",
    title: "Venta cruzada para clientes Potential",
    description: "Recomendar productos complementarios basados en su historial de compras para aumentar el valor promedio de la orden",
    impact: "Medium",
    category: "Growth",
    segment: "Potential"
  },
  {
    id: "r4",
    title: "Campaña de bienvenida para nuevos clientes",
    description: "Crear una secuencia de correos electrónicos de bienvenida con educación sobre los productos y un descuento en la segunda compra",
    impact: "Medium",
    category: "Retention",
    segment: "New"
  },
  {
    id: "r5",
    title: "Recuperación de clientes perdidos",
    description: "Oferta especial de 'Te extrañamos' con un 20% de descuento para clientes que no han comprado en más de 120 días",
    impact: "Low",
    category: "Reactivation",
    segment: "Lost"
  }
];

export const salesData: SalesData[] = [
  { date: "2025-04-08", revenue: 3200, transactions: 28 },
  { date: "2025-04-09", revenue: 2800, transactions: 24 },
  { date: "2025-04-10", revenue: 3500, transactions: 30 },
  { date: "2025-04-11", revenue: 4200, transactions: 35 },
  { date: "2025-04-12", revenue: 4800, transactions: 40 },
  { date: "2025-04-13", revenue: 3700, transactions: 32 },
  { date: "2025-04-14", revenue: 3900, transactions: 33 },
  { date: "2025-04-15", revenue: 4100, transactions: 36 }
];

export const rfmDistribution: RFMDistribution[] = [
  { segment: "Champions", count: 12, value: 28500, color: "#4338ca" },
  { segment: "Loyal", count: 18, value: 24800, color: "#3b82f6" },
  { segment: "Potential", count: 15, value: 19500, color: "#60a5fa" },
  { segment: "Promising", count: 20, value: 12000, color: "#93c5fd" },
  { segment: "New", count: 25, value: 8750, color: "#bfdbfe" },
  { segment: "Needs Attention", count: 10, value: 5500, color: "#ffe4e6" },
  { segment: "At Risk", count: 8, value: 14400, color: "#fca5a5" },
  { segment: "Lost", count: 7, value: 6300, color: "#ef4444" }
];

export const getRecommendationsForSegment = (segment: string): Recommendation[] => {
  return recommendations.filter(rec => rec.segment === segment || !rec.segment);
};
