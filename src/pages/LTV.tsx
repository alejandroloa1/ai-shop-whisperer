
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { customers } from '@/data/mockData';
import { type TimeRange } from '@/types';

const LTVPage = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  // Ordenar clientes por LTV para la tabla
  const sortedCustomers = [...customers].sort((a, b) => b.ltv - a.ltv);

  // Datos simulados para el gráfico de proyección LTV
  const ltvProjectionData = [
    { month: 1, valor: 120 },
    { month: 2, valor: 240 },
    { month: 3, valor: 350 },
    { month: 6, valor: 620 },
    { month: 9, valor: 850 },
    { month: 12, valor: 1050 },
    { month: 18, valor: 1450 },
    { month: 24, valor: 1800 },
    { month: 36, valor: 2300 }
  ];

  // Datos simulados para el gráfico de LTV por segmento
  const ltvBySegmentData = [
    { segment: 'Champions', ltv: 4900 },
    { segment: 'Loyal', ltv: 3200 },
    { segment: 'Potential', ltv: 2800 },
    { segment: 'Promising', ltv: 1600 },
    { segment: 'New', ltv: 800 },
    { segment: 'Needs Attention', ltv: 1200 },
    { segment: 'At Risk', ltv: 2400 },
    { segment: 'Lost', ltv: 900 }
  ];

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Champions':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'Loyal':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Potential':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300';
      case 'Promising':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300';
      case 'New':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Needs Attention':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'At Risk':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Lost':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Lifetime Value</h1>
            <p className="text-muted-foreground mt-1">
              Análisis predictivo del valor total de un cliente durante su relación comercial
            </p>
          </div>
          <div className="w-48">
            <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Período de tiempo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 días</SelectItem>
                <SelectItem value="30d">Últimos 30 días</SelectItem>
                <SelectItem value="90d">Últimos 90 días</SelectItem>
                <SelectItem value="12m">Últimos 12 meses</SelectItem>
                <SelectItem value="all">Todo el tiempo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>LTV Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$2,250</div>
              <p className="text-sm text-muted-foreground mt-1">Promedio de todos los clientes</p>
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-green-500">↑ 14%</span>
                <span className="text-xs text-muted-foreground ml-1">vs. periodo anterior</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>LTV/CAC Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3.8x</div>
              <p className="text-sm text-muted-foreground mt-1">Valor del cliente vs. costo de adquisición</p>
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-amber-500">↑ 2%</span>
                <span className="text-xs text-muted-foreground ml-1">vs. periodo anterior</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Periodo de Recuperación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.2 meses</div>
              <p className="text-sm text-muted-foreground mt-1">Tiempo para recuperar CAC</p>
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-green-500">↓ 8%</span>
                <span className="text-xs text-muted-foreground ml-1">vs. periodo anterior</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projection">
          <TabsList className="mb-4">
            <TabsTrigger value="projection">Proyección LTV</TabsTrigger>
            <TabsTrigger value="segments">LTV por Segmento</TabsTrigger>
            <TabsTrigger value="customers">Top Clientes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projection">
            <Card>
              <CardHeader>
                <CardTitle>Proyección de LTV en el Tiempo</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={ltvProjectionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      label={{ value: 'Meses', position: 'insideBottomRight', offset: -10 }}
                      stroke="#94a3b8" 
                    />
                    <YAxis 
                      label={{ value: 'Valor ($)', angle: -90, position: 'insideLeft' }}
                      stroke="#94a3b8"
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, 'LTV Proyectado']}
                      labelFormatter={(value) => `Mes ${value}`}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="valor" name="LTV Proyectado" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="segments">
            <Card>
              <CardHeader>
                <CardTitle>LTV por Segmento de Cliente</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={ltvBySegmentData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="segment" 
                      angle={-45} 
                      textAnchor="end" 
                      height={70}
                      stroke="#94a3b8" 
                    />
                    <YAxis 
                      stroke="#94a3b8"
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, 'LTV Promedio']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="ltv" name="LTV Promedio" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Top Clientes por LTV</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Segmento</TableHead>
                      <TableHead>LTV Actual</TableHead>
                      <TableHead>LTV Proyectado (12m)</TableHead>
                      <TableHead>LTV/CAC</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedCustomers.slice(0, 10).map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">
                          <div>{customer.name}</div>
                          <div className="text-xs text-muted-foreground">{customer.email}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getSegmentColor(customer.segment)}>
                            {customer.segment}
                          </Badge>
                        </TableCell>
                        <TableCell>${customer.ltv.toLocaleString()}</TableCell>
                        <TableCell>${Math.round(customer.ltv * 1.5).toLocaleString()}</TableCell>
                        <TableCell>{(customer.ltv / 750).toFixed(1)}x</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LTVPage;
