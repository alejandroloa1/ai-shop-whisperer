
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Download, Filter } from 'lucide-react';
import { customers } from '@/data/mockData';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const CustomersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = segmentFilter === 'all' || customer.segment === segmentFilter;
    return matchesSearch && matchesSegment;
  });

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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona y analiza el comportamiento de tus clientes.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o email"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="w-full md:w-48">
                  <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por segmento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los segmentos</SelectItem>
                      <SelectItem value="Champions">Champions</SelectItem>
                      <SelectItem value="Loyal">Loyal</SelectItem>
                      <SelectItem value="Potential">Potential</SelectItem>
                      <SelectItem value="Promising">Promising</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Needs Attention">Needs Attention</SelectItem>
                      <SelectItem value="At Risk">At Risk</SelectItem>
                      <SelectItem value="Lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="icon" title="Más filtros">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Exportar datos">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Segmento</TableHead>
                    <TableHead>Última Compra</TableHead>
                    <TableHead>Total Gastado</TableHead>
                    <TableHead>Frecuencia</TableHead>
                    <TableHead className="text-right">Score RFM</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
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
                      <TableCell>{format(parseISO(customer.lastPurchase), 'dd MMM, yyyy', { locale: es })}</TableCell>
                      <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>{customer.purchaseCount} compras</TableCell>
                      <TableCell className="text-right">{customer.rfmScore.total}/15</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredCustomers.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No se encontraron clientes que coincidan con los criterios de búsqueda.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CustomersPage;
