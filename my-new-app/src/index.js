import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
    <ToastContainer />
  </>
);
