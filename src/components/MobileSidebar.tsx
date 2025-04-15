
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Users, ShoppingBag, TrendingUp, PieChart, Award, Gift, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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

const MobileSidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 pt-14 bg-sidebar">
          <div className="flex-1 px-3 py-4 overflow-y-auto">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
