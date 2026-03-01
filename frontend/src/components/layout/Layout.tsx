import type { ReactNode } from 'react';

import { Header } from './components/Header';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className='px-[10%]'>
      <Header />
      <main>{children}</main>
    </div>
  );
};
