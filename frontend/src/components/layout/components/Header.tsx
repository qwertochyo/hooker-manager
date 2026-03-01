import { ThemeToggler } from './ThemeToggler';

export const Header = () => {
  return (
    <div>
      <div className="py-4 relative">
        <p className="text-center uppercase text-2xl">Hooker manager</p>
        <ThemeToggler />
      </div>
      <hr className='absolute w-full left-0' />
    </div>
  );
};
