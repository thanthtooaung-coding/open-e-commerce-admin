import { Bell, Sun, Moon, Laptop, Menu  } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from './ui/Avatar';

export function Header({ onSidebarToggle }: { onSidebarToggle: () => void }) {
  const { setTheme } = useTheme()
  const storedUser = localStorage.getItem('user');
  const userName = storedUser ? JSON.parse(storedUser).name : null;
  const userImageUrl = localStorage.getItem('user.imageUrl');

  function getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  }  

  return (
    <header className="flex h-14 items-center border-b px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onSidebarToggle}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <div className="flex flex-1" />
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              <Laptop className="mr-2 h-4 w-4" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar>
          {userImageUrl ? (
            <AvatarImage src={userImageUrl} alt="User Avatar" />
          ) : (
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          )}
        </Avatar>
      </div>
    </header>
  )
}

