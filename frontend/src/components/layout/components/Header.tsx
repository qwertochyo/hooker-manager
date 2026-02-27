import { ThemeToggler } from "./ThemeToggler";

export const Header = () => {
  return (
    <div className="p-6 relative border-b">
      <p className="text-center uppercase text-2xl">Hooker manager</p>
      <ThemeToggler />
    </div>
  );
}