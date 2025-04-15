
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FilterX, Download, UserPlus, Search, ChevronDown, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { customers, rfmDistribution } from '@/data/mockData';
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSegment, setActiveSegment] = useState('all');
  
  const segmentColors = {
    'Champions': 'bg-indigo-700',
    'Loyal': 'bg-blue-500',
    'Potential': 'bg-blue-400',
    'Promising': 'bg-sky-300',
    'New': 'bg-blue-200',
    'Needs Attention': 'bg-pink-200',
    'At Risk': 'bg-red-300',
    'Lost': 'bg-red-500'
  };
  
  const getSegmentClass = (segment) => {
    switch(segment) {
      case 'Champions': return 'bg-indigo-100 text-indigo-800';
      case 'Loyal': return 'bg-blue-100 text-blue-800';
      case 'Potential': return 'bg-cyan-100 text-cyan-800';
      case 'Promising': return 'bg-sky-100 text-sky-800';
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Needs Attention': return 'bg-pink-100 text-pink-800';
      case 'At Risk': return 'bg-red-100 text-red-800';
      case 'Lost': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = activeSegment === 'all' || customer.segment === activeSegment;
    
    return matchesSearch && matchesSegment;
  });
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
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
        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Segmentos de Clientes</h1>
            <p className="text-muted-foreground">Análisis RFM (Recencia, Frecuencia, Monto) de clientes</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0 w-full lg:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar cliente..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute right-2.5 top-2.5"
                  onClick={() => setSearchTerm('')}
                >
                  <FilterX className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <Button className="shrink-0">
              <UserPlus className="mr-2 h-4 w-4" />
              Agregar
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Clientes</CardTitle>
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
              <CardDescription>Total de {filteredCustomers.length} clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" onValueChange={setActiveSegment} className="mb-4">
                <TabsList className="grid grid-cols-4 sm:grid-cols-8">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="Champions">Campeones</TabsTrigger>
                  <TabsTrigger value="Loyal">Leales</TabsTrigger>
                  <TabsTrigger value="Potential">Potenciales</TabsTrigger>
                  <TabsTrigger value="New">Nuevos</TabsTrigger>
                  <TabsTrigger value="Promising">Prometedores</TabsTrigger>
                  <TabsTrigger value="Needs Attention">Atención</TabsTrigger>
                  <TabsTrigger value="At Risk">En Riesgo</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[220px]">Cliente</TableHead>
                      <TableHead className="hidden md:table-cell">
                        <div className="flex items-center space-x-1">
                          <span>Última Compra</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        <div className="flex items-center space-x-1">
                          <span>Compras</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center space-x-1">
                          <span>Total</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        <div className="flex items-center space-x-1">
                          <span>LTV</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Segmento</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No se encontraron clientes
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-muted-foreground">{customer.email}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{formatDate(customer.lastPurchase)}</TableCell>
                          <TableCell className="hidden lg:table-cell">{customer.purchaseCount}</TableCell>
                          <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
                          <TableCell className="hidden lg:table-cell">{formatCurrency(customer.ltv)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getSegmentClass(customer.segment)}>
                              {customer.segment}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Abrir menú</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                                <DropdownMenuItem>Enviar mensaje</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Editar datos</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Distribución RFM</CardTitle>
              <CardDescription>Distribución de clientes por segmento RFM</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={rfmDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="count"
                    >
                      {rfmDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [`${value} clientes`, props.payload.segment]} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                {rfmDistribution.map((segment) => (
                  <div key={segment.segment} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2`} style={{backgroundColor: segment.color}}></div>
                      <span className="text-sm font-medium">{segment.segment}</span>
                    </div>
                    <div className="flex space-x-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Clientes: </span>
                        <span className="font-medium">{segment.count}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Valor: </span>
                        <span className="font-medium">{formatCurrency(segment.value)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium mb-2">¿Qué significa esto?</h4>
                <p className="text-sm text-muted-foreground">
                  El análisis RFM (Recencia, Frecuencia, Monto) segmenta a tus clientes según su comportamiento de compra reciente, qué tan a menudo compran y cuánto gastan.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Customers;
