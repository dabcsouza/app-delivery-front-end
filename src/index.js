import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import AppDeliveryProvider from './context/AppDeliveryProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store= { store }>
        <PersistGate loading= { null } persistor={ persistor }>
          <AppDeliveryProvider>
            <App />
          </AppDeliveryProvider>
        </PersistGate> 
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
