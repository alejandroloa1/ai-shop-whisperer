
import React from 'react';
import { Users, DollarSign, ShoppingCart, BarChart2 } from 'lucide-react';
import Layout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import RevenueChart from '@/components/RevenueChart';
import CustomerSegmentChart from '@/components/CustomerSegmentChart';
import CustomerTable from '@/components/CustomerTable';
import RecommendationCard from '@/components/RecommendationCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { salesData, rfmDistribution, customers, recommendations } from '@/data/mockData';

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Análisis y recomendaciones para optimizar el valor de tus clientes.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Clientes"
            value="115"
            trend={{ value: 12, isPositive: true }}
            icon={<Users className="h-8 w-8" />}
          />
          <StatCard
            title="Ingresos Mensuales"
            value="$48,200"
            trend={{ value: 8, isPositive: true }}
            icon={<DollarSign className="h-8 w-8" />}
          />
          <StatCard
            title="Compras Promedio"
            value="2.8"
            trend={{ value: 4, isPositive: true }}
            icon={<ShoppingCart className="h-8 w-8" />}
          />
          <StatCard
            title="Valor de Vida Promedio"
            value="$2,450"
            trend={{ value: 3, isPositive: false }}
            icon={<BarChart2 className="h-8 w-8" />}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <RevenueChart data={salesData} />
          <CustomerSegmentChart data={rfmDistribution} />
        </div>

        <div className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-8">
            <CustomerTable customers={customers} />
          </div>
          <div className="md:col-span-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Salud del Negocio</CardTitle>
                <CardDescription>Basado en análisis RFM y LTV</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Retención de Clientes</span>
                      <span className="text-sm font-medium text-green-600">76%</span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-muted overflow-hidden rounded-full">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '76%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Tasa de Recompra</span>
                      <span className="text-sm font-medium text-blue-600">54%</span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-muted overflow-hidden rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '54%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Frecuencia Promedio</span>
                      <span className="text-sm font-medium text-amber-600">42%</span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-muted overflow-hidden rounded-full">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '42%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Conversión RFM</span>
                      <span className="text-sm font-medium text-indigo-600">68%</span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-muted overflow-hidden rounded-full">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Recomendaciones Principales</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.slice(0, 3).map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
