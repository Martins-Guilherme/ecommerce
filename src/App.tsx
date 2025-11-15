import { FunctionComponent } from 'react';

import Header from './components/header/header.component';

interface AppProps {
  message?: string;
}

const App: FunctionComponent<AppProps> = ({ message = '' }) => {
  console.log(message);
  return (
    <>
      <Header />
    </>
  );
};

export default App;
