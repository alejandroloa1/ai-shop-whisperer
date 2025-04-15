
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Users, ShoppingBag, TrendingUp, PieChart, Award, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItem = {
  title: string;
  icon: React.ReactNode;
  path: string;
};

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: <BarChart2 className="h-5 w-5" />,
    path: '/'
  },
  {
    title: 'Clientes',
    icon: <Users className="h-5 w-5" />,
    path: '/customers'
  },
  {
    title: 'Ventas',
    icon: <ShoppingBag className="h-5 w-5" />,
    path: '/sales'
  },
  {
    title: 'Análisis RFM',
    icon: <PieChart className="h-5 w-5" />,
    path: '/rfm-analysis'
  },
  {
    title: 'LTV',
    icon: <TrendingUp className="h-5 w-5" />,
    path: '/ltv'
  },
  {
    title: 'Recomendaciones',
    icon: <Award className="h-5 w-5" />,
    path: '/recommendations'
  },
  {
    title: 'Campañas',
    icon: <Gift className="h-5 w-5" />,
    path: '/campaigns'
  }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-slate-200 dark:border-slate-700 pt-16 z-20">
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
