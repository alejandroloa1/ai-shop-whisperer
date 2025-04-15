
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  BarChart2, 
  Lightbulb, 
  Award, 
  TrendingUp 
} from 'lucide-react';
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

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-slate-200 dark:border-slate-700 pt-16 z-20">
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
