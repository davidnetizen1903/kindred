import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './containers';
import { ContractDataProvider } from './hooks/useContracts';
import { store } from './store';

import './styles/stylesheets/global.scss';

render(
  <ContractDataProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ContractDataProvider>,
  document.getElementById('artbasel_app'),
);
