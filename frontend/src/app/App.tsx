import { Layout } from '../components/layout';
import { MainPage } from '../pages/MainPage/MainPage';
import { Providers } from './providers';

export const App = () => {
  return (
    <Providers>
      <Layout>
        <MainPage />
      </Layout>
    </Providers>
  );
};
