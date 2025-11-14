import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Moon, Sun, MapPin, Calendar, Archive, Headphones, Users, Sparkles, LogIn, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { useState, useEffect } from "react";

interface NavigationProps {
  currentPage: string;
  isDark: boolean;
  onThemeToggle: () => void;
}

export function Navigation({ currentPage, isDark, onThemeToggle }: NavigationProps) {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navItems = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'virtual-tour', label: 'Virtual Tour', icon: Sparkles },
    { id: 'map', label: 'Explore Map', icon: MapPin },
    { id: 'archive', label: 'Digital Archive', icon: Archive },
    { id: 'audio-guide', label: 'Audio Guide', icon: Headphones },
    { id: 'calendar', label: 'Cultural Calendar', icon: Calendar },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'future', label: 'Future Features', icon: Sparkles },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-sm shadow-md border-b border-border' 
        : 'bg-background/90'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">
                Monastery360
              </h1>
            </Link>
          </div>
          
          {/* Centered Navigation Items */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.id === 'home' ? '/' : `/${item.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="no-underline"
                  >
                    <button
                      style={{
                        backgroundColor: isActive ? '#FF8C00' : 'transparent',
                        color: isActive ? 'white' : undefined,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        whiteSpace: 'nowrap'
                      }}
                      className={`
                        px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                        ${
                          isActive 
                            ? 'nav-button-active !bg-[#FF8C00] !text-white shadow-md hover:!bg-[#FF8C00]/90' 
                            : 'text-gray-700 dark:text-gray-300 hover:!bg-[#FF8C00] hover:!text-white'
                        }
                      `}
                    >
                      {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                      <span>{item.label}</span>
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        
          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  className="w-9 h-9 rounded-full bg-[#FF8C00] flex items-center justify-center hover:bg-[#FFD700] transition-colors"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <User className="w-5 h-5 text-white" />
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg border border-border">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-medium">{user.name}</p>
                    </div>
                    <div className="p-2">
                      <button 
                        className="w-full px-3 py-2 text-left text-sm rounded hover:bg-muted"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/register" onClick={() => window.scrollTo(0, 0)}>
                <Button 
                  className="hover:bg-[#FFD700] dark:hover:!bg-gray-200 px-4 py-2 text-sm font-medium rounded-md"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    whiteSpace: 'nowrap',
                    backgroundColor: isDark ? 'white' : '#FF8C00',
                    color: isDark ? 'black' : 'black'
                  }}
                >
                  <LogIn className="w-4 h-4 flex-shrink-0" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}
            
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <Switch 
                checked={isDark} 
                onCheckedChange={onThemeToggle}
              />
              <Moon className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden px-2 pb-2 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Link
                key={item.id}
                to={item.id === 'home' ? '/' : `/${item.id}`}
                onClick={() => window.scrollTo(0, 0)}
                className="no-underline"
              >
                <button
                  className={`
                    px-2.5 py-1.5 rounded-md font-medium text-xs
                    flex items-center gap-1 transition-all duration-200
                    ${
                      isActive 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }
                  `}
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  <span>
                    {item.id === 'virtual-tour' ? 'Tour' :
                     item.id === 'audio-guide' ? 'Audio' :
                     item.id === 'calendar' ? 'Events' :
                     item.id === 'community' ? 'Comm' :
                     item.id === 'digital-archive' ? 'Archive' :
                     item.id === 'explore-map' ? 'Map' :
                     item.label}
                  </span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}