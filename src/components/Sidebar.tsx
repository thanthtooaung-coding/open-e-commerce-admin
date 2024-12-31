import { NavLink } from 'react-router-dom';
import { BarChart, FileText, Users, CreditCard, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart },
  { name: 'Pages', href: '/pages', icon: FileText },
  { name: 'Owners', href: '/owners', icon: Users },
  { name: 'Payments', href: '/payments', icon: CreditCard },
];

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { logout } = useAuth();

  const storedUser = localStorage.getItem('user');
  const userName = storedUser ? JSON.parse(storedUser).name : null;
  const userEmail = storedUser ? JSON.parse(storedUser).email : null;

  return (
    <>
      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose} // Close sidebar when clicking on overlay
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-card transition-transform lg:relative lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the sidebar from closing it
      >
        <div className="flex h-14 items-center border-b px-4 gap-2">
          <div className="rounded bg-gradient-to-br from-pink-500 to-blue-500 p-2">
            <div className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold">{ userName }</h2>
            <p className="text-xs text-muted-foreground">
              { userEmail }
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-primary/5'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="border-t p-4">
          <button
            onClick={logout}
            className="flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/5"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
