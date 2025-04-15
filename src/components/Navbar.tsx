
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Users, TrendingUp, Settings, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-b-slate-200 bg-white dark:bg-gray-900 dark:border-b-slate-700">
      <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-white">
              <BarChart2 size={18} />
            </div>
            <span className="text-xl font-bold text-foreground">RFMInsight</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <BellRing className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-primary text-white">UT</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
