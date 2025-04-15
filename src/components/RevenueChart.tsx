
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SalesData } from '@/types';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface RevenueChartProps {
  data: SalesData[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Tendencia de Ingresos</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => format(parseISO(value), 'dd MMM', { locale: es })}
              stroke="#94a3b8"
            />
            <YAxis 
              stroke="#94a3b8" 
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Ingresos']}
              labelFormatter={(value) => format(parseISO(value), 'dd MMMM, yyyy', { locale: es })}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#bfdbfe" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
