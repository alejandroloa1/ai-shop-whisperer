
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  BarChart2, 
  Lightbulb, 
  Award, 
  TrendingUp, 
  Menu, 
  X 
} from 'lucide-react';
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
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: '/'
  },
  {
    title: 'Smart Segments',
    icon: <Users className="h-5 w-5" />,
    path: '/segments'
  },
  {
    title: 'Audiences & Campaigns',
    icon: <Target className="h-5 w-5" />,
    path: '/audiences'
  },
  {
    title: 'Campaign Builder',
    icon: <BarChart2 className="h-5 w-5" />,
    path: '/campaigns'
  },
  {
    title: 'Insights & Opportunities',
    icon: <Lightbulb className="h-5 w-5" />,
    path: '/insights'
  },
  {
    title: 'Recommendations',
    icon: <Award className="h-5 w-5" />,
    path: '/recommendations'
  },
  {
    title: 'Customer Lifetime Value',
    icon: <TrendingUp className="h-5 w-5" />,
    path: '/ltv'
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
            <div className="mb-6 px-3">
              <h2 className="text-lg font-bold text-foreground">UPSELLerate.co</h2>
              <p className="text-sm text-muted-foreground">AI-powered eCommerce insights</p>
            </div>
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
