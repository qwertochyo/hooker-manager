import { Layout } from '../components/layout';
import { Providers } from './providers';

export const App = () => {
  return (
    <Providers>
      <Layout>task manager</Layout>
    </Providers>
  );
};
