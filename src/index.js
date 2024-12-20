import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import HomeComponent from './components/Home';
import ProductsComponent from './components/Products';
import FavoritesComponent from './components/Favorites';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeComponent />,
      },
      {
        path: "/products",
        element: <ProductsComponent />,
      },
      {
        path: "/favorites",
        element: <FavoritesComponent />,
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);