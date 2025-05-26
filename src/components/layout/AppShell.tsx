import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Bell, Settings, LogOut, User, Calendar, BarChart, Users, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import NotificationDropdown from '../notifications/NotificationDropdown';

interface AppShellProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  role: string[];
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: <Home size={20} />,
      href: `/${user?.role}`,
      role: ['admin', 'doctor', 'patient'],
    },
    {
      label: 'Appointments',
      icon: <Calendar size={20} />,
      href: `/${user?.role}/appointments`,
      role: ['admin', 'doctor', 'patient'],
    },
    {
      label: 'Patients',
      icon: <Users size={20} />,
      href: '/doctor/patients',
      role: ['admin', 'doctor'],
    },
    {
      label: 'Analytics',
      icon: <BarChart size={20} />,
      href: '/admin/analytics',
      role: ['admin'],
    },
    {
      label: 'Settings',
      icon: <Settings size={20} />,
      href: `/${user?.role}/settings`,
      role: ['admin', 'doctor', 'patient'],
    },
  ];
  
  const filteredNavItems = navItems.filter(item => 
    user && item.role.includes(user.role)
  );
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-neutral-200 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="ml-2 text-lg font-heading font-semibold text-neutral-900">DocAlert</span>
          </div>
          <button 
            className="lg:hidden text-neutral-500 hover:text-neutral-700"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-1">
            {filteredNavItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`
                      flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-neutral-700 hover:bg-neutral-100'}
                    `}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          <button
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-error-700 hover:bg-neutral-100 rounded-md transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            Sign Out
          </button>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 sticky top-0 z-10">
          <button 
            className="lg:hidden text-neutral-500 hover:text-neutral-700"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center ml-auto">
            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-2 text-neutral-500 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
                onClick={toggleNotifications}
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-error-500 flex items-center justify-center text-[10px] text-white">
                  3
                </span>
              </button>
              
              {notificationsOpen && (
                <NotificationDropdown onClose={() => setNotificationsOpen(false)} />
              )}
            </div>
            
            {/* User dropdown - simplified for this example */}
            <div className="ml-4 flex items-center">
              <Avatar 
                src={user?.avatar} 
                name={user?.name} 
                size="sm" 
              />
              <span className="ml-2 text-sm font-medium hidden sm:block">
                {user?.name}
              </span>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;