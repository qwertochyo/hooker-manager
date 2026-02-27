import type { ReactNode } from 'react';

import { Header } from './components/Header';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};
