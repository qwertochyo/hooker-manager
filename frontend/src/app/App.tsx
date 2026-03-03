import { Layout } from '../components/layout';
import { ModalRoot } from '../components/ui';
import { MainPage } from '../pages/MainPage';
import { Providers } from './providers';

export const App = () => {
  return (
    <Providers>
      <Layout>
        <MainPage />
      </Layout>
      <ModalRoot />
    </Providers>
  );
};
