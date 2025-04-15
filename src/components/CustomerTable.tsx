
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Customer } from '@/types';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable = ({ customers }: CustomerTableProps) => {
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
    <Card>
      <CardHeader>
        <CardTitle>Clientes Destacados</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Segmento</TableHead>
              <TableHead>Última Compra</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="text-right">Score RFM</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.slice(0, 5).map((customer) => (
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
                <TableCell className="text-right">{customer.rfmScore.total}/15</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CustomerTable;
