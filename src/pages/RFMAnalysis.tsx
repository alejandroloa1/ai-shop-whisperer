
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PieChart, Pie, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import RFMScoreCard from '@/components/RFMScoreCard';
import { rfmDistribution, customers } from '@/data/mockData';
import { type TimeRange } from '@/types';

const RFMAnalysisPage = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  // Calcular promedios RFM
  const avgRecency = customers.reduce((sum, customer) => sum + customer.rfmScore.recency, 0) / customers.length;
  const avgFrequency = customers.reduce((sum, customer) => sum + customer.rfmScore.frequency, 0) / customers.length;
  const avgMonetary = customers.reduce((sum, customer) => sum + customer.rfmScore.monetary, 0) / customers.length;
  const avgTotal = customers.reduce((sum, customer) => sum + customer.rfmScore.total, 0) / customers.length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Análisis RFM</h1>
            <p className="text-muted-foreground mt-1">
              Recencia, Frecuencia y Monto para segmentar clientes
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

        <div className="grid gap-4 md:grid-cols-4">
          <RFMScoreCard
            title="Recencia (R)"
            score={Math.round(avgRecency * 10) / 10}
            maxScore={5}
            description="Tiempo desde la última compra. Mayor puntuación = compra más reciente."
          />
          <RFMScoreCard
            title="Frecuencia (F)"
            score={Math.round(avgFrequency * 10) / 10}
            maxScore={5}
            description="Número de compras en el período. Mayor puntuación = más compras."
          />
          <RFMScoreCard
            title="Monto (M)"
            score={Math.round(avgMonetary * 10) / 10}
            maxScore={5}
            description="Valor total gastado. Mayor puntuación = mayor gasto."
          />
          <RFMScoreCard
            title="Score RFM Total"
            score={Math.round(avgTotal * 10) / 10}
            maxScore={15}
            description="Combinación de R+F+M. Mayor puntuación = cliente más valioso."
          />
        </div>

        <Tabs defaultValue="segments">
          <TabsList className="mb-4">
            <TabsTrigger value="segments">Segmentos</TabsTrigger>
            <TabsTrigger value="distribution">Distribución</TabsTrigger>
            <TabsTrigger value="details">Detalles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="segments">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Segmentos</CardTitle>
                <CardDescription>
                  Categorización de clientes según su comportamiento RFM
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={rfmDistribution}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="segment" angle={-45} textAnchor="end" height={70} stroke="#94a3b8" />
                      <YAxis yAxisId="left" orientation="left" stroke="#94a3b8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                      <Tooltip
                        formatter={(value, name) => [value, name === 'count' ? 'Clientes' : 'Valor ($)']}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="count" name="Número de Clientes" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                        {rfmDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                      <Bar yAxisId="right" dataKey="value" name="Valor Total ($)" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Recencia</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'R=5 (Muy reciente)', value: 32, color: '#4f46e5' },
                          { name: 'R=4', value: 25, color: '#3b82f6' },
                          { name: 'R=3', value: 18, color: '#60a5fa' },
                          { name: 'R=2', value: 15, color: '#93c5fd' },
                          { name: 'R=1 (Menos reciente)', value: 10, color: '#bfdbfe' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {[
                          { name: 'R=5 (Muy reciente)', value: 32, color: '#4f46e5' },
                          { name: 'R=4', value: 25, color: '#3b82f6' },
                          { name: 'R=3', value: 18, color: '#60a5fa' },
                          { name: 'R=2', value: 15, color: '#93c5fd' },
                          { name: 'R=1 (Menos reciente)', value: 10, color: '#bfdbfe' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} clientes`]} 
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Frecuencia y Monto</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'F=1', F: 15, M: 12 },
                        { name: 'F=2', F: 22, M: 18 },
                        { name: 'F=3', F: 28, M: 25 },
                        { name: 'F=4', F: 20, M: 27 },
                        { name: 'F=5', F: 15, M: 18 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        formatter={(value, name) => [`${value} clientes`, name === 'F' ? 'Frecuencia' : 'Monto']}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      />
                      <Legend />
                      <Bar dataKey="F" name="Frecuencia" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="M" name="Monto" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Definición de Segmentos RFM</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Segmento</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Rango RFM</TableHead>
                      <TableHead>Estrategia Recomendada</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                          Champions
                        </Badge>
                      </TableCell>
                      <TableCell>Clientes recientes que compran frecuentemente y gastan mucho</TableCell>
                      <TableCell>R=4-5, F=4-5, M=4-5</TableCell>
                      <TableCell>Programas de lealtad, ventas cruzadas premium</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          Loyal
                        </Badge>
                      </TableCell>
                      <TableCell>Clientes con alta frecuencia y valor, pero no tan recientes</TableCell>
                      <TableCell>R=2-5, F=3-5, M=3-5</TableCell>
                      <TableCell>Reactivación con ofertas personalizadas</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Badge variant="outline" className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300">
                          Potential
                        </Badge>
                      </TableCell>
                      <TableCell>Clientes con alto valor pero frecuencia media-baja</TableCell>
                      <TableCell>R=3-5, F=1-3, M=4-5</TableCell>
                      <TableCell>Incentivar compras más frecuentes</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          New
                        </Badge>
                      </TableCell>
                      <TableCell>Clientes recientes con pocas compras</TableCell>
                      <TableCell>R=4-5, F=1, M=1-3</TableCell>
                      <TableCell>Campañas de bienvenida y educación</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                          At Risk
                        </Badge>
                      </TableCell>
                      <TableCell>Clientes valiosos que no han comprado recientemente</TableCell>
                      <TableCell>R=1-2, F=4-5, M=4-5</TableCell>
                      <TableCell>Campaña de reactivación urgente</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          Lost
                        </Badge>
                      </TableCell>
                      <TableCell>Clientes que no han comprado en mucho tiempo</TableCell>
                      <TableCell>R=1, F=1-2, M=1-2</TableCell>
                      <TableCell>Ofertas agresivas o considerar no invertir</TableCell>
                    </TableRow>
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

export default RFMAnalysisPage;
