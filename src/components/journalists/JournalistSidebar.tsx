
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  BarChart,
  Users,
  Settings,
  UserCircle,
  Award,
  BookOpen,
  MessageCircle,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const JournalistSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/journalist-dashboard"
    },
    {
      name: "My Stories",
      icon: FileText,
      href: "/journalist-dashboard/stories"
    },
    {
      name: "Analytics",
      icon: BarChart,
      href: "/journalist-dashboard/analytics"
    },
    {
      name: "Followers",
      icon: Users,
      href: "/journalist-dashboard/followers"
    },
    {
      name: "Comments",
      icon: MessageCircle,
      href: "/journalist-dashboard/comments"
    },
    {
      name: "Draft Stories",
      icon: BookOpen,
      href: "/journalist-dashboard/drafts"
    },
    {
      name: "Verification",
      icon: Award,
      href: "/journalist-dashboard/verification"
    },
    {
      name: "Profile",
      icon: UserCircle,
      href: "/journalist-dashboard/profile"
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/journalist-dashboard/settings"
    },
  ];
  
  const isActive = (path: string) => location.pathname === path || (path !== "/journalist-dashboard" && location.pathname.startsWith(path));
  
  return (
    <div className="min-h-screen w-64 bg-white border-r border-gray-200 hidden md:block">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-pp-blue">
              <AvatarImage src="/placeholder.svg" alt="Journalist" />
              <AvatarFallback className="bg-pp-blue text-white">JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">Jane Doe</span>
              <span className="text-xs text-muted-foreground">Verified Journalist</span>
            </div>
          </div>
        </div>
        
        <div className="py-4 flex-1">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                  isActive(item.href)
                    ? "bg-pp-blue text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t mt-auto">
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" asChild>
            <Link to="/">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JournalistSidebar;
