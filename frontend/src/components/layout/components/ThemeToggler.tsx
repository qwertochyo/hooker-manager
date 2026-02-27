import { Moon, Sun } from 'lucide-react';

import { useThemeStore } from '../../../utils/stores';
import { Button } from '../../ui';

export const ThemeToggler = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="absolute right-6 top-6.5"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute top-1 h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
};
