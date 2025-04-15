
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Calendar, 
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Layout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import RevenueChart from '@/components/RevenueChart';
import CustomerSegmentChart from '@/components/CustomerSegmentChart';
import CustomerTable from '@/components/CustomerTable';
import RecommendationCard from '@/components/RecommendationCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { salesData, rfmDistribution, customers, recommendations } from '@/data/mockData';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [includeVat, setIncludeVat] = useState(true);
  const [compareWithPrevious, setCompareWithPrevious] = useState(false);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Bienvenido a UPSELLerate, Fashion Store Inc.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select defaultValue={timeRange} onValueChange={(value) => setTimeRange(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="7d">Últimos 7 días</SelectItem>
                <SelectItem value="30d">Últimos 30 días</SelectItem>
                <SelectItem value="thisYear">Este año</SelectItem>
                <SelectItem value="lastYear">Año pasado</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant={compareWithPrevious ? "default" : "outline"} 
              onClick={() => setCompareWithPrevious(!compareWithPrevious)}
            >
              Comparar con período anterior
            </Button>
          </div>
        </div>

        {/* Total Sales Overview */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Visión general de ventas</CardTitle>
              <Tabs defaultValue={includeVat ? "with-vat" : "without-vat"} className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="with-vat" onClick={() => setIncludeVat(true)}>Con IVA</TabsTrigger>
                  <TabsTrigger value="without-vat" onClick={() => setIncludeVat(false)}>Sin IVA</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>
              Seguimiento diario de ventas durante el período seleccionado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart data={salesData} />
            
            <div className="grid gap-4 md:grid-cols-3 mt-4">
              <StatCard
                title="Ingresos Totales"
                value={includeVat ? "$142,800" : "$120,000"}
                trend={{ value: 12, isPositive: true }}
                icon={<DollarSign className="h-8 w-8" />}
              />
              <StatCard
                title="Ticket Promedio"
                value={includeVat ? "$72.40" : "$60.84"}
                trend={{ value: 4, isPositive: true }}
                icon={<ShoppingCart className="h-8 w-8" />}
              />
              <StatCard
                title="Transacciones"
                value="1,973"
                trend={{ value: 8, isPositive: true }}
                icon={<TrendingUp className="h-8 w-8" />}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sales vs Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Ventas vs Objetivos</CardTitle>
            <CardDescription>Seguimiento de ventas respecto a objetivos definidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Objetivo diario</h3>
                  <span className="text-sm font-medium text-green-600">78%</span>
                </div>
                <Progress value={78} className="h-2 bg-muted" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$3,860 / $5,000</span>
                  <span>Restante: $1,140</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Objetivo mensual</h3>
                  <span className="text-sm font-medium text-amber-600">54%</span>
                </div>
                <Progress value={54} className="h-2 bg-muted" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$108,000 / $200,000</span>
                  <span>Restante: $92,000</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Objetivo anual</h3>
                  <span className="text-sm font-medium text-blue-600">32%</span>
                </div>
                <Progress value={32} className="h-2 bg-muted" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$576,000 / $1,800,000</span>
                  <span>Restante: $1,224,000</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Breakdown & Sales Channels */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Customer Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Clientes</CardTitle>
              <CardDescription>Clientes nuevos vs recurrentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Nuevos clientes</span>
                      <span className="text-sm font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2 bg-muted" />
                    <div className="text-xs text-muted-foreground">
                      632 clientes • $45,695 ingresos
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Clientes recurrentes</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2 bg-muted" />
                    <div className="text-xs text-muted-foreground">
                      1,341 clientes • $97,105 ingresos
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <h4 className="text-sm font-medium mb-2">Clientes en riesgo</h4>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 mr-6">
                      <span className="font-medium">243</span>
                      <span className="text-xs text-muted-foreground">clientes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3 text-red-500" />
                      <span className="text-xs font-medium text-red-500">12.3%</span>
                      <span className="text-xs text-muted-foreground">vs anterior</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <h4 className="text-sm font-medium mb-2">Clientes perdidos</h4>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 mr-6">
                      <span className="font-medium">87</span>
                      <span className="text-xs text-muted-foreground">clientes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowDownRight className="h-3 w-3 text-green-500" />
                      <span className="text-xs font-medium text-green-500">5.2%</span>
                      <span className="text-xs text-muted-foreground">vs anterior</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales Channels */}
          <Card>
            <CardHeader>
              <CardTitle>Canales de Venta</CardTitle>
              <CardDescription>Online vs Offline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Online</span>
                    <div className="text-sm">
                      <span className="font-medium">$98,532</span>
                      <span className="text-muted-foreground ml-1">• 1,453 tickets</span>
                    </div>
                  </div>
                  <Progress value={69} className="h-2 bg-muted" />
                  <div className="text-xs text-right text-muted-foreground">
                    69% del total
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Offline</span>
                    <div className="text-sm">
                      <span className="font-medium">$44,268</span>
                      <span className="text-muted-foreground ml-1">• 520 tickets</span>
                    </div>
                  </div>
                  <Progress value={31} className="h-2 bg-muted" />
                  <div className="text-xs text-right text-muted-foreground">
                    31% del total
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1 border rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Ticket promedio Online</div>
                    <div className="text-lg font-bold">$67.81</div>
                  </div>
                  <div className="space-y-1 border rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Ticket promedio Offline</div>
                    <div className="text-lg font-bold">$85.13</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Categories & Map */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Top Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categorías Top</CardTitle>
              <CardDescription>Ventas por categoría y tendencia vs año anterior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Ropa deportiva</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">$42,840</span>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium text-green-500">34%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={30} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Zapatos</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">$35,700</span>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium text-green-500">12%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={25} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Accesorios</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">$28,560</span>
                      <div className="flex items-center gap-1">
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                        <span className="text-xs font-medium text-red-500">8%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={20} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Vestidos</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">$21,420</span>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium text-green-500">18%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={15} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Pantalones</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">$14,280</span>
                      <div className="flex items-center gap-1">
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                        <span className="text-xs font-medium text-red-500">5%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={10} className="h-2 bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales by City */}
          <Card>
            <CardHeader>
              <CardTitle>Ventas por Ciudad</CardTitle>
              <CardDescription>Distribución geográfica de ventas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Bogotá</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">$57,120</span>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium text-green-500">15%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={40} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Medellín</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">$28,560</span>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium text-green-500">22%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={20} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Cali</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">$21,420</span>
                      <div className="flex items-center gap-1">
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                        <span className="text-xs font-medium text-red-500">8%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={15} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Barranquilla</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">$18,564</span>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium text-green-500">12%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={13} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Otras ciudades</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">$17,136</span>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium text-green-500">5%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={12} className="h-2 bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI-Powered Recommendations */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Recomendaciones y Acciones</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Producto Top para Promocionar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Zapatillas Deportivas Nike Air Max están mostrando una alta tasa de conversión (+28%) pero baja visibilidad.</p>
                <div className="mt-3 flex justify-between items-center">
                  <Button variant="outline" size="sm" className="text-xs">
                    Ver detalles
                  </Button>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">Impacto:</span>
                    <span className="text-xs font-medium text-amber-600">Medio</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-red-500/5 border-red-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Clientes en Riesgo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">38 clientes de alto valor (LTV > $500) no han comprado en los últimos 45 días.</p>
                <div className="mt-3 flex justify-between items-center">
                  <Button variant="outline" size="sm" className="text-xs">
                    Crear campaña
                  </Button>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">Impacto:</span>
                    <span className="text-xs font-medium text-red-600">Alto</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-500/5 border-green-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mejor Horario para Campañas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">El análisis muestra que las campañas entre 6PM-8PM tienen un 37% más de tasa de apertura y conversión.</p>
                <div className="mt-3 flex justify-between items-center">
                  <Button variant="outline" size="sm" className="text-xs">
                    Analizar datos
                  </Button>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">Impacto:</span>
                    <span className="text-xs font-medium text-green-600">Alto</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Segmentos de Clientes</CardTitle>
                <CardDescription>Segmentos dinámicos basados en comportamiento</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                Ver todos los segmentos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CustomerSegmentChart data={rfmDistribution} />
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <Card className="border border-dashed">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Clientes VIP inactivos 30+ días</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <div><span className="font-medium">42</span> clientes</div>
                    <div>Valor est. <span className="font-medium">$18,450</span></div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Clientes con LTV > $300 sin compras recientes
                  </div>
                  <Button size="sm" className="mt-3 w-full">Crear campaña</Button>
                </CardContent>
              </Card>
              
              <Card className="border border-dashed">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Compradores únicos en promoción</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <div><span className="font-medium">127</span> clientes</div>
                    <div>Valor est. <span className="font-medium">$9,525</span></div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Clientes que compraron solo durante promociones
                  </div>
                  <Button size="sm" className="mt-3 w-full">Crear campaña</Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
