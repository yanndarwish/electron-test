import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './redux/store/store';
import router from './router/router';

import 'tailwindcss/tailwind.css';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
