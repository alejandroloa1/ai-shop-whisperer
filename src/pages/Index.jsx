
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideArrowUpRight, LucideChevronUp, LucideChevronDown, Zap, TrendingUp, Users, ShoppingBag } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { salesData, rfmDistribution } from '@/data/mockData';

const Index = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [compareMode, setCompareMode] = useState(false);
  const [showVAT, setShowVAT] = useState(true);

  // Sample data for demonstration
  const dailySales = [
    { date: 'Lun', revenue: 4200, prevRevenue: 3800 },
    { date: 'Mar', revenue: 3800, prevRevenue: 4100 },
    { date: 'Mié', revenue: 5100, prevRevenue: 4300 },
    { date: 'Jue', revenue: 4800, prevRevenue: 3900 },
    { date: 'Vie', revenue: 6200, prevRevenue: 5200 },
    { date: 'Sáb', revenue: 7500, prevRevenue: 6800 },
    { date: 'Dom', revenue: 5300, prevRevenue: 4700 },
  ];

  const goals = {
    daily: { target: 5000, achieved: 4850, percentage: 97 },
    monthly: { target: 150000, achieved: 92500, percentage: 62 },
    yearly: { target: 1800000, achieved: 560000, percentage: 31 },
  };

  const customerBreakdown = {
    new: { count: 128, revenue: 38500, averageTicket: 301, percentage: 32 },
    returning: { count: 273, revenue: 82800, averageTicket: 303, percentage: 68 },
    atRisk: { count: 45, percentage: 8 },
    lost: { count: 22, percentage: 4 },
  };

  const salesChannels = [
    { name: 'Online', value: 79800, tickets: 262, percentage: 66 },
    { name: 'Offline', value: 41500, tickets: 139, percentage: 34 },
  ];

  const cities = [
    { city: 'Bogotá', sales: 48600, growth: 12 },
    { city: 'Medellín', sales: 32400, growth: 8 },
    { city: 'Cali', sales: 22700, growth: -3 },
    { city: 'Barranquilla', sales: 15200, growth: 15 },
    { city: 'Cartagena', sales: 12300, growth: 7 },
  ];

  const categories = [
    { name: 'Zapatos', value: 42500, growth: 15, percentage: 35 },
    { name: 'Ropa', value: 36800, growth: 8, percentage: 31 },
    { name: 'Accesorios', value: 24900, growth: -2, percentage: 21 },
    { name: 'Bolsos', value: 15600, growth: 10, percentage: 13 },
  ];

  const recommendations = [
    {
      title: 'Campaña para Clientes en Riesgo',
      description: 'Enviar un 15% de descuento a 45 clientes que no han comprado en más de 60 días podría recuperar hasta $13,500.',
      impact: 'Alto',
      icon: <Zap className="h-8 w-8 text-amber-500" />
    },
    {
      title: 'Promocionar Zapatos en Bogotá',
      description: 'El crecimiento del 15% en esta categoría en Bogotá sugiere una oportunidad para aumentar la inversión publicitaria.',
      impact: 'Medio',
      icon: <TrendingUp className="h-8 w-8 text-emerald-500" />
    },
    {
      title: 'Segmento de Alto Valor Inactivo',
      description: 'Hay 23 clientes de alto valor ($500+ por compra) que no han comprado en los últimos 30 días.',
      impact: 'Alto',
      icon: <Users className="h-8 w-8 text-blue-500" />
    },
    {
      title: 'Oportunidad Cross-Selling',
      description: 'Los clientes que compran zapatos tienen un 68% de probabilidad de comprar accesorios en los próximos 15 días.',
      impact: 'Medio',
      icon: <ShoppingBag className="h-8 w-8 text-indigo-500" />
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Bienvenido de nuevo, Carolina. Aquí está el resumen de tu negocio.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <Tabs defaultValue={dateRange} onValueChange={setDateRange} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-5 w-full sm:w-auto">
                <TabsTrigger value="1d">Hoy</TabsTrigger>
                <TabsTrigger value="7d">7 días</TabsTrigger>
                <TabsTrigger value="30d">30 días</TabsTrigger>
                <TabsTrigger value="ytd">Este año</TabsTrigger>
                <TabsTrigger value="lty">Año ant.</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button variant="outline" size="sm" onClick={() => setCompareMode(!compareMode)}>
              {compareMode ? 'Ocultar comparación' : 'Comparar períodos'}
            </Button>
          </div>
        </div>
        
        {/* Sales Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-base font-medium">Ventas Diarias</CardTitle>
                <CardDescription>Ventas totales en el período seleccionado</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setShowVAT(!showVAT)}>
                  {showVAT ? 'Sin IVA' : 'Con IVA'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailySales}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip 
                      formatter={(value) => formatCurrency(value)} 
                      labelFormatter={(label) => `Día: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8884d8" 
                      name="Ventas" 
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                    {compareMode && (
                      <Line 
                        type="monotone" 
                        dataKey="prevRevenue" 
                        stroke="#82ca9d" 
                        name="Período anterior" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Ingresos Totales</CardTitle>
                <span className="text-green-600 flex items-center text-sm">+12% <LucideChevronUp size={16} /></span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(121300)}</div>
                <p className="text-muted-foreground text-xs mt-1">vs {formatCurrency(108300)} período anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Ticket Promedio</CardTitle>
                <span className="text-green-600 flex items-center text-sm">+3% <LucideChevronUp size={16} /></span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(302)}</div>
                <p className="text-muted-foreground text-xs mt-1">vs {formatCurrency(293)} período anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Transacciones</CardTitle>
                <span className="text-green-600 flex items-center text-sm">+8% <LucideChevronUp size={16} /></span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">401</div>
                <p className="text-muted-foreground text-xs mt-1">vs 371 período anterior</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Goals Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Meta Diaria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progreso</span>
                <span className="text-sm font-medium">{goals.daily.percentage}%</span>
              </div>
              <Progress value={goals.daily.percentage} className="h-2" />
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Actual</p>
                  <p className="text-lg font-bold">{formatCurrency(goals.daily.achieved)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Meta</p>
                  <p className="text-lg font-bold">{formatCurrency(goals.daily.target)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Meta Mensual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progreso</span>
                <span className="text-sm font-medium">{goals.monthly.percentage}%</span>
              </div>
              <Progress value={goals.monthly.percentage} className="h-2" />
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Actual</p>
                  <p className="text-lg font-bold">{formatCurrency(goals.monthly.achieved)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Meta</p>
                  <p className="text-lg font-bold">{formatCurrency(goals.monthly.target)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Meta Anual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progreso</span>
                <span className="text-sm font-medium">{goals.yearly.percentage}%</span>
              </div>
              <Progress value={goals.yearly.percentage} className="h-2" />
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Actual</p>
                  <p className="text-lg font-bold">{formatCurrency(goals.yearly.achieved)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Meta</p>
                  <p className="text-lg font-bold">{formatCurrency(goals.yearly.target)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Customer Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Análisis de Clientes</CardTitle>
            <CardDescription>Distribución de clientes nuevos vs. recurrentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Clientes Nuevos</h4>
                  <span className="text-sm text-muted-foreground">{customerBreakdown.new.percentage}%</span>
                </div>
                <Progress value={customerBreakdown.new.percentage} className="h-2" />
                <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
                  <div>
                    <p>Cantidad</p>
                    <p className="font-medium text-foreground">{customerBreakdown.new.count}</p>
                  </div>
                  <div>
                    <p>Ingresos</p>
                    <p className="font-medium text-foreground">{formatCurrency(customerBreakdown.new.revenue)}</p>
                  </div>
                  <div>
                    <p>Ticket Prom.</p>
                    <p className="font-medium text-foreground">{formatCurrency(customerBreakdown.new.averageTicket)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Clientes Recurrentes</h4>
                  <span className="text-sm text-muted-foreground">{customerBreakdown.returning.percentage}%</span>
                </div>
                <Progress value={customerBreakdown.returning.percentage} className="h-2" />
                <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
                  <div>
                    <p>Cantidad</p>
                    <p className="font-medium text-foreground">{customerBreakdown.returning.count}</p>
                  </div>
                  <div>
                    <p>Ingresos</p>
                    <p className="font-medium text-foreground">{formatCurrency(customerBreakdown.returning.revenue)}</p>
                  </div>
                  <div>
                    <p>Ticket Prom.</p>
                    <p className="font-medium text-foreground">{formatCurrency(customerBreakdown.returning.averageTicket)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Clientes en Riesgo</h4>
                  <span className="text-sm text-muted-foreground">{customerBreakdown.atRisk.percentage}%</span>
                </div>
                <Progress value={customerBreakdown.atRisk.percentage} className="h-2 bg-amber-100" indicatorClassName="bg-amber-500" />
                <div className="text-sm text-muted-foreground">
                  <div>
                    <p>Clientes que no han comprado en los últimos 60 días</p>
                    <p className="font-medium text-foreground mt-1">{customerBreakdown.atRisk.count} clientes</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Clientes Perdidos</h4>
                  <span className="text-sm text-muted-foreground">{customerBreakdown.lost.percentage}%</span>
                </div>
                <Progress value={customerBreakdown.lost.percentage} className="h-2 bg-red-100" indicatorClassName="bg-red-500" />
                <div className="text-sm text-muted-foreground">
                  <div>
                    <p>Clientes que no han comprado en más de 90 días</p>
                    <p className="font-medium text-foreground mt-1">{customerBreakdown.lost.count} clientes</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Sales Channels, Cities and Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Canales de Venta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesChannels}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#8884d8" />
                      <Cell fill="#82ca9d" />
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {salesChannels.map((channel) => (
                  <div key={channel.name} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${channel.name === 'Online' ? 'bg-[#8884d8]' : 'bg-[#82ca9d]'}`}></div>
                      <span className="text-sm">{channel.name}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{formatCurrency(channel.value)}</span>
                      <span className="text-muted-foreground ml-2">({channel.tickets} tickets)</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Ventas por Ciudad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cities}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city" />
                    <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]}>
                      {cities.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.growth > 0 ? '#10b981' : '#ef4444'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {cities.map((city) => (
                  <div key={city.city} className="flex justify-between items-center">
                    <span className="text-sm">{city.city}</span>
                    <div className="flex items-center">
                      <span className={`text-sm ${city.growth > 0 ? 'text-green-500' : 'text-red-500'} mr-2`}>
                        {city.growth > 0 ? `+${city.growth}%` : `${city.growth}%`}
                      </span>
                      <span className="text-sm font-medium">{formatCurrency(city.sales)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Categorías Principales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    layout="vertical"
                    data={categories}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `$${value/1000}k`} />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]}>
                      {categories.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.growth > 0 ? '#10b981' : '#ef4444'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {categories.map((category) => (
                  <div key={category.name} className="flex justify-between items-center">
                    <span className="text-sm">{category.name}</span>
                    <div className="flex items-center">
                      <span className={`text-sm ${category.growth > 0 ? 'text-green-500' : 'text-red-500'} mr-2`}>
                        {category.growth > 0 ? `+${category.growth}%` : `${category.growth}%`}
                      </span>
                      <span className="text-sm font-medium">{formatCurrency(category.value)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* AI Recommendations */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recomendaciones AI</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {recommendations.map((rec, index) => (
              <Card key={index} className="overflow-hidden border-l-4 border-l-primary">
                <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                  <div className="flex-1">
                    <CardTitle className="text-base font-medium line-clamp-1">{rec.title}</CardTitle>
                    <CardDescription className="line-clamp-1">Impacto: {rec.impact}</CardDescription>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    {rec.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{rec.description}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button size="sm" variant="ghost" className="w-full justify-start p-0 h-auto">
                    <span>Ver Detalle</span>
                    <LucideArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
