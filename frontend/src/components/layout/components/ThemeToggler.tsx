import { Moon, Sun } from 'lucide-react';

import { useThemeStore } from '../../../utils/stores';
import { Button } from '../../ui';

export const ThemeToggler = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <Button
      onClick={toggleTheme}
      variant="round"
      size="icon"
      className="absolute right-0 top-4"
    >
      <Sun className="size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute top-1 size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
};
